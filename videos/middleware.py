from django.utils.deprecation import MiddlewareMixin
from helpers import mimetype
from django.http import JsonResponse

class VideoFileValidationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith("/api/video"):
            video_file = request.FILES.get("custom_link")

            if video_file:
                try:
                    mimetype.validate_video_type(video_file)
                except:
                    return JsonResponse({ "detail": "Invalid file type." }, status=400)
