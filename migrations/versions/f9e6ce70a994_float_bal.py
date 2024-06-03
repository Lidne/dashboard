"""float bal

Revision ID: f9e6ce70a994
Revises: 4f84e6d21e95
Create Date: 2024-05-24 19:07:05.823924

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f9e6ce70a994'
down_revision: Union[str, None] = '4f84e6d21e95'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'balance',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'balance',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=True)
    # ### end Alembic commands ###
