from flaskr.extensions import db
from flask_smorest import abort
from sqlalchemy.exc import SQLAlchemyError

from flaskr.models import QuizModel
from flaskr.models.services.models import WrapResponseDto


class QuizController:
    def get_quizzes(self, author_id=None, filter=None):
        query = QuizModel.query
        if author_id != None:
            query = query.filter_by(author_id=author_id)
        if filter != None:
            query = query.filter(QuizModel.title.like("%" + filter + "%"))
        return query.all()
    
    def update(self, id, update_param):
        QuizModel.query.filter_by(id=id).update(update_param)
        db.session.commit()
        
        return self.get_quiz_by_id(id)

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

    def delete_quiz_by_id(self, quiz_id, author):
        quiz = db.get_or_404(QuizModel, quiz_id)
        if author.id != quiz.author_id:
            return WrapResponseDto.error(
                    "Unauthorized",
                    "You can't delete others' quiz"
                ).to_json(), 401

        db.session.delete(quiz)
        db.session.commit()

        return
