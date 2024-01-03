"""First revision to create schema for Articles model.

Revision ID: 78c9c05f7d9d
Revises: 32d10f81cea1
Create Date: 2024-01-02 17:03:57.969626

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '78c9c05f7d9d'
down_revision: Union[str, None] = '32d10f81cea1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
