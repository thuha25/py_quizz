from flask import request
from flask_smorest import Blueprint
from flask.views import MethodView
from flaskr.controllers import QuizController
from flaskr.schemas import QuizSchema
from flaskr.util.security import token_required

bp = Blueprint("quizzes", __name__, description="Operations on quizzes")

controller = QuizController()


@bp.route("/quizzes/<int:quiz_id>")
class Quiz(MethodView):
    @bp.response(200, QuizSchema)
    def get(self, quiz_id):
        """Get a quiz by ID"""
        return controller.get_quiz_by_id(quiz_id)
    
    @token_required
    @bp.response(200, QuizSchema)
    def put(self, quiz_id, **kwargs):
        update_params = request.json
        return controller.update(quiz_id, update_params)

    @bp.response(204)
    def delete(self, quiz_id):
        """Delete a quiz by ID"""
        return controller.delete_quiz_by_id(quiz_id)


@bp.route("/quizzes")
class Quizzes(MethodView):
    @bp.response(200, QuizSchema(many=True))
    def get(self):
        """Get a list of all quizzes"""
        filter = None
        author_id = None
        if 'filter' in request.args:
            filter = request.args.get('filter')
        if 'author_id' in request.args:
            author_id = int(request.args.get('author_id'))
        return controller.get_quizzes(author_id=author_id, filter=filter)

    @token_required
    @bp.arguments(QuizSchema)
    @bp.response(201, QuizSchema)
    def post(self, quiz_data, **kwargs):
        """Create a new quiz"""
        return controller.create_quiz(quiz_data, kwargs.get("user"))

