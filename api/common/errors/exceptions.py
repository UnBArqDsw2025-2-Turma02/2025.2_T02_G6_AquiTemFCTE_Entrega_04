from http import HTTPStatus

from api.common.errors.error_response import ErrorResponse

exc_incorrect_email_or_password = ErrorResponse(
    status_code=HTTPStatus.UNAUTHORIZED, detail='Incorrect email or password'
)
