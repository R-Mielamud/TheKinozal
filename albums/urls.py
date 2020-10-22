from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AlbumAPIView, ImportAPIView

router = DefaultRouter()
router.register("", AlbumAPIView)

urlpatterns = [
    path("import/", ImportAPIView.as_view()),
    path("", include(router.urls)),
]
