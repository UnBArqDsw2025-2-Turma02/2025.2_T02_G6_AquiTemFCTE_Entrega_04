from datetime import datetime, timedelta
from http import HTTPStatus
from typing import Annotated
from zoneinfo import ZoneInfo

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import DecodeError, decode, encode
from jwt.exceptions import ExpiredSignatureError
from sqlalchemy.ext.asyncio import AsyncSession

from api.core.database import get_session
from api.core.models import User
from api.core.settings import Settings
from api.modules.auth.repository import get_user_from_db_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login/')

Session = Annotated[AsyncSession, Depends(get_session)]
T_OAuth2Scheme = Annotated[OAuth2PasswordBearer, Depends(oauth2_scheme)]

credentials_exception = HTTPException(
    status_code=HTTPStatus.UNAUTHORIZED,
    detail='Could not validate credentials',
    headers={'WWW-Authenticate': 'Bearer'},
)

settings = Settings()


def create_access_token(
    claim: dict, expires_delta_minutes: int | None = None
) -> str:
    to_encode = claim.copy()

    expire_time = datetime.now(tz=ZoneInfo('UTC')) + timedelta(
        minutes=expires_delta_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({'exp': expire_time})

    encoded_jwt = encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)

    return encoded_jwt


async def get_current_user(session: Session, token: T_OAuth2Scheme) -> User:
    try:
        payload = decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        subject_email = payload.get('sub')

        if not subject_email:
            raise credentials_exception

        db_user = await get_user_from_db_by_email(session, subject_email)

        if not db_user:
            raise credentials_exception

        return db_user
    except DecodeError:
        raise credentials_exception
    except ExpiredSignatureError:
        raise credentials_exception
