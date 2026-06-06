from app import db
from app.models.adminmodel import (
    projectTable,
    skilltable,
    QualificationTable,
    Adminauthentication,
)
from flask import Blueprint, request, jsonify
import os

admin_bp = Blueprint("admin_bp", __name__)

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")


def create_default_admin():

    admin = Adminauthentication.query.filter_by(username="admin").first()

    if not admin:

        admin = Adminauthentication(username="admin", password="admin123")
        db.session.add(admin)
        db.session.commit()


@admin_bp.route("/projects", methods=["POST"])
def projects():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    url = data.get("url")

    if not title:
        return jsonify({"error": "Title is required"}), 400

    new_project = projectTable(title=title, description=description, url=url)

    db.session.add(new_project)
    db.session.commit()

    return jsonify({"message": "Project saved successfully"})


@admin_bp.route("/viewprojects", methods=["GET"])
def viewprojects():
    projectcards = projectTable.query.all()

    return jsonify(
        [
            {"id": p.id, "title": p.title, "description": p.description, "url": p.url}
            for p in projectcards
        ]
    )


@admin_bp.route("/projects_delete/<int:id>", methods=["DELETE"])
def projects_delete(id):
    delete_entries = projectTable.query.get_or_404(id)
    db.session.delete(delete_entries)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"})


@admin_bp.route("/skill_add", methods=["POST"])
def skill_add():
    data = request.get_json()
    skill = data.get("skill")

    if not skill:
        return jsonify({"error": "Skill is required"}), 400

    new_skill = skilltable(skill=skill)
    db.session.add(new_skill)
    db.session.commit()

    return jsonify({"message": "Skill saved successfully"})


@admin_bp.route("/viewskills", methods=["GET"])
def viewskills():
    get_skill = skilltable.query.all()

    return jsonify([{"id": s.id, "skill": s.skill} for s in get_skill])


@admin_bp.route("/skill_delete/<int:id>", methods=["DELETE"])
def skill_delete(id):
    skill_drop = skilltable.query.get_or_404(id)
    db.session.delete(skill_drop)
    db.session.commit()
    return jsonify({"message": "Skill deleted successfully"})


@admin_bp.route("/add_qualification", methods=["POST"])
def add_qualification():
    data = request.get_json()

    degree = data.get("degree")
    college = data.get("college")
    year = data.get("year")

    if not degree:
        return jsonify({"error": "Degree is required"}), 400

    new_qualification = QualificationTable(degree=degree, college=college, year=year)

    db.session.add(new_qualification)
    db.session.commit()

    return jsonify({"message": "Qualification added successfully"})


@admin_bp.route("/get_qualification", methods=["GET"])
def get_qualification():
    q = QualificationTable.query.all()

    return jsonify(
        [
            {"id": i.id, "degree": i.degree, "college": i.college, "year": i.year}
            for i in q
        ]
    )


@admin_bp.route("/delete_qualification/<int:id>", methods=["DELETE"])
def delete_qualification(id):
    qualification = QualificationTable.query.get_or_404(id)
    db.session.delete(qualification)
    db.session.commit()
    return jsonify({"message": "Qualification deleted successfully"})


@admin_bp.route("/change-admin", methods=["POST"])
def change_admin():
    data = request.get_json()

    old_username = data.get("oldUsername")
    old_password = data.get("oldPassword")
    new_username = data.get("newUsername")
    new_password = data.get("newPassword")

    admin = Adminauthentication.query.filter_by(username=old_username).first()
    admins = Adminauthentication.query.all()

    for a in admins:
        print(a.username, a.password)

    if not admin:
        return jsonify({"success": False, "message": "Admin not found"})

    if admin.password != old_password:
        return jsonify({"success": False, "message": "Old credentials incorrect"})

    admin.username = new_username
    admin.password = new_password

    db.session.commit()

    return jsonify({"success": True, "message": "Credentials updated successfully"})


@admin_bp.route("/Adminlogin", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({"success": True, "message": "Login successful"})

    return jsonify({"success": False, "message": "Invalid credentials"})
