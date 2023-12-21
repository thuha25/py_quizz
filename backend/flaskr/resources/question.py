from flask_smorest import Blueprint
from flask.views import MethodView
from flaskr.schemas import QuestionSchema
from flaskr.controllers import QuestionController

bp = Blueprint("questions", __name__, description="Operations on questions")

controller = QuestionController()


@bp.route("/questions/<int:question_id>")
class Question(MethodView):
    @bp.response(204)
    def delete(self, question_id):
        """Delete a question by ID"""
        return controller.delete_question_by_id(question_id)


@bp.route("/quizzes/<int:quiz_id>/questions")
class QuestionsInQuiz(MethodView):
    @bp.response(200, QuestionSchema(many=True))
    def get(self, quiz_id):
        """Get a list of all questions in a quiz"""
        return controller.get_questions_in_quiz(quiz_id)

    @bp.arguments(QuestionSchema)
    @bp.response(201, QuestionSchema)
    def post(self, question_data, quiz_id):
        """Create a question in a quiz"""
        return controller.create_question_in_quiz(question_data, quiz_id)
