from django.db.models import FileField
from TheKinozal.custom_storages.async_s3_video import AsyncS3VideoStorage

class AsyncS3VideoField(FileField):
    def __init__(self, *args, **kwargs):
        kwargs["storage"] = AsyncS3VideoStorage()
        super().__init__(*args, **kwargs)
