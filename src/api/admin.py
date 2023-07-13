  
import os
from flask_admin import Admin
from .models import db, User, Book, Review, ExternalReview, Wishlist, Transaction, Support, BookFormat, UserCategory, TransactionItem
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # class UserView(ModelView):
    #     column_hide_backrefs = False
    #     column_list = ('wishlist', 'active', 'roles')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Book, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(ExternalReview, db.session))
    admin.add_view(ModelView(Wishlist, db.session))
    admin.add_view(ModelView(Transaction, db.session))
    admin.add_view(ModelView(Support, db.session))
    admin.add_view(ModelView(BookFormat, db.session))
    admin.add_view(ModelView(UserCategory, db.session))
    admin.add_view(ModelView(TransactionItem, db.session))
  

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))