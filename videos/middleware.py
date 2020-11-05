from django.utils.deprecation import MiddlewareMixin
from helpers import mimetype

class VideoFileValidationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith("/api/video"):
            video_file = request.FILES.get("custom_link")

            if video_file:
                mimetype.validate_video_type(video_file)
