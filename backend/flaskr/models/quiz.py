import sqlalchemy as sa
from flaskr.extensions import db


class QuizModel(db.Model):
    __tablename__ = "quizzes"

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(80), nullable=False)
    description = sa.Column(sa.String(600), nullable=False)

    questions = db.relationship(
        "QuestionModel",
        back_populates="quiz",
        lazy="dynamic",
        cascade="all, delete",
    )
