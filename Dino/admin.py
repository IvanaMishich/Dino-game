from django.contrib import admin

from .models import CustomUser, Levels


@admin.register(CustomUser)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'score', 'level',)
    search_fields = ('username',)
    ordering = ('-score',)


@admin.register(Levels)
class LevelsAdmin(admin.ModelAdmin):
    list_display = ('level', 'min_score', 'max_score',)
    ordering = ('level',)
