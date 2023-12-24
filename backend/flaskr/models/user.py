from datetime import datetime
from typing import List
from flaskr.extensions import db
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(db.Model):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), nullable=True)
    role: Mapped["Role"] = relationship(cascade="save-update")

    quizzes: Mapped[List["QuizModel"]] = relationship(back_populates="author")

    def to_json(self):
        return dict(
            id=self.id,
            username=self.username,
            email=self.email,
            role=self.role.to_json() if self.role != None else "Guest",
            quizzes=[quiz.to_json(False) for quiz in self.quizzes]
        )
