import os
import boto3
import threading
from TheKinozal import settings
from boto3.s3.transfer import TransferConfig
from django.core.files.uploadedfile import UploadedFile
from helpers.random_string import generate_random_string
from django.core.files.temp import tempfile
from TheKinozal.celery import finish_file_upload

class ChunkedS3VideoUploader:
    def __init__(self, djfile, key, name):
        self.s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )

        self.file = UploadedFile(
            djfile,
            djfile.name,
            djfile.content_type,
            djfile.size,
            djfile.charset,
            djfile.content_type_extra
        )

        self.key = key + "/" + name
        self.video_name = djfile.video_name
        self.user_email = djfile.user_email

        self.bucket_and_key_mixin = {
            "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
            "Key": self.key
        }

    def upload(self):
        self.file.seek(0, os.SEEK_SET)

        m_upload = self.s3.create_multipart_upload(**self.bucket_and_key_mixin)
        uid = m_upload["UploadId"]

        chunks = self.file.chunks(settings.CHUNK_SIZE)
        chunks_list = list()

        for chunk in chunks:
            chunks_list.append(chunk.hex())

        try:
            finish_file_upload.delay(
                bucket_and_key=self.bucket_and_key_mixin,
                upload_id=uid,
                file_chunks=chunks_list,
                video_name=self.video_name,
                user_email=self.user_email
            )
        except Exception as exc:
            print(exc)

            self.s3.abort_multipart_upload(
                Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                Key=m_upload["Key"],
                UploadId=uid
            )

        return self.s3.generate_presigned_url(
            "get_object",
            Params=self.bucket_and_key_mixin,
            HttpMethod="GET"
        )
