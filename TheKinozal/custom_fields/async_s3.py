from django.db.models import FileField
from threading import Timer

class AsyncS3FileField(FileField):
    instance = None

    def uploaded_file(self):
        field_value = getattr(self.instance, self.name)
        return bool(field_value)

    def set_url_timer(self):
        timer = Timer(2, self.maybe_update_url)
        timer.start()

    def maybe_update_url(self):
        if self.storage.uploaded_s3:
            self.url = self.storage.url(self.name)
            self.path = None
            self.instance.save()

            return

        self.set_url_timer()

    def pre_save(self, model_instance, add):
        self.instance = model_instance

        if self.uploaded_file():
            self.set_url_timer()

        return super().pre_save(model_instance, add)
