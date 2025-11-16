import re
from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse

MIN_NAME_LENGTH = 2
MIN_WORDS = 2


def validate_fullname(value: str) -> str:
    if not isinstance(value, str):
        raise ErrorResponse(detail='Full name must be a string')

    cleaned_value = re.sub(r'\s+', ' ', value.strip())

    if not cleaned_value:
        raise ErrorResponse(detail='Full name cannot be empty')

    if not re.match(r'^[a-zA-ZÀ-ÿ\s\'-]+$', cleaned_value):
        raise ErrorResponse(
            detail='Full name can only contain letters, spaces, hyphens and '
            'apostrophes'
        )

    words = cleaned_value.split()

    if len(words) < MIN_WORDS:
        raise ErrorResponse(
            detail='Full name must contain at least first name and last name'
        )

    for word in words:
        if len(word) < MIN_NAME_LENGTH:
            raise ErrorResponse(
                detail=f'Each name part must be at least {MIN_NAME_LENGTH} '
                'characters long'
            )

    formatted_name = ' '.join(word.capitalize() for word in words)

    return formatted_name


FullName = Annotated[str, AfterValidator(validate_fullname)]
