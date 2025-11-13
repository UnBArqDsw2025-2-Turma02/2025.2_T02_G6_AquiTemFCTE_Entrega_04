from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.core.models import User
from api.core.security import get_password_hash


async def get_user_from_db(
    session: AsyncSession, user: User
) -> User | None:
    return await session.scalar(
        select(User).where(
            (User.email == user.email) | (User.matricula == user.matricula)
        )
    )


async def get_user_from_db_by_email(
    session: AsyncSession, email: str
) -> User | None:
    return await session.scalar(select(User).where(User.email == email))


async def insert_user(session: AsyncSession, user: User) -> User:
    new_user = User(
        fullname=user.fullname,
        email=user.email,
        matricula=user.matricula,
        password=get_password_hash(user.password),
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return new_user
