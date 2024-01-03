"""First revision to create schema for Articles model.

Revision ID: 32d10f81cea1
Revises: f92957dec1a9
Create Date: 2024-01-02 17:02:39.086693

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '32d10f81cea1'
down_revision: Union[str, None] = 'f92957dec1a9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
