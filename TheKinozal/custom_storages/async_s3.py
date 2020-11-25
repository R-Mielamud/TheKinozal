import os
from TheKinozal import settings
from storages.backends.s3boto3 import S3Boto3Storage
from helpers.random_string import generate_random_string
from helpers.chunked_upload import ChunkedS3MediaUploader

class AsyncS3Storage(S3Boto3Storage):
    instance = None

    def set_instance(self, inst):
        self.instance = inst

    def _on_upload_end(self):
        print(self.instance)
        if self.instance:
            # Send a beautiful email
            pass

    def _save(self, name, content):
        filename, ext = os.path.splitext(name)
        name = filename + "_" + generate_random_string() + ext

        uploader = ChunkedS3MediaUploader(content, settings.AWS_VIDEOS_KEY, name)
        uploader.upload(on_real_upload_end=self._on_upload_end)

        return settings.AWS_VIDEOS_KEY + "/" + name
