from django.shortcuts import render, redirect
from django_filters.rest_framework import DjangoFilterBackend
from .forms import CustomUserCreationForm
from rest_framework import viewsets
from rest_framework import permissions

from .models import CustomUser, Levels
from .serializers import UsersSerializer, LevelsSerializer


def index(request):
    user = request.user
    context = {
        'player_id': user.id
    }
    return render(request, 'index.html', context)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'score', 'level']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update']:
            return [permissions.IsAuthenticated()]
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
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

