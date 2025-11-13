from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from api.core.settings import Settings

engine = create_async_engine(Settings().DATABASE_URL)

async_session_factory = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)


async def get_session():  # pragma: no cover
    async with async_session_factory() as session:
        yield session
