from flaskr.extensions import db
from flask_smorest import abort
from sqlalchemy.exc import SQLAlchemyError

from flaskr.models import QuizModel


class QuizController:
    def get_quizzes(self, author_id=None):
        if author_id != None:
            return QuizModel.query.filter_by(author_id=author_id).all()
        return db.session.execute(db.select(QuizModel)).scalars()

    def get_quiz_by_id(self, quiz_id):
        return db.get_or_404(QuizModel, quiz_id)

    def create_quiz(self, quiz_data, author):
        quiz = QuizModel(**quiz_data, author_id = author.id)

        try:
            db.session.add(quiz)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message=str(e))

        return quiz

    def delete_quiz_by_id(self, quiz_id):
        quiz = db.get_or_404(QuizModel, quiz_id)

        db.session.delete(quiz)
        db.session.commit()

        return
