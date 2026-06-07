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

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


def create_default_admin():
    existing_admin = Adminauthentication.query.first()

    if existing_admin:
        return

    if not ADMIN_USERNAME or not ADMIN_PASSWORD:
        return

    admin = Adminauthentication(username=ADMIN_USERNAME, password=ADMIN_PASSWORD)

    db.session.add(admin)
    db.session.commit()


@admin_bp.route("/projects", methods=["POST"])
def projects():
    data = request.get_json()

    new_project = projectTable(
        title=data.get("title"),
        description=data.get("description"),
        url=data.get("url"),
    )

    if not new_project.title:
        return jsonify({"error": "Title is required"}), 400

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
    delete_entry = projectTable.query.get_or_404(id)
    db.session.delete(delete_entry)
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
    skills = skilltable.query.all()

    return jsonify([{"id": s.id, "skill": s.skill} for s in skills])


@admin_bp.route("/skill_delete/<int:id>", methods=["DELETE"])
def skill_delete(id):
    skill = skilltable.query.get_or_404(id)
    db.session.delete(skill)
    db.session.commit()

    return jsonify({"message": "Skill deleted successfully"})


@admin_bp.route("/add_qualification", methods=["POST"])
def add_qualification():
    data = request.get_json()

    new_qualification = QualificationTable(
        degree=data.get("degree"), college=data.get("college"), year=data.get("year")
    )

    if not new_qualification.degree:
        return jsonify({"error": "Degree is required"}), 400

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

    admin = Adminauthentication.query.filter_by(
        username=data.get("oldUsername")
    ).first()

    if not admin or admin.password != data.get("oldPassword"):
        return jsonify({"success": False, "message": "Invalid old credentials"})

    admin.username = data.get("newUsername")
    admin.password = data.get("newPassword")

    db.session.commit()

    return jsonify({"success": True, "message": "Credentials updated"})


@admin_bp.route("/Adminlogin", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = (data.get("username") or "").strip()
    password = (data.get("password") or "").strip()

    admin = Adminauthentication.query.filter_by(username=username).first()

    if admin and admin.password == password:
        return jsonify({"success": True, "message": "Login successful"})

    return jsonify({"success": False, "message": "Invalid credentials"})
