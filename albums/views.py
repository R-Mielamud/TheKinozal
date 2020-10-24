from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import AlbumSerializer
from .models import Album
from videos.models import Video
from django.http import JsonResponse
from helpers.youtube_playlist import import_videos


class AlbumAPIView(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()

    def list(self, request):
        user_id = request.user.pk
        albums = self.queryset.filter(user__pk=user_id)
        serializer = self.serializer_class(albums, many=True)

        return JsonResponse(serializer.data, safe=False)

    def create(self, request):
        data = request.data.get("data")
        copy_from = request.data.get("copy_from")

        data.pop("videos", None)
        data.pop("id", None)

        album = self.queryset.create(**data, user=request.user)

        if copy_from:
            copy_album = self.queryset.filter(pk=copy_from).first()

            if copy_album:
                videos_to_create = [Video(name=v.name, youtube_id=v.youtube_id, album=album) for v in copy_album.videos.all()]
                videos = Video.objects.bulk_create(videos_to_create)

        serializer = self.serializer_class(album)
        return JsonResponse(serializer.data)


class ImportAPIView(APIView):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()

    def post(self, request):
        data = request.data.get("data")
        playlist_id = request.data.get("playlist_id")

        data.pop("videos", None)
        data.pop("id", None)

        user_id = request.user.pk
        video_info = import_videos(playlist_id)
        album = Album.objects.create(**data, user=request.user)

        videos = Video.objects.bulk_create(
            list(
                map(
                    lambda vinfo: Video(
                        name=vinfo["name"],
                        youtube_id=vinfo["id"],
                        album=album,
                    ),
                    video_info
                )
            )
        )

        serializer = self.serializer_class(album)
        return JsonResponse(serializer.data, safe=False)
