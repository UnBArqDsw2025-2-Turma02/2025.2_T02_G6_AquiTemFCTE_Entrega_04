import base64

from api.core.database import get_supabase
from api.core.settings import Settings


async def upload_profile_image_to_supabase(
    image_base64: str | None, matricula: str
) -> str:
    settings = Settings()

    if not image_base64:
        return settings.DEFAULT_PROFILE_PHOTO_URL

    try:
        supabase = await get_supabase()

        if ',' not in image_base64:
            return settings.DEFAULT_PROFILE_PHOTO_URL

        header, data = image_base64.split(',', 1)

        if 'jpeg' in header or 'jpg' in header:
            extension = 'jpg'
            content_type = 'image/jpeg'
        elif 'png' in header:
            extension = 'png'
            content_type = 'image/png'
        else:
            return settings.DEFAULT_PROFILE_PHOTO_URL

        image_bytes = base64.b64decode(data)

        filename = f'users/{matricula}.{extension}'

        await supabase.storage.from_(settings.SUPABASE_BUCKET).upload(
            path=filename,
            file=image_bytes,
            file_options={
                'content-type': content_type,
                'cache-control': '3600',
                'upsert': 'false',
            },
        )

        public_url = (
            f'{settings.SUPABASE_URL}/storage/v1/object/public/'
            f'{settings.SUPABASE_BUCKET}/{filename}'
        )

        return public_url

    except Exception as e:
        print(f'Error uploading image to Supabase: {e}')
        return settings.DEFAULT_PROFILE_PHOTO_URL
