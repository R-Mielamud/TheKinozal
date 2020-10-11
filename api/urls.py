from django.urls import path, include

urlpatterns = [
    path("video/", include("videos.urls")),
    path("album/", include("albums.urls")),
    path("auth/", include("authorization.urls")),
]
