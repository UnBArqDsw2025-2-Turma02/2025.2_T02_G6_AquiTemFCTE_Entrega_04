from pydantic import BaseModel, ConfigDict, Field

from api.common.validators.email import UnbEmail
from api.common.validators.fullname import FullName
from api.common.validators.matricula import Matricula
from api.common.validators.password import Password
from api.common.validators.profile_image import ProfileImage


class UserRegister(BaseModel):
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    password: Password
    confirm_password: Password
    profile_image: ProfileImage = None


class UserPublic(BaseModel):
    id: int
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    profile_image: str | None = None
    model_config = ConfigDict(from_attributes=True)


class TokenJWT(BaseModel):
    access_token: str
    token_type: str = Field(default='Bearer')
