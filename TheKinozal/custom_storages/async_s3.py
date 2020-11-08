from storages.backends.s3boto3 import S3Boto3Storage
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import TemporaryUploadedFile
from TheKinozal import settings
import threading

class AsyncS3Storage(S3Boto3Storage):
    uploaded_s3 = False
    file_storage = None

    def save(self, name, content, **kwargs):
        self.uploaded_s3 = False
        fs = FileSystemStorage(location=settings.MEDIA_DIR)
        self.file_storage = fs

        new_content = TemporaryUploadedFile(content.name, content.content_type, content.size, content.charset)
        result_name = fs._save(name, content)

        def save_s3():
            with fs.open(result_name) as stream:
                new_name = super(AsyncS3Storage, self).save(result_name, stream, **kwargs)
                fs.delete(result_name)
                self.uploaded_s3 = True
                self.name = new_name

        upload_thread = threading.Thread(target=save_s3, name="UploadS3")
        upload_thread.start()

        return result_name
    
    def url(self, name):
        if self.uploaded_s3:
            return super().url(self.name)
        elif self.file_storage:
            return self.file_storage.url(name)
