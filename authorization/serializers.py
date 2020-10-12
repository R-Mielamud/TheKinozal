from rest_framework.serializers import ModelSerializer
from .models import User
from albums.serializers import AlbumSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User
