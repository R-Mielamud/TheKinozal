from django.db.models import *
from albums.models import Album


class Video(Model):
    name = CharField(max_length=100)
    youtube_id = CharField(max_length=100)
    album = ForeignKey(to=Album, related_name="videos",
                       on_delete=CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name
