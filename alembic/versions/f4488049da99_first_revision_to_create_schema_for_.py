"""First revision to create schema for Articles model.

Revision ID: f4488049da99
Revises: 94cee92f53ab
Create Date: 2024-01-02 16:58:53.883855

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f4488049da99'
down_revision: Union[str, None] = '94cee92f53ab'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
