from django.shortcuts import render, redirect
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import views as auth_views
from .forms import CustomUserCreationForm, CustomLoginForm
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
            score = form.cleaned_data.get('score')
            user = form.save(commit=False) # Создаем пользователя, но не сохраняем его сразу
            if str(score).isdigit():
                user.score = score
            user.save()
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})


class CustomLoginView(auth_views.LoginView):
    authentication_form = CustomLoginForm

    def form_valid(self, form):
        score = self.request.POST.get('score')
        user = form.get_user()

        if str(score).isdigit():
            user.score = int(score)
            user.save()

        return super().form_valid(form)

