from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


# Model for game levels with score range /Модель уровней игры с диапазоном очков
class Levels(models.Model):
    level = models.IntegerField(
        null=True,
        verbose_name="Уровень",
    )
    min_score = models.IntegerField(
        null=True,
        verbose_name="Минимальные очки",
    )
    max_score = models.IntegerField(
        null=True,
        verbose_name="Максимальные очки",
    )


# Custom user model with score and level / Пользовательская модель с очками и уровнем
class CustomUser(AbstractUser):
    score = models.IntegerField(
        verbose_name="Очки",
        default=0
    )
    level = models.ForeignKey(
        Levels,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Уровень",
        related_name="players_levels",
        default=1
    )
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

