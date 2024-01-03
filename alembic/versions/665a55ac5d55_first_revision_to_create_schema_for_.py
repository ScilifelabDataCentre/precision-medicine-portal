"""First revision to create schema for Articles model.

Revision ID: 665a55ac5d55
Revises: 0399fb945061
Create Date: 2024-01-02 17:01:53.621173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '665a55ac5d55'
down_revision: Union[str, None] = '0399fb945061'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
