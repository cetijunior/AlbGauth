from flask import Blueprint
from .auth import auth_bp
from .oauth import oauth_bp

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return 'Welcome to the Authentication Service!'

def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(oauth_bp, url_prefix='/oauth')