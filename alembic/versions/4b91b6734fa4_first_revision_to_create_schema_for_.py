"""First revision to create schema for Articles model.

Revision ID: 4b91b6734fa4
Revises: 1071a9fccfba
Create Date: 2024-01-02 17:25:11.198754

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4b91b6734fa4'
down_revision: Union[str, None] = '1071a9fccfba'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
