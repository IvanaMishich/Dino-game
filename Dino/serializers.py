from rest_framework import serializers

from .models import CustomUser, Levels


# Serializers for models to convert data between JSON and database format /Сериализаторы моделей для преобразования данных между форматом JSON и базой данных
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class LevelsSerializer(serializers.ModelSerializer):
    players_levels = UsersSerializer(many=True, read_only=True)

    class Meta:
        model = Levels
        fields = '__all__'
