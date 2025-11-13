from pydantic import BaseModel, ConfigDict, EmailStr, Field

from api.common.validators.password import Password


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: Password
    confirm_password: Password


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class TokenJWT(BaseModel):
    access_token: str
    token_type: str = Field(default='Bearer')
