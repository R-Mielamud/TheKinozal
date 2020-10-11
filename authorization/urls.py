from django.urls import path, include
from .views import LoginView, RegisterView, ProfilePage

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
    path("profile/", ProfilePage.as_view()),
]
