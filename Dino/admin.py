from django.contrib import admin
from .models import Players

@admin.register(Players)
class PlayersAdmin(admin.ModelAdmin):
    list_display = ('login', 'score')
    search_fields = ('login',)
    ordering = ('login',)