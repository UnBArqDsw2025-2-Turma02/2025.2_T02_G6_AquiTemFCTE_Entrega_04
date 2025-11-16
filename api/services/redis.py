from api.core.database import redis_client

CODE_EXPIRATION_SECONDS = 300  # 5 min


async def set_verification_code(email: str, code: str) -> None:
    key = f'verification_code:{email}'
    await redis_client.setex(key, CODE_EXPIRATION_SECONDS, code)


async def get_verification_code(email: str) -> str | None:
    key = f'verification_code:{email}'
    return await redis_client.get(key)


async def delete_verification_code(email: str) -> None:
    key = f'verification_code:{email}'
    await redis_client.delete(key)


async def validate_verification_code(email: str, code: str) -> bool:
    stored_code = await get_verification_code(email)
    if not stored_code:
        return False
    return stored_code == code
