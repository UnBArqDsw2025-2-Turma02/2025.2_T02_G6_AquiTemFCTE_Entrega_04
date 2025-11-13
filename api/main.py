from contextlib import asynccontextmanager
from http import HTTPStatus

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.modules.auth.router import router as auth_router
from api.services.scheduler import start_scheduler, stop_scheduler
from api.utils.schemas import Message


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield
    stop_scheduler()


app = FastAPI(title='API AquiTemFCTE', lifespan=lifespan)

# pessoal do front, alterar aqui depois pra url e porta q vcs estiverem
# rodando o front (:5500 era a porta q eu tav usando pra teste)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:5500', 'http://localhost:5500'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)


@app.get(
    '/',
    status_code=HTTPStatus.OK,
    response_class=JSONResponse,
    response_model=Message,
)
async def root():
    return {'message': 'API is running'}
