from django.contrib import admin

from .models import CustomUser, Levels

# Registering models in the Django admin panel with custom configuration /Регистрация моделей в административной панели Django с пользовательской конфигурацией
@admin.register(CustomUser)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'score', 'level',)
    search_fields = ('username',)
    ordering = ('-score',)


@admin.register(Levels)
class LevelsAdmin(admin.ModelAdmin):
    list_display = ('level', 'min_score', 'max_score',)
    ordering = ('level',)
