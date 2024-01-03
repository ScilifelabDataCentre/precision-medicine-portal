"""First revision to create schema for Articles model.

Revision ID: f92957dec1a9
Revises: 4d2055ec83e1
Create Date: 2024-01-02 17:02:12.825295

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f92957dec1a9'
down_revision: Union[str, None] = '4d2055ec83e1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
