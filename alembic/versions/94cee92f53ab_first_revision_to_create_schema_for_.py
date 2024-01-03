"""First revision to create schema for Articles model.

Revision ID: 94cee92f53ab
Revises: 2acfe7279458
Create Date: 2024-01-02 16:57:59.457386

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '94cee92f53ab'
down_revision: Union[str, None] = '2acfe7279458'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
