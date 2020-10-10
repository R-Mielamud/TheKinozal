from rest_framework.serializers import ModelSerializer
from .models import Video


class VideoSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Video
