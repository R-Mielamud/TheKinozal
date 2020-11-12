from django.db.models import *
from django.core.exceptions import ValidationError
from albums.models import Album
from TheKinozal.custom_fields.async_s3 import AsyncS3FileField

class Video(Model):
    name = CharField(max_length=500)
    youtube_id = CharField(max_length=100, blank=True, null=True)
    custom_link = AsyncS3FileField(blank=True, null=True)
    album = ForeignKey(to=Album, related_name="videos",
                       on_delete=CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # We don't know, how many chars will be in playlist video name.
        # Bulk create does not call save, so bulk limit - 500, regular limit - 30

        if len(self.name) > 30:
            raise ValidationError("name must be less than 30 chars long")

        return super().save(*args, **kwargs)
