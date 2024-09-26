from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from .extensions import db
import jwt
import datetime
from .config import Config
from sqlalchemy.exc import SQLAlchemyError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(data)


        username = data.get('username')
        email = data.get('email')
        password = data.get('password')


        print(f"Username: {username}, Email: {email}, Password: {password}")

        if not username or not email or not password:
            return jsonify({'message': 'Username, email, and password are required!'}), 400

    
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Invalid input!'}), 400

        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(email=data['email'], password=hashed_password, username=data['username'])

        print(f"New User Object: Username: {new_user.username}, Email: {new_user.email}")
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'New user created!'}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': 'Database error!', 'error': str(e)}), 500
    except Exception as e:
        return jsonify({'message': 'Internal server error!', 'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Invalid input!'}), 400

        user = User.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Invalid credentials!'}), 401

        token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, Config.SECRET_KEY)
        return jsonify({'token': token}), 200
    except jwt.PyJWTError as e:
        return jsonify({'message': 'Token generation error!', 'error': str(e)}), 500
    except Exception as e:
        return jsonify({'message': 'Internal server error!', 'error': str(e)}), 500