from rest_framework.views import APIView
from django.http import JsonResponse
from .serializers import UserSerializer
from .models import User
from helpers import password, jwt


class LoginView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def reject(self):
        return JsonResponse({
            "message": "Invalid email or password",
        }, status=400)

    def post(self, request):
        email = request.data.get("email")
        passwd = request.data.get("password")
        user = self.queryset.filter(email=email).first()

        if not user:
            return self.reject()

        if not password.check(passwd, user.password):
            return self.reject()

        serializer = self.serializer_class(user)
        jwt_token = jwt.generate_user_token(user.id)

        return JsonResponse({
            "user": serializer.data,
            "jwt_token": jwt_token,
        })


class RegisterView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request):
        try:
            user = self.queryset.create(**request.data)
        except:
            return JsonResponse({
                "message": "This email is already taken",
            }, status=400)

        serializer = self.serializer_class(user)
        jwt_token = jwt.generate_user_token(user.id)

        return JsonResponse({
            "user": serializer.data,
            "jwt_token": jwt_token,
        })


class ProfilePage(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return JsonResponse(serializer.data)
