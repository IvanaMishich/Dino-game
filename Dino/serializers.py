from rest_framework import serializers

from .models import CustomUser, Levels


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class LevelsSerializer(serializers.ModelSerializer):
    players_levels = UsersSerializer(many=True, read_only=True)

    class Meta:
        model = Levels
        fields = '__all__'
