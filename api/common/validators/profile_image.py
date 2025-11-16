import re
from typing import Annotated

from pydantic import AfterValidator

from api.common.errors.error_response import ErrorResponse

JPEG_BASE64_PATTERN = r'^data:image\/(jpeg|jpg);base64,[A-Za-z0-9+/=]+$'
PNG_BASE64_PATTERN = r'^data:image\/png;base64,[A-Za-z0-9+/=]+$'
MAX_IMAGE_SIZE_MB = 25
MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024


def validate_profile_image(value: str | None) -> str | None:
    if value is None:
        return None

    if not isinstance(value, str):
        raise ErrorResponse(detail='Profile image must be a string')

    cleaned_value = value.strip()

    if not cleaned_value:
        return None

    is_jpeg = re.match(JPEG_BASE64_PATTERN, cleaned_value)
    is_png = re.match(PNG_BASE64_PATTERN, cleaned_value)

    if not is_jpeg and not is_png:
        raise ErrorResponse(
            detail='Profile image must be a valid base64 encoded JPEG/JPG or '
            'PNG image. Format: data:image/jpeg;base64,... or '
            'data:image/png;base64,...'
        )

    base64_data = (
        cleaned_value.split(',')[1] if ',' in cleaned_value else cleaned_value
    )
    estimated_size = len(base64_data) * 0.75

    if estimated_size > MAX_IMAGE_SIZE_BYTES:
        raise ErrorResponse(
            detail='Profile image is too large. Maximum size '
            'is {MAX_IMAGE_SIZE_MB}MB'
        )

    return cleaned_value


ProfileImage = Annotated[str | None, AfterValidator(validate_profile_image)]
