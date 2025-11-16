import re
from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse

CODE_LENGTH = 6
CODE_PATTERN = r'^\d{6}$'


def validate_verification_code(value: str) -> str:
    if not isinstance(value, str):
        raise ErrorResponse(detail='Verification code must be a string')

    cleaned_value = value.strip()

    if not re.match(CODE_PATTERN, cleaned_value):
        raise ErrorResponse(
            detail=f'Verification code must be exactly {CODE_LENGTH} digits'
        )

    return cleaned_value


VerificationCode = Annotated[str, AfterValidator(validate_verification_code)]
