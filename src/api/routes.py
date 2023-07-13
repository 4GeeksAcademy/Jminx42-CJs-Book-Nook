"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint, redirect, json

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime
import bcrypt
import cloudinary
import cloudinary.uploader
from flask_bcrypt import generate_password_hash
from flask_bcrypt import check_password_hash

from datetime import datetime, timedelta
import pytz
import os
import stripe
from stripe.error import StripeError
stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}
stripe.api_key = stripe_keys["secret_key"]


from api.models import db, User, Book, Review, Wishlist, Transaction, Support, TransactionItem, BookFormat
from api.utils import APIException, generate_sitemap


api = Blueprint('api', __name__)   

@api.route("/create/user", methods=["POST"])
def create_user():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None) 
    full_name = body.get("full_name", None)

    if not all([email, password, full_name]):
        return jsonify({"error": "Missing credentials"}), 400

    if "@" not in email: 
        return jsonify({"error": "Please enter a valid email, e.g., user@gmail.com"}), 400

    if len(password) < 5:
        return jsonify({"error": "Your password must have more than 5 characters"}), 400

    already_exist = User.query.filter_by(email=email).first()
    if already_exist:
        return jsonify({"error": "Email already exists in the database"}), 409

    hashed_password = generate_password_hash(password, rounds=None)

    new_user = User(
        email=email,
        password_hash=hashed_password,
        full_name=full_name,
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }), 200

@api.route("/user/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first() #gives the whole user, including the id

    if user:
        is_valid = check_password_hash(user.password_hash, password)

        if is_valid:
            print('User succesfully logged in')
            access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=90))
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"error": "Your username or password is incorrect."}), 400
        
    return jsonify({"error": "Your username or password is incorrect."}), 400

@api.route("/user/validate", methods=["GET"])
@jwt_required()
def validate_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"user": user.serialize()}), 200
    

@api.route("/user", methods=['GET'])
@jwt_required()
def get_user_by_id():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    return jsonify({"user": user.serialize()}), 200

@api.route("/user/update", methods=["PUT"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    body = request.json
    password = body.get("password", "").strip()
    if password:
        if len(password) < 5 or not password:
            return jsonify({"error": "Your password should be at least 5 characters long and not be empty"}), 400

        user.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    if "full_name" in body:
        user.full_name = body["full_name"]
        
    if "address" in body:
        user.address = body["address"]

    if "billing_address" in body:
        user.billing_address = body["billing_address"]

    db.session.commit()

    return jsonify({"message": "User has successfully been updated."}), 200

@api.route('/user/image', methods=['POST'])
@jwt_required()
def handle_upload_image():
    user_id = get_jwt_identity()

    if 'profile_image' not in request.files:
        raise APIException('Missing profile_image in the request form data', 400)

    uploaded_file = request.files['profile_image']
    if uploaded_file.filename == '':
        raise APIException('No selected file', 400)

    # Upload file to Cloudinary
    result = cloudinary.uploader.upload(uploaded_file)

    # Fetch the user
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    # Update the user with the Cloudinary image URL
    user.profile_picture = result['secure_url']
    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/book", methods=['GET'])
def get_all_books():
    books = Book.query.all()
    serialized_books = [book.serialize() for book in books]

    return jsonify({"books": serialized_books}), 200  

@api.route("/book/<int:isbn>", methods=['GET'])
def get_one_book_by_id(isbn):
    book = Book.query.filter_by(isbn = isbn).first()
    if not book:

        return jsonify({"error": "No book found with this ISBN"}), 400


    return jsonify({"book": book.serialize()}), 200 


@api.route("/user_reviews", methods=['GET'])
@jwt_required()
def get_user_reviews():
    user_id = get_jwt_identity()
    reviews = Review.query.filter_by(user_id=user_id).all()
    serialized_reviews = [review.serialize() for review in reviews]

    return jsonify({"reviews": serialized_reviews}), 200
 

@api.route("/edit-review", methods=["PUT"]) #Why don't we need the /<int:book_id>
@jwt_required()
def update_review_endpoint():
    user_id = get_jwt_identity()
    body = request.json
    review = Review.query.filter_by(book_id=body["book_id"]).first()
    if not review:
        return jsonify({"error": "Please post your review first"}), 400

    review.review = body["review"]
    review.rating = body["rating"]
    

    db.session.commit()
    return jsonify({"review": "Review was updated successfully"}), 200

@api.route("/review", methods=["POST"])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
       
        if "review" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        review = Review.query.filter_by(book_id=body["book_id"], user_id=user_id).first()
        if not review:
            new_review = Review(
                book_id=body["book_id"],
                user_id=user_id,
                review=body["review"],
                rating=body["rating"],
            )
            db.session.add(new_review)
            db.session.commit()

            review_data = {
                "book_id": new_review.book_id,
                "user_id": new_review.user_id,
                "review": new_review.review,
                "rating": new_review.rating,
            }
            return jsonify({"review": review_data}), 200
        return jsonify({"error": "You can only submit one review for each book"}), 400
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route("/removeReview", methods=["DELETE"])
@jwt_required()
def delete_review():
    user_id = get_jwt_identity()
    body = request.json 

    review = Review.query.filter_by(id = body["review_id"], user_id=user_id).first()
    if not review:
        return jsonify({"error": "No review found with this ID"}), 400

    db.session.delete(review)
    db.session.commit()
    return jsonify({"review": "Review was removed successfully"}), 200


@api.route("/wishlist", methods=["POST"])
@jwt_required()
def create_wishlist():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
       
        if "book_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        wishlist = Wishlist.query.filter_by(book_id=body["book_id"], user_id=user_id).first()
        if not wishlist:
            new_wishlist = Wishlist(
                book_id=body["book_id"],
                user_id=user_id
            )
            db.session.add(new_wishlist)
            db.session.commit()

            wishlist_data = {
                "book_id": new_wishlist.book_id,
                "user_id": new_wishlist.user_id
            }
            return jsonify({"wishlist": wishlist_data}), 200
        else:
            db.session.delete(wishlist)
            db.session.commit()
            return jsonify({"wishlist": "Book was successfully removed from wishlist"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @api.route("/createTransaction", methods=["POST"])
# @jwt_required()
# def create_transaction():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
#     try:
#         body = request.json
        
#         if "items" not in body:
#             return jsonify({"error": "'items' key is missing in the request body"}), 400

#         items_data = body["items"]

#         if not isinstance(items_data, list):
#             return jsonify({"error": "'items' should be an array in the request body"}), 400


#         total_price = 0
#         items = TransactionItem.query.filter_by(user_id=user_id, in_progress=True).all()
#         for x in items:
#             total_price += x.total_price_per_book
        
        
#         new_transaction = Transaction(
#             user=user,
#             total_price=total_price,
#             in_progress=False,
#         )
#         print(new_transaction)
#          # Assign the items to the new transaction
#         new_transaction.items.extend(items)
        
#         db.session.add(new_transaction)
#         db.session.commit()

#         return jsonify({"transaction": new_transaction.serialize()}), 200

#     except Exception as e:
#         # Handle other errors
#         print(e)
#         return jsonify({"error": str(e)}), 500

@jwt_required()
def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    user_id = get_jwt_identity()
    
    total_price = 0
    items = TransactionItem.query.filter_by(user_id=user_id, in_progress=True).all()
    for x in items:
        total_price += x.total_price_per_book  

    total_price = round(total_price, 2)  
    
    return int(total_price * 100)

#This one is working!!!
@api.route('/create-payment-intent', methods=['POST'])
@jwt_required()
def create_payment():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(body['items']),
            currency='eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        
        items = TransactionItem.query.filter_by(user_id=user_id, in_progress=True).all()
        
        new_transaction = Transaction(
            payment_method_id=body["payment_method_id"],
            user=user,
            total_price=calculate_order_amount(body['items']),
            in_progress=True,
        )

        print(new_transaction)
        new_transaction.items.extend(items)
        
        db.session.add(new_transaction)
        db.session.commit()

        return jsonify({
            'clientSecret': intent['client_secret'], "transaction": new_transaction.serialize()
        })
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 403

@api.route('/createTransaction', methods=['POST'])
@jwt_required()
def create_transaction():
    user_id = get_jwt_identity()
    
    try:
          
        total_price = 0
        items = TransactionItem.query.filter_by(user_id=user_id, in_progress=True).all()
        for x in items:
            total_price += x.total_price_per_book  
      
        total_price = round(total_price, 2)
       
        new_transaction = Transaction(
            user_id=user_id,
            total_price=total_price,
            in_progress=False,
        )
                
        for item in items:
            new_transaction.items.append(item)

            if not item:
                return jsonify({"error": "Invalid transaction item."}), 400
            
            item.in_progress = False

        db.session.add(new_transaction)
        db.session.commit()

       
    except Exception as e:
        print(e)
        return str(e)

    return jsonify({"transaction": new_transaction.serialize()}), 200
    
@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    user_id = get_jwt_identity()
    # domain_url = "https://carolina-hora-curly-engine-44679qp76gxfj6rq-3000.preview.app.github.dev/"
    domain_url = os.getenv('FRONTEND_URL')
    stripe.api_key = stripe_keys["secret_key"]
    
    try:
        body = request.json

        if not isinstance(body, list):
            return jsonify({"error": "Invalid request body. Expected a list of items."}), 400
        
        line_items = {}
        
        for item in body:
            price_id = item.get('price_id')
            quantity = item.get('quantity')
            
            if not price_id or not quantity:
                return jsonify({"error": "Invalid item format. Each item must have a 'price_id' and 'quantity'."}), 400
            
            if price_id and quantity:
                if price_id in line_items:
                    line_items[price_id] += quantity
                else:
                    line_items[price_id] = quantity
        
        formatted_line_items = [
            {'price': price_id, 'quantity': quantity}
            for price_id, quantity in line_items.items()
        ]

        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "cancelled",
            mode='payment',
            line_items=formatted_line_items,
 
            
        )
        print(checkout_session["url"])
    except Exception as e:
        return str(e)

    return jsonify({"checkout_session": checkout_session}), 303

@api.route("/checkout", methods=["POST"])
@jwt_required()
def add_item_to_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
        print(body)
        if "book_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400

        item = TransactionItem.query.filter_by(book_id=body["book_id"], user_id=user_id, book_format_id=body["book_format_id"]).first()
        price = BookFormat.query.get(body["book_format_id"]).book_price

        if not item:
            new_item = TransactionItem(
                book_id=body["book_id"],
                user_id=user_id,
                book_format_id=body["book_format_id"],
                unit=body["unit"],
                total_price_per_book=body["unit"] * price,
            )
            db.session.add(new_item)
            db.session.commit()
        else:
            item.unit =item.unit+1
            item.total_price_per_book = item.unit*price
            db.session.commit()
            return jsonify({"item": "Book was successfully added to the cart"}), 200

        return jsonify({"transaction": new_item.serialize()}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@api.route("/addunit", methods=["PUT"])
@jwt_required()
def add_unit():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
        
        if "transaction_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        item = TransactionItem.query.get(body["transaction_id"])
        price = BookFormat.query.get(item.book_format_id).book_price
        if item:
            item.unit =item.unit+1
            item.total_price_per_book = item.unit*price
            db.session.commit()
            return jsonify({"item": "Book was added successfully to the cart"}), 200
       
        return jsonify({"transaction": item.serialize()}), 200
           
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
@api.route("/removeunit", methods=["PUT"])
@jwt_required()
def remove_unit():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json 
        if "transaction_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        item = TransactionItem.query.get(body["transaction_id"])
        price = BookFormat.query.get(item.book_format_id).book_price
        if item and item.unit > 1:
            item.unit =item.unit-1
            item.total_price_per_book = item.unit*price
            db.session.commit()
            return jsonify({"item": "Book was removed successfully from the cart"}), 200
        elif item.unit == 1:
            db.session.delete(item)
            db.session.commit()
            return jsonify({"item": "Book was removed successfully from the cart"}), 200

        return jsonify({"transaction": item.serialize()}), 200
           
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
@api.route("/removeitem", methods=["DELETE"])
@jwt_required()
def delete_item():
    user_id = get_jwt_identity()
    body = request.json 
    item = TransactionItem.query.get(body["transaction_id"])
    if not item:
        return jsonify({"error": "No item found with this id"}), 400

    db.session.delete(item)
    db.session.commit()
    return jsonify("item deleted"), 200

@api.route("/bookformat", methods=['GET'])
def get_book_format():
    book_formats = BookFormat.query.all()
    serialized_book_formats = [book_format.serialize() for book_format in book_formats]
  
    if not book_formats:
        return jsonify({"error": "There was an error fetching the data you requested"}), 400

    return jsonify({"book_formats": serialized_book_formats}), 200 


@api.route("/support", methods=["POST"])
@jwt_required()
def create_support():
    user_id = get_jwt_identity()
    body = request.json
    if not body:
        return jsonify({"error": "missing requirements"}), 400
    else:
        support_created = datetime.now(pytz.utc)
        new_support = Support(
            user_id=user_id,
            subject=body["subject"],
            message=body["message"],
            support_created=support_created
            
        )
        db.session.add(new_support)
        db.session.commit()

        return jsonify({"support": "Your message has successfully been submitted"}), 200
    