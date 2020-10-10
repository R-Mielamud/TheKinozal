from rest_framework.serializers import ModelSerializer
from .models import Album
from videos.serializers import VideoSerializer


class AlbumSerializer(ModelSerializer):
    videos = VideoSerializer(many=True)

    class Meta:
        fields = "__all__"
        model = Album
