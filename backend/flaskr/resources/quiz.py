from flask_smorest import Blueprint
from flask.views import MethodView
from flaskr.controllers import QuizController
from flaskr.schemas import QuizSchema

bp = Blueprint("quizzes", __name__, description="Operations on quizzes")

controller = QuizController()


@bp.route("/quizzes/<int:quiz_id>")
class Quiz(MethodView):
    @bp.response(200, QuizSchema)
    def get(self, quiz_id):
        """Get a quiz by ID"""
        return controller.get_quiz_by_id(quiz_id)

    @bp.response(204)
    def delete(self, quiz_id):
        """Delete a quiz by ID"""
        return controller.delete_quiz_by_id(quiz_id)


@bp.route("/quizzes")
class Quizzes(MethodView):
    @bp.response(200, QuizSchema(many=True))
    def get(self):
        """Get a list of all quizzes"""
        return controller.get_quizzes()

    @bp.arguments(QuizSchema)
    @bp.response(201, QuizSchema)
    def post(self, quiz_data):
        """Create a new quiz"""
        return controller.create_quiz(quiz_data)
