from http import HTTPStatus

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from api.modules.auth.router import router as auth_router
from api.utils.schemas import Message

app = FastAPI(title='API AquiTemFCTE')

app.include_router(auth_router)


@app.get(
    '/',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=Message,
)
async def root():
    return {'message': 'API is running'}
