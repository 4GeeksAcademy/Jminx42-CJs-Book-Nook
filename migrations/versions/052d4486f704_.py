"""empty message

Revision ID: 052d4486f704
Revises: 
Create Date: 2023-05-23 13:51:59.755080

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '052d4486f704'
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
    sa.Column('book_cover', sa.String(length=250), nullable=False),
    sa.Column('book_category', sa.Enum('paperback', 'hardcover', 'ebook', 'audiobook', name='bookcategory'), server_default='paperback', nullable=True),
    sa.Column('genre', sa.Enum('romance', 'fiction', 'non_fiction', 'science_fiction', 'mystery_crime', 'thrillers', 'fantasy', name='genre'), server_default='thrillers', nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('isbn')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=True),
    sa.Column('user_category', sa.Enum('standard', 'platinum', name='usercategory'), server_default='standard', nullable=True),
    sa.Column('profile_picture', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('profile_picture')
    )
    op.create_table('external_review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('external_review', sa.Text(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment_method',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('payment_methods', sa.Enum('visa', 'mastercard', 'american_express', name='paymentmethods'), server_default='visa', nullable=True),
    sa.Column('card_number', mysql.BIGINT(unsigned=True), nullable=False),
    sa.Column('card_name', sa.String(length=100), nullable=False),
    sa.Column('cvc', sa.Integer(), nullable=False),
    sa.Column('expiry_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('card_number')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('payment_methods', sa.Enum('visa', 'mastercard', 'american_express', name='paymentmethods'), server_default='visa', nullable=True),
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
    op.drop_table('wishlist')
    op.drop_table('transaction')
    op.drop_table('review')
    op.drop_table('payment_method')
    op.drop_table('external_review')
    op.drop_table('user')
    op.drop_table('book')
    # ### end Alembic commands ###
