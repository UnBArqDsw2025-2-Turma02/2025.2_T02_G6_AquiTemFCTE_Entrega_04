from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from api.common.errors.error_response import ErrorResponse
from api.common.errors.exceptions import exc_incorrect_email_or_password
from api.core.authentication import create_access_token, get_current_user
from api.core.database import get_session
from api.core.models import User
from api.core.security import verify_password
from api.modules.auth.repository import (
    get_user_from_db,
    get_user_from_db_by_email,
    insert_user,
)
from api.modules.auth.schemas import TokenJWT, UserPublic, UserRegister
from api.common.validators.general import check_matricula_is_equal_from_email

router = APIRouter(prefix='/auth', tags=['auth'])

Session = Annotated[AsyncSession, Depends(get_session)]
OAuth2Form = Annotated[OAuth2PasswordRequestForm, Depends()]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.post(
    '/register',
    status_code=HTTPStatus.CREATED,
    response_class=JSONResponse,
    response_model=UserPublic,
)
async def register_user(user: UserRegister, session: Session):
    if user.password != user.confirm_password:
        raise ErrorResponse(detail='The passwords must be the same')
    
    if not check_matricula_is_equal_from_email(user.email, user.matricula):
        raise ErrorResponse(detail='Email and matricula do not match')

    db_user = await get_user_from_db(session, user)
    if not db_user:
        return await insert_user(session, user)

    raise ErrorResponse(
        status_code=HTTPStatus.CONFLICT, detail='User already exists'
    )


@router.post(
    '/login',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=TokenJWT,
)
async def login_for_access_token(session: Session, form_data: OAuth2Form):
    db_user = await get_user_from_db_by_email(session, form_data.username)

    if not db_user:
        raise exc_incorrect_email_or_password

    if not verify_password(form_data.password, db_user.password):
        raise exc_incorrect_email_or_password

    access_token = create_access_token({'sub': form_data.username})

    return {
        'access_token': access_token,
        'token_type': 'Bearer',
    }
