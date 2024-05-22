"""added balance and purchased_shares

Revision ID: 38cd507d8c33
Revises: d4c7a4171ed0
Create Date: 2024-05-19 22:43:13.334280

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '38cd507d8c33'
down_revision: Union[str, None] = 'd4c7a4171ed0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('purchased_shares', sa.JSON(), nullable=True))
    op.add_column('users', sa.Column('balance', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'balance')
    op.drop_column('users', 'purchased_shares')
    # ### end Alembic commands ###
