from django.db.models import FileField
from TheKinozal.custom_storages.async_s3 import AsyncS3Storage

class AsyncS3FileField(FileField):
    storage = AsyncS3Storage()

    def pre_save(self, model_instance, add):
        self.storage.set_instance(model_instance)
        return super().pre_save(model_instance, add)
