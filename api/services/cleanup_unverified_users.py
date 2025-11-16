from datetime import datetime, timedelta

from sqlalchemy import delete, select

from api.core.database import get_session
from api.core.models import User


async def delete_unverified_users() -> int:
    async for session in get_session():
        try:
            threshold_time = datetime.now() - timedelta(hours=24)

            stmt = select(User).where(
                User.verified == False,  # noqa: E712
                User.created_at < threshold_time,
            )

            result = await session.execute(stmt)
            users_to_delete = result.scalars().all()

            if users_to_delete:
                delete_stmt = delete(User).where(
                    User.verified == False,  # noqa: E712
                    User.created_at < threshold_time,
                )

                result = await session.execute(delete_stmt)
                await session.commit()

                deleted_count = result.rowcount
                return deleted_count

            return 0

        except Exception:
            await session.rollback()
            return 0
