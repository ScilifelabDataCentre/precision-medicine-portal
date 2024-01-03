"""First revision to create schema for Articles model.

Revision ID: bb0e95df2673
Revises: 78c9c05f7d9d
Create Date: 2024-01-02 17:10:49.371056

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bb0e95df2673'
down_revision: Union[str, None] = '78c9c05f7d9d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
