from django.db.models import *
from helpers import password


class User(Model):
    email = EmailField(unique=True)
    password = CharField(max_length=100)
    is_active = True

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.password = password.hash(self.password)

        return super().save(*args, **kwargs)

    def __str__(self):
        return self.email
