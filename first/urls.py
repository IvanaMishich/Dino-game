from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from rest_framework import routers

from Dino.views import UsersViewSet, LevelsViewSet, registration, index, CustomLoginView, top10

# Creating a router to handle API requests /Создание маршрутизатора для обработки API запросов
router = routers.DefaultRouter()
router.register(r'players', UsersViewSet)
router.register(r'levels', LevelsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('', include(router.urls)),
    path('register/', registration, name='register'),
    path('login/', CustomLoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('top10/', top10, name='top10'),
]
