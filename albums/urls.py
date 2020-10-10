from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AlbumAPIView

router = DefaultRouter()
router.register("", AlbumAPIView)

urlpatterns = [
    path("", include(router.urls)),
]
