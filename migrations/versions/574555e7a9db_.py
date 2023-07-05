"""empty message

Revision ID: 574555e7a9db
Revises: 
Create Date: 2023-07-04 06:25:21.926676

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '574555e7a9db'
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
    sa.Column('publisher', sa.String(length=100), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('year', sa.String(length=60), nullable=True),
    sa.Column('average_rating', sa.Float(), nullable=True),
    sa.Column('ratings_count', sa.Integer(), nullable=True),
    sa.Column('pages', sa.Integer(), nullable=True),
    sa.Column('preview', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('book_format',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_format', sa.String(length=100), nullable=True),
    sa.Column('book_price', sa.Float(), nullable=False),
    sa.Column('prod_id', sa.String(length=100), nullable=True),
    sa.Column('price_id', sa.String(length=100), nullable=True),
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
    sa.Column('password_hash', sa.LargeBinary(), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=True),
    sa.Column('address', sa.Text(), nullable=True),
    sa.Column('billing_address', sa.Text(), nullable=True),
    sa.Column('user_category', sa.Integer(), nullable=True),
    sa.Column('profile_picture', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['user_category'], ['user_category.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('profile_picture')
    )
    op.create_table('payment_method',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('card_type', sa.String(length=100), nullable=True),
    sa.Column('card_number_hash', sa.Text(), nullable=False),
    sa.Column('first_four_numbers', sa.Integer(), nullable=True),
    sa.Column('card_name', sa.Text(), nullable=False),
    sa.Column('cvc_hash', sa.Text(), nullable=False),
    sa.Column('expiry_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('card_number_hash')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('support',
    sa.Column('ticket_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('subject', sa.Text(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('support_created', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('ticket_id')
    )
    op.create_table('wishlist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('payment_method_id', sa.Integer(), nullable=False),
    sa.Column('total_price', sa.Float(), nullable=True),
    sa.Column('transaction_created', sa.DateTime(), nullable=True),
    sa.Column('in_progress', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['payment_method_id'], ['payment_method.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transaction_item',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('in_progress', sa.Boolean(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('transaction_id', sa.Integer(), nullable=True),
    sa.Column('book_format_id', sa.Integer(), nullable=False),
    sa.Column('unit', sa.Integer(), nullable=False),
    sa.Column('total_price_per_book', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['book_format_id'], ['book_format.id'], ),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['transaction_id'], ['transaction.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transaction_item')
    op.drop_table('transaction')
    op.drop_table('wishlist')
    op.drop_table('support')
    op.drop_table('review')
    op.drop_table('payment_method')
    op.drop_table('user')
    op.drop_table('external_review')
    op.drop_table('user_category')
    op.drop_table('book_format')
    op.drop_table('book')
    # ### end Alembic commands ###
