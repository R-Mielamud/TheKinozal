from rest_framework.viewsets import ModelViewSet
from .serializers import VideoSerializer
from .models import Video
from TheKinozal.custom_files.video_file import VideoFile
from api.mixins import ProtectedAPIMixin

class VideoAPIView(ProtectedAPIMixin, ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()

    def get_incoming_video_file(self, request, video_name=None):
        temp_file = request.data.get("custom_link")

        if type(temp_file) == list:
            temp_file = temp_file[0]
        
        if temp_file and video_name:
            vfile = VideoFile(
                temp_file,
                temp_file.name, temp_file.content_type,
                temp_file.size, temp_file.charset,
                video_name=video_name, user_email=request.user.email,
                content_type_extra=temp_file.content_type_extra
            )

            return vfile

        return temp_file

    def get_incoming_video_name(self, request, kwargs):
        name = request.data.get("name")
        video_id = kwargs.get("pk")

        if name:
            if type(name) == list:
                return name[0]
            
            return name
        elif video_id:
            video = self.queryset.filter(pk=video_id).first()

            if video:
                return video.name
    
    def set_special_file_object(self, request, kwargs):
        video_name = self.get_incoming_video_name(request, kwargs)

        if video_name:
            vfile = self.get_incoming_video_file(request, video_name=video_name)

            if vfile:
                request.data["custom_link"] = vfile

    def create(self, request, *args, **kwargs):
        self.set_special_file_object(request, kwargs)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.set_special_file_object(request, kwargs)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        self.set_special_file_object(request, kwargs)
        return super().partial_update(request, *args, **kwargs)
