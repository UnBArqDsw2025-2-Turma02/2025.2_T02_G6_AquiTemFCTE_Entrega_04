from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from api.common.errors.error_response import ErrorResponse
from api.common.errors.exceptions import exc_incorrect_email_or_password
from api.common.validators.general import check_matricula_is_equal_from_email
from api.core.authentication import create_access_token, get_current_user
from api.core.database import get_session
from api.core.dependencies import get_verified_user
from api.core.models import User
from api.core.security import verify_password
from api.modules.auth.repository import (
    get_user_from_db,
    get_user_from_db_by_email,
    insert_user,
    update_user_verified_status,
)
from api.modules.auth.schemas import (
    TokenJWT,
    UserPublic,
    UserRegister,
    VerifyAccountRequest,
)
from api.services.cleanup_unverified_users import delete_unverified_users
from api.services.generate_code import generate_random_code
from api.services.redis import (
    delete_verification_code,
    set_verification_code,
    validate_verification_code,
)
from api.utils.emails.send_email import send_verification_email

router = APIRouter(prefix='/auth', tags=['auth'])

Session = Annotated[AsyncSession, Depends(get_session)]
OAuth2Form = Annotated[OAuth2PasswordRequestForm, Depends()]
CurrentUser = Annotated[User, Depends(get_current_user)]
VerifiedUser = Annotated[User, Depends(get_verified_user)]


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
    '/send-verification-code',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
)
async def send_verification_code(current_user: CurrentUser):
    if current_user.verified:
        raise ErrorResponse(detail='Account already verified')

    code = generate_random_code()
    await set_verification_code(current_user.email, str(code))

    email_sent = await send_verification_email(current_user.email, str(code))

    if not email_sent:
        raise ErrorResponse(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail='Failed to send verification email. Please try again.',
        )

    return {
        'message': 'Verification code sent successfully',
        'email': current_user.email,
        'expires_in_seconds': 600,
    }


@router.post(
    '/verify-account',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=UserPublic,
)
async def verify_account(
    request: VerifyAccountRequest,
    current_user: CurrentUser,
    session: Session,
):
    if current_user.verified:
        raise ErrorResponse(detail='Account already verified')

    is_valid_code = await validate_verification_code(
        current_user.email, request.code
    )
    if not is_valid_code:
        raise ErrorResponse(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail='Invalid or expired verification code',
        )

    await delete_verification_code(current_user.email)
    updated_user = await update_user_verified_status(
        session, current_user.id, verified=True
    )

    return updated_user


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


@router.post(
    '/cleanup-unverified',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
)
async def cleanup_unverified():
    deleted_count = await delete_unverified_users()
    return {
        'message': f'{deleted_count} unverified users deleted',
        'deleted_count': deleted_count,
    }


@router.get(
    '/me',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=UserPublic,
)
async def get_current_user_info(current_user: CurrentUser):
    return current_user


@router.get(
    '/profile',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=UserPublic,
)
async def get_user_profile(verified_user: VerifiedUser):
    return verified_user
