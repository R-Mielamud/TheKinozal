from rest_framework.viewsets import ModelViewSet
from .serializers import AlbumSerializer
from .models import Album
from django.http import JsonResponse


class AlbumAPIView(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()

    def list(self, request):
        user_id = request.user.pk
        albums = self.queryset.filter(user__pk=user_id)
        serializer = self.serializer_class(albums, many=True)

        return JsonResponse(serializer.data, safe=False)

    def create(self, request):
        album = self.queryset.create(**request.data, user=request.user)
        serializer = self.serializer_class(album)

        return JsonResponse(serializer.data)
