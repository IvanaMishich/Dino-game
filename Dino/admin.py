from django.contrib import admin
from .models import Players, Levels


@admin.register(Players)
class PlayersAdmin(admin.ModelAdmin):
    list_display = ('login', 'email', 'score', 'level',)
    search_fields = ('login',)
    ordering = ('-score',)


@admin.register(Levels)
class LevelsAdmin(admin.ModelAdmin):
    list_display = ('level', 'score',)
    ordering = ('level',)
