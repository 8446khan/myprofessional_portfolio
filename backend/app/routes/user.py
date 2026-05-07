from flask import Blueprint, request, jsonify
from app import db
from app.models.userModel import userInfo

# user_bp = Blueprint("user_bp", __name__)
user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/userformdata", methods=["POST"])
def userformdata():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    new_usermodel = userInfo(name=name, email=email, message=message)
    db.session.add(new_usermodel)
    db.session.commit()

    return jsonify({"message": "data save successfully"})


@user_bp.route("/Viewuserinfo", methods=["GET"])
def Viewuserinfo():
    user = userInfo.query.all()

    result = []
    for u in user:
        result.append(
            {"id": u.id, "name": u.name, "email": u.email, "message": u.message}
        )

    return jsonify(result)
