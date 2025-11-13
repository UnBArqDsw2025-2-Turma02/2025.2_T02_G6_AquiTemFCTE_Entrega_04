from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.core.models import User
from api.core.security import get_password_hash
from api.services.storage_supabase import upload_profile_image_to_supabase


async def get_user_from_db(session: AsyncSession, user: User) -> User | None:
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
    profile_image_url = await upload_profile_image_to_supabase(
        user.profile_image, user.matricula
    )

    new_user = User(
        fullname=user.fullname,
        email=user.email,
        matricula=user.matricula,
        password=get_password_hash(user.password),
        profile_image=profile_image_url,
        verified=False,
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return new_user


async def update_user_verified_status(
    session: AsyncSession, user_id: int, verified: bool
) -> User:
    user = await session.scalar(select(User).where(User.id == user_id))
    if user:
        user.verified = verified
        await session.commit()
        await session.refresh(user)
    return user
