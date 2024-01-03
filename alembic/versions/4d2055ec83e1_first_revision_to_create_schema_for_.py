"""First revision to create schema for Articles model.

Revision ID: 4d2055ec83e1
Revises: 665a55ac5d55
Create Date: 2024-01-02 17:02:12.023482

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4d2055ec83e1'
down_revision: Union[str, None] = '665a55ac5d55'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
