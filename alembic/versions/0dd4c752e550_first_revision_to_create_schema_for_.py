"""First revision to create schema for Articles model.

Revision ID: 0dd4c752e550
Revises: bb0e95df2673
Create Date: 2024-01-02 17:16:46.737818

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0dd4c752e550'
down_revision: Union[str, None] = 'bb0e95df2673'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
