from datetime import datetime

from flask import current_app
from flaskr.models.login_data import LoginData

from flaskr.models.services.models import LoginRequestDto, RegisterRequestDto, WrapResponseDto
from flaskr.models.session import Session
from flaskr.models.user import User
from flaskr.util.security import check_password, generate_hash, get_hash_password

from flaskr.extensions import db


class AuthService:
    def login(login_request: LoginRequestDto) -> WrapResponseDto:
        if login_request.type == -1:
            return WrapResponseDto.error("Bad request", "Request arguments is not correct")
        if login_request.type == 0:
            email = login_request.email
            password = login_request.password

            login_data: LoginData = LoginData.query.filter(
                LoginData.user.has(email=email)).first()
            if not login_data:
                return WrapResponseDto.error("Bad request", "Email not found")

            password_hash = login_data.password_hash
            if not check_password(password, password_hash):
                return WrapResponseDto.error("Bad request", "Password is wrong")

            access_token = generate_hash({
                "user_id": login_data.user.id,
                "time": datetime.now().timestamp()
            })

            refresh_token = generate_hash({
                "user_id": login_data.user.id,
                "time": datetime.now().timestamp()
            })

            session: Session = Session(
                id=None,
                user=login_data.user,
                access_token=access_token,
                refresh_token=refresh_token,
                a_create_time=datetime.now(),
                r_create_time=datetime.now(),
                a_expire=86400,
                r_expire=86400 * 30
            )

            db.session.add(session)
            db.session.commit()

            return WrapResponseDto.success({
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": login_data.user.to_json()
            }, "Successfully login")

        token = login_request.access_token
        session: Session = Session.query.filter_by(access_token=token).first()
        if not session or session.is_refresh_expired:
            db.session.delete(session)
            db.session.commit()
            return WrapResponseDto.error("Bad request", "Session has expired")

        if session.is_access_expired:
            return WrapResponseDto.error("Bad request", "Access token has expired. Please request a new one")

        return WrapResponseDto.success({
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "user": session.user.to_json()
        }, "Successfully login")

    def register(register_info: RegisterRequestDto):
        user: User = User.query.filter_by(email=register_info.email).first()
        if user:
            return WrapResponseDto.error(
                "Bad request",
                f"User with email '{register_info.email}' has already existed"
            )
        user = User(
            id=None,
            username=register_info.username,
            email=register_info.email,
            role_id=1
        )
        password_hash = get_hash_password(register_info.password)
        login_data = LoginData(
            user=user,
            password_hash=password_hash
        )
        db.session.add(user)
        db.session.add(login_data)
        db.session.commit()
        return WrapResponseDto.success(
            user.to_json(),
            "Successfully registered"
        )

    def logout(token: str):
        session: Session = Session.query.filter_by(access_token=token).first()
        if not session:
            return WrapResponseDto.error(
                "Bad request",
                "Already logout"
            )
        db.session.delete(session)
        db.session.commit()
        return WrapResponseDto.success(
            None,
            "Successfully logout"
        )

    def request_access_token(refresh_token: str):
        session: Session = Session.query.filter_by(
            refresh_token=refresh_token).first()
        if not session:
            return WrapResponseDto.error(
                "Bad request",
                "Invalid refresh token"
            )
        if session.is_refresh_expired:
            db.session.delete(session)
            db.session.commit()
            return WrapResponseDto.error(
                "Bad request",
                "Session has expired"
            )
        access_token = generate_hash({
            "user_id": session.user.id,
            "time": datetime.now().timestamp()
        })
        session.access_token = access_token
        db.session.commit()
        return WrapResponseDto.success({
            "access_token": access_token
        },
            "Successfully create new access token"
        )
