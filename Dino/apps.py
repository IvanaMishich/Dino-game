from django.apps import AppConfig


class DinoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Dino'

    def ready(self):
        import Dino.signals
