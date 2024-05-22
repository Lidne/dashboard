import jwt
from config import SECRET_ALGORYTHM, SECRET_AUTH

JWT_SECRET = SECRET_AUTH
JWT_ALGORITHM = SECRET_ALGORYTHM


def token_response(token: str):
    return token


def signJWT(user_data: dict):
    """Создание JWT"""
    info = user_data
    token = jwt.encode(info, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decodeJWT(token: str) -> dict:
    """Расшифровка JWT"""
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token
    except Exception:
        return "No token"
