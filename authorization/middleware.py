from django.utils.deprecation import MiddlewareMixin
from helpers import jwt
from TheKinozal import settings
from django.http import JsonResponse
from .models import User


def extract_jwt(get_response):
    def middleware(request):
        jwt_token = jwt.extract_user_token(request)
        setattr(request, "jwt_token", jwt_token)
        return get_response(request)

    return middleware


def set_user(get_response):
    def middleware(request):
        def reject(message="Not authorized"):
            return JsonResponse({
                "detail": message
            }, status=401)

        if request.path.startswith("/api") and request.path not in settings.ROUTES_WHITE_LIST:
            if not request.jwt_token:
                return reject()

            user_id = jwt.extract_user_id(request.jwt_token)
            user = User.objects.filter(id=user_id).first()

            if not user:
                return reject("No such user")

            setattr(request, "user", user)

        return get_response(request)

    return middleware
