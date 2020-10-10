from rest_framework.viewsets import ModelViewSet
from .serializers import AlbumSerializer
from .models import Album


class AlbumAPIView(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
