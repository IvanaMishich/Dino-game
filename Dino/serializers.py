from rest_framework import serializers
from .models import Players, Levels


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'


class LevelsSerializer(serializers.ModelSerializer):
    players = PlayersSerializer(many=True, read_only=True)

    class Meta:
        model = Levels
        fields =  '__all__'
