"""empty message

Revision ID: 094af6e3bdf0
Revises: 2bf79e2355e1
Create Date: 2023-09-24 09:09:25.182716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '094af6e3bdf0'
down_revision = '2bf79e2355e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=300), nullable=False),
    sa.Column('quiz_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['quiz_id'], ['quizzes.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('questions')
    # ### end Alembic commands ###