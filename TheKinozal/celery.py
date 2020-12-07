from __future__ import absolute_import
import os
import boto3
from celery import Celery
from celery.decorators import task
from TheKinozal import settings
from helpers.email import send_email

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "TheKinozal.settings")
app = Celery("TheKinozal")

app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@app.task(bind=True)
def debug_task(self):
    return "Request: {0!r}".format(self.request)

@app.task(name="finish_file_upload")
def finish_file_upload(*, bucket_and_key, upload_id, file_chunks, video_name, user_email, already_uploaded=0, upload_results=[]):
    if len(upload_results) != already_uploaded:
        raise ValueError("Invalid length of upload_results: {}. Must be {}".format(len(upload_results), already_uploaded))

    results = list(upload_results)

    s3 = boto3.client(
        "s3",
        "us-east-2",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )

    try:
        count = already_uploaded + 1
        chunk = file_chunks[already_uploaded]
        ln = len(file_chunks)

        while count <= ln:
            bts = bytearray.fromhex(chunk)

            response = s3.upload_part(
                **bucket_and_key,
                PartNumber=count,
                UploadId=upload_id,
                Body=bts
            )

            results.append({
                "ETag": response["ETag"][1:-1],
                "PartNumber": count
            })

            if ln == count:
                break

            chunk = file_chunks[count]
            count += 1
        
        s3.complete_multipart_upload(
            **bucket_and_key,
            UploadId=upload_id,
            MultipartUpload={
                "Parts": results
            }
        )

        send_email(
            [user_email],
            "Video upload finished!",
            "<h3>Your upload job of video '{}' was successfully finished!</h3>".format(video_name)
        )
    except Exception as exc:
        print(exc)
        s3.abort_multipart_upload(**bucket_and_key, UploadId=upload_id)

        send_email(
            [user_email],
            "Video upload failed.",
            "<h3>Your upload job of video '{}' failed. Check the video file and try again.</h3>".format(video_name)
        )
