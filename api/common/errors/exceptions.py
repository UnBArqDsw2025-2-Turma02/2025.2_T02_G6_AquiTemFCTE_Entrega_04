from http import HTTPStatus

from fastapi import HTTPException

from api.common.errors.error_response import ErrorResponse

exc_incorrect_email_or_password = ErrorResponse(
    status_code=HTTPStatus.UNAUTHORIZED, detail='Incorrect email or password'
)

credentials_exception = HTTPException(
    status_code=HTTPStatus.UNAUTHORIZED,
    detail='Could not validate credentials',
    headers={'WWW-Authenticate': 'Bearer'},
)
