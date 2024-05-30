"""check

Revision ID: c6d5f6004879
Revises: 38cd507d8c33
Create Date: 2024-05-22 22:58:47.306296

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'c6d5f6004879'
down_revision: Union[str, None] = '38cd507d8c33'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'balance')
    op.drop_column('users', 'purchased_shares')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('purchased_shares', postgresql.JSON(astext_type=sa.Text()), autoincrement=False, nullable=True))
    op.add_column('users', sa.Column('balance', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
