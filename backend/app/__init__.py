from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# create db object globally
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    # -------------------
    # Database Config
    # -------------------
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # initialize db with app
    db.init_app(app)

    # -------------------
    # Import Routes
    # # -------------------
    from app.routes.user import user_bp
    from app.routes.adminRoute import admin_bp

    app.register_blueprint(user_bp)
    app.register_blueprint(admin_bp)

    # -------------------
    # Create DB tables
    # -------------------
    with app.app_context():

        db.create_all()

    return app
