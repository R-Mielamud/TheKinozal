from django.db.models import *


class Video(Model):
    name = CharField(max_length=100)
    youtube_id = CharField(max_length=100)

    def __str__(self):
        return self.name
