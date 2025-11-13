from http import HTTPStatus

from fastapi import HTTPException


class ErrorResponse(HTTPException):
    def __init__(
        self,
        status_code: int = HTTPStatus.UNPROCESSABLE_ENTITY,
        detail: str | None = None,
    ):
        super().__init__(status_code=status_code, detail=detail)
