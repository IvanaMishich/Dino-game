from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Players, Levels
from .serializers import PlayersSerializer, LevelsSerializer


class PlayersViewSet(viewsets.ModelViewSet):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['login', 'score', 'level']


class LevelsViewSet(viewsets.ModelViewSet):
    queryset = Levels.objects.all()
    serializer_class = LevelsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['level']

# Create your views here.
