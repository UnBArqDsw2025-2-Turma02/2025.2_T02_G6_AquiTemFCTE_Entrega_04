from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.core.models import User
from api.core.security import get_password_hash
from api.modules.auth.schemas import UserRegister


async def get_user_from_db(
    user: UserRegister, session: AsyncSession
) -> User | None:
    return await session.scalar(
        select(User).where(
            (User.email == user.email) | (User.phone == user.phone)
        )
    )


async def get_user_from_db_by_email(
    session: AsyncSession, email: str
) -> User | None:
    return await session.scalar(select(User).where(User.email == email))


async def insert_user(session: AsyncSession, user: UserRegister) -> User:
    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        password=get_password_hash(user.password),
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return new_user
