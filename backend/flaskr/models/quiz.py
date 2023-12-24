import sqlalchemy as sa
from flaskr.extensions import db
from sqlalchemy.orm import Mapped, mapped_column


class QuizModel(db.Model):
    __tablename__ = "quizzes"

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(80), nullable=False)
    description = sa.Column(sa.String(600), nullable=False)
    author_id: Mapped[int] = mapped_column(sa.ForeignKey("user.id"), nullable=True)
    author: Mapped["User"] = db.relationship()

    questions = db.relationship(
        "QuestionModel",
        back_populates="quiz",
        lazy="dynamic",
        cascade="all, delete",
    )
    
    def to_json(self, include_author=False):
        json = dict(
            id=self.id,
            title=self.title,
            description=self.description,
        )
        if include_author:
            json["author"] = self.author
        return json