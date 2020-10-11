import jwt
from TheKinozal import settings


def generate_user_token(user_id):
    return jwt.encode({settings.JWT_USER_FIELD: user_id},
                      settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM).decode()


def extract_user_id(token):
    data = jwt.decode(token, settings.SECRET_KEY,
                      algorithms=(settings.JWT_ALGORITHM))

    return data[settings.JWT_USER_FIELD]


def extract_user_token(request):
    header = request.headers.get("Authorization", "")

    if not header.startswith(settings.JWT_PREFIX):
        return None

    return header[len(settings.JWT_PREFIX):]
