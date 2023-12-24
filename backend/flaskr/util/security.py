import bcrypt
from functools import wraps
from flask import abort, current_app, request
import jwt
from flaskr.extensions import db
from flaskr.models.session import Session
from flaskr.models.user import User
from flaskr.models.services.models import WrapResponseDto


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            session: Session = Session.query.filter_by(
                access_token=token).first()

            if not session:
                return WrapResponseDto.error(
                    "Unauthorized",
                    "Invalid authentication token"
                ).to_json(), 401

            if session.is_access_expired:
                return WrapResponseDto.error(
                    "Unauthorized",
                    "Access token has expired. Please request a new one."
                ).to_json(), 401
            if session.is_refresh_expired:
                db.session.delete(session)
                db.session.commit()
                return WrapResponseDto.error(
                    "Unauthorized",
                    "Session has expired."
                ).to_json(), 401
            current_user = session.user
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(user=current_user, *args, **kwargs)

    return decorated


def get_hash_password(password: str):
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt().decode('utf-8') + "The secret key"
    hash_password = bcrypt.hashpw(bytes, salt.encode('utf-8'))
    return hash_password


def check_password(password, hash_password):
    bytes = password.encode('utf-8')
    return bcrypt.checkpw(bytes, hash_password)


def generate_hash(data: dict[str, any]):
    return jwt.encode(data, key="The secret key", algorithm="HS256")
