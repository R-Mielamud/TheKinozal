import bcrypt


def hash(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(14)).decode()


def check(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed.encode())
