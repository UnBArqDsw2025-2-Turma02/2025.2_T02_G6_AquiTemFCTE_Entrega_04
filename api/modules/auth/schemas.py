from pydantic import BaseModel, ConfigDict, Field

from api.common.validators.email import UnbEmail
from api.common.validators.fullname import FullName
from api.common.validators.matricula import Matricula
from api.common.validators.password import Password


class UserRegister(BaseModel):
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    password: Password
    confirm_password: Password


class UserPublic(BaseModel):
    id: int
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    model_config = ConfigDict(from_attributes=True)


class TokenJWT(BaseModel):
    access_token: str
    token_type: str = Field(default='Bearer')
