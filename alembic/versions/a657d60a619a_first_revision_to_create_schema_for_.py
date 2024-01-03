"""First revision to create schema for Articles model.

Revision ID: a657d60a619a
Revises: f4488049da99
Create Date: 2024-01-02 17:00:03.313527

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a657d60a619a'
down_revision: Union[str, None] = 'f4488049da99'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
