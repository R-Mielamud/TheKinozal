from django.utils.deprecation import MiddlewareMixin
from helpers import jwt
from TheKinozal import settings
from django.http import JsonResponse
from .models import User


class ExtractJWT(MiddlewareMixin):
    def process_request(self, request):
        jwt_token = jwt.extract_user_token(request)
        setattr(request, "jwt_token", jwt_token)


class SetUser(MiddlewareMixin):
    def reject(self, message="Not authorized"):
        return JsonResponse({
            "message": message
        }, status=401)

    def process_request(self, request):
        if request.path.startswith("/api") and request.path not in settings.ROUTES_WHITE_LIST:
            if not request.jwt_token:
                return self.reject()

            user_id = jwt.extract_user_id(request.jwt_token)
            user = User.objects.filter(id=user_id).first()

            if not user:
                return self.reject("No such user")

            setattr(request, "user", user)
