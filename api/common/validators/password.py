import re
from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse

MIN_PASSWORD_LENGTH = 8


def validate_password(value: str) -> str:
    if not isinstance(value, str):
        raise ErrorResponse(detail='Password must be a string')

    if len(value) < MIN_PASSWORD_LENGTH:
        raise ErrorResponse(
            detail=f'Password must be at least {MIN_PASSWORD_LENGTH} '
            'characters long'
        )

    if not re.search(r'[a-z]', value):
        raise ErrorResponse(
            detail='Password must contain at least one lowercase letter'
        )

    if not re.search(r'[A-Z]', value):
        raise ErrorResponse(
            detail='Password must contain at least one uppercase letter'
        )

    if not re.search(r'\d', value):
        raise ErrorResponse(detail='Password must contain at least one number')

    return value


Password = Annotated[str, AfterValidator(validate_password)]
