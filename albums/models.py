from django.db.models import *
from authorization.models import User


class Album(Model):
    name = CharField(max_length=30)
    favorite = BooleanField(default=False)
    user = ForeignKey(to=User, related_name="albums",
                      on_delete=CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name
