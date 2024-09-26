from .extensions import db


class User(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    oauth_provider = db.Column(db.String(50))
    oauth_id = db.Column(db.String(100))

class OAuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    provider = db.Column(db.String(50))
    token = db.Column(db.String(200))
    