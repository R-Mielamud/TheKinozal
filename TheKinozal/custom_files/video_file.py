from django.core.files.uploadedfile import UploadedFile

class VideoFile(UploadedFile):
    def __init__(self, *args, video_name=None, user_email=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.video_name = video_name
        self.user_email = user_email
