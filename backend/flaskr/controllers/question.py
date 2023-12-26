from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from flask_smorest import abort
from flaskr.extensions import db

from flaskr.models import QuestionModel, QuizModel, AnswerModel
from flaskr.models.services.models import WrapResponseDto


class QuestionController:
    def get_questions_in_quiz(self, quiz_id):
        quiz = db.get_or_404(QuizModel, quiz_id)
        return quiz.questions

    def create_question_in_quiz(self, question_data, quiz_id, author):
        title = question_data["title"]
        answers = question_data["answers"]

        quiz = db.get_or_404(QuizModel, quiz_id)
        if author.id != quiz.author_id:
            return WrapResponseDto.error(
                    "Unauthorized",
                    "You can't edit others' question"
                ).to_json(), 401

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

    def delete_question_by_id(self, question_id, author):
        question = db.get_or_404(QuestionModel, question_id)
        quiz = question.quiz
        if author.id != quiz.author_id:
            WrapResponseDto.error(
                    "Unauthorized",
                    "You can't delete others' question"
                ).to_json(), 401

        db.session.delete(question)
        db.session.commit()

        return
