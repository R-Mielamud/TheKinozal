import boto3
from TheKinozal import settings

def send_email(to, subject, body):
    ses = boto3.client(
        "ses",
        "us-east-1",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    
    ses.send_email(
        Source="noreply@thekinozal.tk",
        Destination={
            "ToAddresses": to
        },
        Message={
            "Subject": {
                "Data": subject,
                "Charset": "utf-8"
            },
            "Body": {
                "Html": {
                    "Data": body,
                    "Charset": "utf-8"
                }
            }
        }
    )