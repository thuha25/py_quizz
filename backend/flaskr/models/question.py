import sqlalchemy as sa
from flaskr.extensions import db


class QuestionModel(db.Model):
    __tablename__ = "questions"

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(300), nullable=False, unique=True)
    quiz_id = sa.Column(sa.Integer, sa.ForeignKey("quizzes.id"))

    quiz = db.relationship("QuizModel", back_populates="questions")

    answers = db.relationship(
        "AnswerModel",
        back_populates="question",
        lazy="dynamic",
        cascade="all, delete",
    )
