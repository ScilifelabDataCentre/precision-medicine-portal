"""First revision to create schema for Articles model.

Revision ID: 1071a9fccfba
Revises: 17849ddf5c2b
Create Date: 2024-01-02 17:22:25.379242

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1071a9fccfba'
down_revision: Union[str, None] = '17849ddf5c2b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
