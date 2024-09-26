from flask import Flask
from .config import Config
from .extensions import db, migrate, oauth
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)

    load_dotenv()
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    oauth.init_app(app)

    with app.app_context():
        from . import routes, auth
        db.create_all()

        # Register the auth blueprint
        app.register_blueprint(auth.auth_bp, url_prefix='/auth')

    return app