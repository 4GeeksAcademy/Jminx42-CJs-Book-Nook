"""empty message

Revision ID: 3f5448829ec0
Revises: 
Create Date: 2023-06-09 18:08:55.275722

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3f5448829ec0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('book',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=250), nullable=False),
    sa.Column('author', sa.String(length=120), nullable=False),
    sa.Column('isbn', mysql.BIGINT(unsigned=True), nullable=True),
    sa.Column('book_cover', sa.String(length=250), nullable=True),
    sa.Column('book_cover_b', sa.String(length=250), nullable=True),
    sa.Column('genre', sa.ARRAY(sa.String(length=255)), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('year', sa.String(length=60), nullable=True),
    sa.Column('average_rating', sa.Float(), nullable=True),
    sa.Column('ratings_count', sa.Integer(), nullable=True),
    sa.Column('pages', sa.Integer(), nullable=True),
    sa.Column('preview', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('isbn')
    )
    op.create_table('book_format',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_format', sa.String(length=100), nullable=True),
    sa.Column('book_price', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_category', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('external_review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('external_review', sa.Text(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=True),
    sa.Column('user_category', sa.Integer(), nullable=False),
    sa.Column('profile_picture', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['user_category'], ['user_category.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('profile_picture')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('book_isbn', mysql.BIGINT(unsigned=True), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment_method',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('payment_methods', sa.String(length=100), nullable=True),
    sa.Column('card_number', mysql.BIGINT(unsigned=True), nullable=False),
    sa.Column('card_name', sa.String(length=100), nullable=False),
    sa.Column('cvc', sa.Integer(), nullable=False),
    sa.Column('expiry_date', sa.Date(), nullable=False),
    sa.Column('transaction_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['transaction_id'], ['transaction.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('card_number')
    )
    op.create_table('support',
    sa.Column('ticket_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('enquiries', sa.Text(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('transaction_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['transaction_id'], ['transaction.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('ticket_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('support')
    op.drop_table('payment_method')
    op.drop_table('wishlist')
    op.drop_table('transaction')
    op.drop_table('review')
    op.drop_table('user')
    op.drop_table('external_review')
    op.drop_table('user_category')
    op.drop_table('book_format')
    op.drop_table('book')
    # ### end Alembic commands ###
