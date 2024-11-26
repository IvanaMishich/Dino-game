from django.apps import AppConfig

# Configuring the 'Dino' app in Django /Конфигурация приложения 'Dino' в Django
class DinoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Dino'

    # importing signals /импорт сигналов
    def ready(self):
        import Dino.signals
