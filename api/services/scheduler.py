from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from api.services.cleanup_unverified_users import delete_unverified_users

scheduler = AsyncIOScheduler()


async def cleanup_job():
    await delete_unverified_users()


def start_scheduler():
    scheduler.add_job(
        cleanup_job,
        trigger=CronTrigger(hour='*'),  # a cada hora
        id='cleanup_unverified_users',
        replace_existing=True,
    )
    scheduler.start()


def stop_scheduler():
    scheduler.shutdown()
