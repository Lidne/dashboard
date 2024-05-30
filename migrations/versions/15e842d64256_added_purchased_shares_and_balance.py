"""added purchased_shares and balance

Revision ID: 15e842d64256
Revises: d5e88a098bcd
Create Date: 2024-05-24 18:00:27.721109

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '15e842d64256'
down_revision: Union[str, None] = 'd5e88a098bcd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('purchased_shares', sa.JSON(), nullable=True))
    op.add_column('users', sa.Column('balance', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'balance')
    op.drop_column('users', 'purchased_shares')
    # ### end Alembic commands ###
