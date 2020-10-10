from rest_framework.viewsets import ModelViewSet
from .serializers import VideoSerializer
from .models import Video


class VideoAPIView(ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()
