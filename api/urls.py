from django.urls import path, include

urlpatterns = [
    path("video/", include("videos.urls")),
]
