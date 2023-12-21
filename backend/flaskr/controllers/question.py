from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from flask_smorest import abort
from flaskr.extensions import db

from flaskr.models import QuestionModel, QuizModel, AnswerModel


class QuestionController:
    def get_questions_in_quiz(self, quiz_id):
        quiz = db.get_or_404(QuizModel, quiz_id)
        return quiz.questions

    def create_question_in_quiz(self, question_data, quiz_id):
        title = question_data["title"]
        answers = question_data["answers"]

        quiz = db.get_or_404(QuizModel, quiz_id)

        question = QuestionModel(title=title, quiz_id=quiz_id)

        try:
            quiz.questions.append(question)

            for data in answers:
                answer = AnswerModel(**data)
                question.answers.append(answer)

            db.session.commit()
        except IntegrityError as e:
            abort(400, message=str(e))
        except SQLAlchemyError as e:
            abort(500, message=str(e))

        return question

    def delete_question_by_id(self, question_id):
        question = db.get_or_404(QuestionModel, question_id)

        db.session.delete(question)
        db.session.commit()

        return
