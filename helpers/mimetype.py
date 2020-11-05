import magic
from TheKinozal import settings

def get_mime_by_django_file(django_file):
    buffer = django_file.read(1024)
    mime = magic.from_buffer(buffer, mime=True)
    return mime

def raise_on_invalid_file_type(django_file, mime_white_list):
    mime = get_mime_by_django_file(django_file)

    if mime not in mime_white_list:
        string_white_list = ", ".join(mime_white_list)
        error_message_template = "Invalid file type: {}. Must be one of: {}"
        error_message = error_message_template.format(mime, string_white_list)
        raise TypeError(error_message)

def validate_video_type(django_file):
    raise_on_invalid_file_type(django_file, settings.VIDEO_FILE_MIME_TYPES)
