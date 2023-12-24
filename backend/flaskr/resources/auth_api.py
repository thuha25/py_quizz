from http import HTTPStatus
from flask import Response, request
from flask_smorest import Blueprint

import json
from flaskr.models.services.auth_service import AuthService

from flaskr.models.services.models import LoginRequestDto, RegisterRequestDto, WrapResponseDto
from flaskr.util.security import token_required

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["POST"])
def login():
    try:
        if request.is_json:
            data = request.json
            login_request = LoginRequestDto.from_json(data)
        if not request.is_json or login_request.type == -1:
            if "Authorization" in request.headers:
                token = request.headers["Authorization"]
                login_request = LoginRequestDto.from_access_token(token)
            else:
                return Response(
                    response=json.dumps(WrapResponseDto.error("Invalid login data", "Empty request").to_json()),
                    status=HTTPStatus.BAD_REQUEST,
                    headers={
                        "Content-Type": "application/json"
                    }
                )
        response = AuthService.login(login_request)
        return Response(
            response=json.dumps(response.to_json()),
            status=HTTPStatus.BAD_REQUEST if response.is_error else HTTPStatus.OK,
            headers={
                "Content-Type": "application/json"
            }
        )
    except Exception as e:
        return Response(
            response=json.dumps(WrapResponseDto.error(str(e)).to_json()),
            status=HTTPStatus.INTERNAL_SERVER_ERROR,
            headers={
                "Content-Type": "application/json"
            }
        )


@auth.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        register_request = RegisterRequestDto.from_json(data)
        response = AuthService.register(register_request)
        return Response(
            response=json.dumps(response.to_json()),
            status=HTTPStatus.BAD_REQUEST if response.is_error else HTTPStatus.OK,
            headers={
                "Content-Type": "application/json"
            }
        )
    except Exception as e:
        return Response(
            response=json.dumps(WrapResponseDto.error(str(e)).to_json()),
            status=HTTPStatus.INTERNAL_SERVER_ERROR,
            headers={
                "Content-Type": "application/json"
            }
        )


@auth.route("/logout", methods=["POST"])
@token_required
def logout(user):
    try:
        token = request.headers["Authorization"]
        response = AuthService.logout(token)
        return Response(
            response=json.dumps(response.to_json()),
            status=HTTPStatus.OK,
            headers={
                "Content-Type": "application/json"
            }
        )
    except Exception as e:
        return Response(
            response=json.dumps(WrapResponseDto.error(str(e)).to_json()),
            status=HTTPStatus.INTERNAL_SERVER_ERROR,
            headers={
                "Content-Type": "application/json"
            }
        )


@auth.route("/refresh-access", methods=["GET"])
def request_access_token():
    try:
        token = request.args.get("refresh-token")
        response = AuthService.request_access_token(token)
        return Response(
            response=json.dumps(response.to_json()),
            status=HTTPStatus.OK,
            headers={
                "Content-Type": "application/json"
            }
        )
    except Exception as e:
        return Response(
            response=json.dumps(WrapResponseDto.error(str(e)).to_json()),
            status=HTTPStatus.INTERNAL_SERVER_ERROR,
            headers={
                "Content-Type": "application/json"
            }
        )
