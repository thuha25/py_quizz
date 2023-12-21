import flaskr.models

from flask import Flask
from config import DevelopmentConfig
from flaskr.extensions import db, migrate, api, cors

from flaskr.resources.quiz import bp as quiz_bp
from flaskr.resources.question import bp as question_bp


def create_app(testing_config=None):
    app = Flask(__name__)

    if testing_config is None:
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(testing_config)

    db.init_app(app)
    migrate.init_app(app, db, compare_type=True)
    api.init_app(app)
    cors.init_app(app)

    api.register_blueprint(quiz_bp, url_prefix="/api")
    api.register_blueprint(question_bp, url_prefix="/api")

    return app
