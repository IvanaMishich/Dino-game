from django.db import models

class Manager(models.Manager):
    def creating(self, logi, passw):
        from .models import Players
        return self.create(login=logi, password=passw)