import os
import boto3
import threading
from helpers.lock import wait
from TheKinozal import settings
from boto3.s3.transfer import TransferConfig
from django.core.files.uploadedfile import UploadedFile
from helpers.random_string import generate_random_string
from django.core.files.uploadedfile import UploadedFile

class ChunkedS3MediaUploader:
    def __init__(self, djfile, key, name):
        self.s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )

        self.file = UploadedFile(djfile, djfile.name, djfile.content_type, djfile.size, djfile.charset, djfile.content_type_extra)
        self.key = key + "/" + name
        self.config = TransferConfig(multipart_chunksize=settings.CHUNK_SIZE, use_threads=True)

    def upload(self, on_real_upload_end=None):
        self.file.seek(0, os.SEEK_SET)

        lock = threading.Lock()
        first_chunk_content = self.file.read(settings.CHUNK_SIZE)

        def upload_file():
            self.s3.upload_fileobj(
                self.file,
                settings.AWS_STORAGE_BUCKET_NAME,
                self.key,
                Config=self.config,
                Callback=_OnProgress(lock)
            )

            if on_real_upload_end:
                on_real_upload_end()

        thread = threading.Thread(target=upload_file, name=generate_random_string(length=6))
        thread.start()

        lock.acquire()
        wait(lock)

        return self.s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": self.key},
            HttpMethod="GET"
        )

class _OnProgress:
    def __init__(self, lock):
        self.lock = lock

    def __call__(self, *args, **kwargs):
        if self.lock.locked():
            self.lock.release()
