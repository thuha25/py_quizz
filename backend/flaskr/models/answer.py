import sqlalchemy as sa
from flaskr.extensions import db


class AnswerModel(db.Model):
    __tablename__ = "answers"

    id = sa.Column(sa.Integer, primary_key=True)
    text = sa.Column(sa.String(600), nullable=False, unique=True)
    is_correct = sa.Column(sa.Boolean, default=False)
    question_id = sa.Column(sa.Integer, sa.ForeignKey("questions.id"))

    question = db.relationship("QuestionModel", back_populates="answers")
