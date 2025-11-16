import re
from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse

MATRICULA_LENGTH = 9
PREFIX_LENGTH = 4
LAST_YEAR_OLD_FORMAT = 19
TRANSITION_YEAR = 20
OLD_FORMAT_FIRST_SEMESTERS = {'00', '01'}
NEW_FORMAT_TRANSITION_PREFIX = {'2000'}
VALID_SEMESTER_DIGITS = {'1', '2'}
OLD_FORMAT_2020_SEMESTER = '00'
NEW_FORMAT_2020_PREFIX = '2020'


def validate_matricula(value: str) -> str:
    if not isinstance(value, str):
        raise ErrorResponse(detail='Matricula must be a string')

    cleaned_value = re.sub(r'[^\d]', '', value)

    if len(cleaned_value) != MATRICULA_LENGTH:
        raise ErrorResponse(
            detail=f'Matricula must have exactly {MATRICULA_LENGTH} digits'
        )

    prefix = cleaned_value[:PREFIX_LENGTH]
    ano = int(prefix[:2])

    if ano <= LAST_YEAR_OLD_FORMAT or (
        ano == TRANSITION_YEAR and prefix in NEW_FORMAT_TRANSITION_PREFIX
    ):
        # Formato antigo: AASS + 5 dígitos (até 2020/1)
        if not _validate_old_format(prefix):
            raise ErrorResponse(
                detail='Invalid matricula format. For years up to 2020/1, '
                'use format AASS (e.g., 1800, 1801, 2000)'
            )
    # Formato novo: AAX0 + 5 dígitos (a partir de 2020/2)
    elif not _validate_new_format(prefix, ano):
        raise ErrorResponse(
            detail='Invalid matricula format. From 2020/2 onwards, use '
            'format AAX0 (e.g., 2020, 2110, 2120)'
        )

    return cleaned_value


def _validate_old_format(prefix: str) -> bool:
    if len(prefix) != PREFIX_LENGTH:
        return False

    ano = int(prefix[:2])
    semestre_part = prefix[2:]

    if ano <= LAST_YEAR_OLD_FORMAT:
        return semestre_part in OLD_FORMAT_FIRST_SEMESTERS

    if ano == TRANSITION_YEAR:
        return semestre_part == OLD_FORMAT_2020_SEMESTER

    return False


def _validate_new_format(prefix: str, ano: int) -> bool:
    if len(prefix) != PREFIX_LENGTH:
        return False

    if not prefix.endswith('0'):
        return False

    semestre_digit = prefix[2]
    if semestre_digit not in VALID_SEMESTER_DIGITS:
        return False

    if ano == TRANSITION_YEAR:
        return prefix == NEW_FORMAT_2020_PREFIX

    return True


Matricula = Annotated[str, AfterValidator(validate_matricula)]
