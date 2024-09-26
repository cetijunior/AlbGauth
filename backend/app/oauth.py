from flask import redirect, url_for, Blueprint, jsonify, request
from .extensions import oauth, db
from .models import User, OAuthToken
import jwt
import datetime
from .config import Config
from sqlalchemy.exc import SQLAlchemyError
from authlib.integrations.base_client.errors import OAuthError

# Create a Blueprint for OAuth routes
oauth_bp = Blueprint('oauth', __name__)

# Route for initiating OAuth login
@oauth_bp.route('/login/<provider>')
def oauth_login(provider):
    try:
        # Generate the redirect URI for the OAuth provider
        redirect_uri = url_for('oauth.authorize', provider=provider, _external=True)
        # Redirect the user to the OAuth provider's authorization page
        return oauth.remote_app(provider).authorize(callback=redirect_uri)
    except OAuthError as e:
        # Handle OAuth-specific errors
        return jsonify({'error': 'OAuth authorization error', 'message': str(e)}), 400
    except Exception as e:
        # Handle general errors
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

# Route for handling the OAuth provider's callback
@oauth_bp.route('/callback/<provider>')
def oauth_callback(provider):
    try:
        # Retrieve the access token from the OAuth provider
        token = oauth.create_client(provider).authorize_access_token()
        # Parse the ID token to get user information
        user_info = oauth.create_client(provider).parse_id_token(token)
        # Check if the user already exists in the database
        user = User.query.filter_by(email=user_info['email']).first()
        if not user:
            # If the user does not exist, create a new user
            user = User(username=user_info['name'], email=user_info['email'], oauth_provider=provider, oauth_id=user_info['sub'])
            db.session.add(user)
            db.session.commit()
        # Store the OAuth token in the database
        oauth_token = OAuthToken(user_id=user.id, provider=provider, token=token)
        db.session.add(oauth_token)
        db.session.commit()
        # Generate a JWT token for the user
        jwt_token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, Config.SECRET_KEY)
        # Return the JWT token to the client
        return jsonify({'token': jwt_token})
    except OAuthError as e:
        # Handle OAuth-specific errors
        return jsonify({'error': 'OAuth callback error', 'message': str(e)}), 400
    except SQLAlchemyError as e:
        # Handle database errors and rollback the session
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
    except jwt.PyJWTError as e:
        # Handle JWT encoding errors
        return jsonify({'error': 'JWT encoding error', 'message': str(e)}), 500
    except Exception as e:
        # Handle general errors
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500