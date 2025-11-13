from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from supabase import AsyncClient, create_async_client

from api.core.settings import Settings

engine = create_async_engine(Settings().DATABASE_URL)

async_session_factory = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)


async def get_session():  # pragma: no cover
    async with async_session_factory() as session:
        yield session


supabase: AsyncClient | None = None


async def init_supabase() -> AsyncClient:
    global supabase  # noqa: PLW0603
    if supabase is None:
        supabase = await create_async_client(
            Settings().SUPABASE_URL, Settings().SUPABASE_SERVICE_KEY
        )
    return supabase


async def get_supabase() -> AsyncClient:
    if supabase is None:
        return await init_supabase()
    return supabase
