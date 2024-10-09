from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Players, Levels
from .serializers import PlayersSerializer, LevelsSerializer


class PlayersViewSet(viewsets.ModelViewSet):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer


class LevelsViewSet(viewsets.ModelViewSet):
    queryset = Levels.objects.all()
    serializer_class = LevelsSerializer

# Create your views here.
