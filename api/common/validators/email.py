from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse
from api.common.validators.matricula import validate_matricula

UNB_EMAIL_DOMAIN = '@aluno.unb.br'
EXPECTED_EMAIL_PARTS = 2


def validate_unb_email(value: str) -> str:
    if not isinstance(value, str):
        raise ErrorResponse(detail='Email must be a string')

    cleaned_value = value.strip()

    if '@' not in cleaned_value:
        raise ErrorResponse(detail='Email must contain @ symbol')

    parts = cleaned_value.split('@')
    if len(parts) != EXPECTED_EMAIL_PARTS:
        raise ErrorResponse(detail='Email must have exactly one @ symbol')

    local_part, domain = parts

    if f'@{domain}' != UNB_EMAIL_DOMAIN:
        raise ErrorResponse(detail=f'Email must end with {UNB_EMAIL_DOMAIN}')

    try:
        validate_matricula(local_part)
    except ErrorResponse as e:
        raise ErrorResponse(detail=f'Invalid matricula in email: {e.detail}')

    return cleaned_value


UnbEmail = Annotated[str, AfterValidator(validate_unb_email)]
