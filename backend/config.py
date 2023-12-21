import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = True
    API_TITLE = "QuizApp REST API"
    API_VERSION = "v1"
    OPENAPI_URL_PREFIX = "/"
    OPENAPI_SWAGGER_UI_PATH = "/docs"


class DevelopmentConfig(Config):
    OPENAPI_VERSION = "3.0.3"
    OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "data.db")
