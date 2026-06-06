from app import db


class projectTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=False)
    url = db.Column(db.String(200), nullable=False)


class skilltable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(200), nullable=False)


class QualificationTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(100), nullable=False)
    college = db.Column(db.String(200), nullable=False)
    year = db.Column(db.String(10), nullable=False)


class Certificatetable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    issuer = db.Column(db.String(100))
    image = db.Column(db.String(200))
    date = db.Column(db.String(50))


class Adminauthentication(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
