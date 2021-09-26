import os
from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("POKEAPI_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("POKEAPI_URL_DATABASE")

db = SQLAlchemy(app)
ma = Marshmallow(app)
