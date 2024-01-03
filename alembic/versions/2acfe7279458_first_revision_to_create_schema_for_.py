"""First revision to create schema for Articles model.

Revision ID: 2acfe7279458
Revises: 3c5e34b088bc
Create Date: 2024-01-02 16:54:51.912776

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2acfe7279458'
down_revision: Union[str, None] = '3c5e34b088bc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
