from django.db.models import *


class Video(Model):
    youtube_id = CharField(max_length=100)

    def __str__(self):
        return self.youtube_id
