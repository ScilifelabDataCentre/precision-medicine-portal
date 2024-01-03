"""First revision to create schema for Articles model.

Revision ID: 0399fb945061
Revises: a657d60a619a
Create Date: 2024-01-02 17:01:33.436071

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0399fb945061'
down_revision: Union[str, None] = 'a657d60a619a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
