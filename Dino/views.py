from django.shortcuts import render, redirect
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import views as auth_views
from .forms import CustomUserCreationForm, CustomLoginForm
from rest_framework import viewsets, permissions


from .models import CustomUser, Levels
from .serializers import UsersSerializer, LevelsSerializer


# View to render the main page with the current user's ID /Представление для рендеринга главной страницы с ID текущего пользователя
def index(request):
    user = request.user
    context = {
        'player_id': user.id
    }
    return render(request, 'index.html', context)


# ViewSet for managing players through the API /ViewSet для управления пользователями через API
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


# View to render the top 10 players based on their score /Представление для отображения топ-10 игроков по их очкам
def top10(request):
    top = CustomUser.objects.order_by('-score')[:10]
    return render(request, 'top10.html', {'top10': top})


# ViewSet for managing levels through the API /Представление для управления уровнями через API
class LevelsViewSet(viewsets.ModelViewSet):
    queryset = Levels.objects.all()
    serializer_class = LevelsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['level']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


# View to render user registration page /Представление для рендеринга страницы регистрации пользователя
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


# Custom login view with additional score handling /Кастомное представление для входа с дополнительной обработкой очков
class CustomLoginView(auth_views.LoginView):
    authentication_form = CustomLoginForm

    def form_valid(self, form):
        score = self.request.POST.get('score')
        user = form.get_user()

        if str(score).isdigit():
            user.score = int(score)
            user.save()

        return super().form_valid(form)

