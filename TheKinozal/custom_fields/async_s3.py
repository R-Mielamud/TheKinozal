from django.db.models import FileField
from threading import Timer

class AsyncS3FileField(FileField):
    instance = None

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
        old_instance = self.instance
        self.instance = model_instance

        uploaded_file = bool(getattr(self.instance, self.name))
        changed_file = old_instance.custom_link != self.instance.custom_link if old_instance else True
        should_start_time = uploaded_file and changed_file

        if should_start_time:
            self.set_url_timer()

        return super().pre_save(model_instance, add)
