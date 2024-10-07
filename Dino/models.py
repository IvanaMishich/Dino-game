from django.db import models
from .managers import Manager
class Levels(models.Model):
    level = models.IntegerField(
        verbose_name="Уровень",
    )
    score = models.IntegerField(
        verbose_name="Очки",
    )
class Players(models.Model):
    login = models.CharField(
        max_length=20,
        verbose_name="Логин"
    )
    password = models.IntegerField(
        verbose_name="Пароль"
    )
    score = models.IntegerField(
        verbose_name="Очки",
        default=0
    )
    email = models.CharField(
        max_length=50,
        verbose_name="Email",
        default='-'
    )
    level = models.ForeignKey(
        Levels,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Уровень",
        related_name="playerslevel"
    )
    objects = Manager()




