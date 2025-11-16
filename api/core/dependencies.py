from http import HTTPStatus

from fastapi import Depends

from api.common.errors.error_response import ErrorResponse
from api.core.authentication import get_current_user
from api.core.models import User


async def get_verified_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.verified:
        raise ErrorResponse(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Account not verified. Please verify your email to access '
            'this resource',
        )

    return current_user
