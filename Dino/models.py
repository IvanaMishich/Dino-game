from django.db import models
from .managers import Manager
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
    objects = Manager()


