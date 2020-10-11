from rest_framework.serializers import ModelSerializer
from .models import User
from albums.serializers import AlbumSerializer


class UserSerializer(ModelSerializer):
    albums = AlbumSerializer(many=True)

    class Meta:
        fields = "__all__"
        model = User
