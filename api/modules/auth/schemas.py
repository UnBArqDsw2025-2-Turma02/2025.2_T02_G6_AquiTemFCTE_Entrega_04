from pydantic import BaseModel, ConfigDict, Field

from api.common.validators.email import UnbEmail
from api.common.validators.fullname import FullName
from api.common.validators.matricula import Matricula
from api.common.validators.password import Password
from api.common.validators.profile_image import ProfileImage
from api.common.validators.verification_code import VerificationCode


class UserRegister(BaseModel):
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    password: Password
    confirm_password: Password
    profile_image: ProfileImage = None


class SendVerificationCodeRequest(BaseModel):
    email: UnbEmail


class VerifyAccountRequest(BaseModel):
    code: VerificationCode


class UserPublic(BaseModel):
    id: int
    fullname: FullName
    email: UnbEmail
    matricula: Matricula
    profile_image: str | None = None
    verified: bool = False
    model_config = ConfigDict(from_attributes=True)


class TokenJWT(BaseModel):
    access_token: str
    token_type: str = Field(default='Bearer')
