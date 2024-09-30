from django.db import models

class Manager(models.Manager):
    def creating(self, logi, passw, mail):
        from .models import Players
        return self.create(login=logi, password=passw, email=mail, score=0)