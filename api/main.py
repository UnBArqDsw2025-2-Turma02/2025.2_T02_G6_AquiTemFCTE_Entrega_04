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

# Configuração do CORS - permite requisições apenas do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,         # Permite cookies/autenticação
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],           # Permite todos os cabeçalhos
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
