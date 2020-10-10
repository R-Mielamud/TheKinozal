from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import VideoAPIView

router = DefaultRouter()
router.register("", VideoAPIView)

urlpatterns = [
    path("", include(router.urls)),
]
