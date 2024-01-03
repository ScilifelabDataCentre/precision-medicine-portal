"""First revision to create schema for Articles model.

Revision ID: 17849ddf5c2b
Revises: 0dd4c752e550
Create Date: 2024-01-02 17:22:02.763455

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '17849ddf5c2b'
down_revision: Union[str, None] = '0dd4c752e550'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
