from django.shortcuts import render, redirect
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets
from rest_framework import permissions

from .models import CustomUser, Levels
from .serializers import UsersSerializer, LevelsSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'score', 'level']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class LevelsViewSet(viewsets.ModelViewSet):
    queryset = Levels.objects.all()
    serializer_class = LevelsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['level']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
