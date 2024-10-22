from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail

from .models import CustomUser


@receiver(pre_save, sender=CustomUser)
def send_message(sender, instance, **kwargs):
    if instance.pk:
        old_score = sender.objects.get(pk=instance.pk)
        old_score = old_score.score
        if instance.score > old_score:
            send_mail(
                'Новый рекорд!',
                f'Поздравляем! Вы побили новый рекорд:\n {instance.score} очков',
                'game.info.users@gmail.com',
                [instance.email],
                           fail_silently=False,
            )