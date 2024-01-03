"""First revision to create schema for Articles model.

Revision ID: 2f67dfce4909
Revises: 4b91b6734fa4
Create Date: 2024-01-02 17:32:50.601256

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2f67dfce4909'
down_revision: Union[str, None] = '4b91b6734fa4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
