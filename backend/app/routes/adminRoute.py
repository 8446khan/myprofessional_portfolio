from app import db
from app.models.adminmodel import (
    projectTable,
    skilltable,
    QualificationTable,
)

from flask import Blueprint, request, jsonify

# Blueprint
admin_bp = Blueprint("admin_bp", __name__)

# ==============================
# PROJECT ROUTES
# ==============================


@admin_bp.route("/projects", methods=["POST"])
def projects():

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    url = data.get("url")

    if not title:
        return jsonify({"error": "Title is required"}), 400

    new_project = projectTable(
        title=title,
        description=description,
        url=url,
    )

    db.session.add(new_project)
    db.session.commit()

    return jsonify({"message": "Project saved successfully"})


@admin_bp.route("/viewprojects", methods=["GET"])
def viewprojects():

    projectcards = projectTable.query.all()

    result = []

    for p in projectcards:
        result.append(
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "url": p.url,
            }
        )

    return jsonify(result)


@admin_bp.route("/projects_delete/<int:id>", methods=["DELETE"])
def projects_delete(id):

    delete_entries = projectTable.query.get_or_404(id)

    db.session.delete(delete_entries)
    db.session.commit()

    return jsonify({"message": "Project deleted successfully"})


# ==============================
# SKILL ROUTES
# ==============================


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

    result = []

    for s in get_skill:
        result.append(
            {
                "id": s.id,
                "skill": s.skill,
            }
        )

    return jsonify(result)


@admin_bp.route("/skill_delete/<int:id>", methods=["DELETE"])
def skill_delete(id):

    skill_drop = skilltable.query.get_or_404(id)

    db.session.delete(skill_drop)
    db.session.commit()

    return jsonify({"message": "Skill deleted successfully"})


# ==============================
# QUALIFICATION ROUTES
# ==============================


@admin_bp.route("/add_qualification", methods=["POST"])
def add_qualification():

    data = request.json

    degree = data.get("degree")
    college = data.get("college")
    year = data.get("year")

    if not degree:
        return jsonify({"error": "Degree is required"}), 400

    new_qualification = QualificationTable(
        degree=degree,
        college=college,
        year=year,
    )

    db.session.add(new_qualification)
    db.session.commit()

    return jsonify({"message": "Qualification added successfully"})


@admin_bp.route("/get_qualification", methods=["GET"])
def get_qualification():

    q = QualificationTable.query.all()

    return jsonify(
        [
            {
                "id": i.id,
                "degree": i.degree,
                "college": i.college,
                "year": i.year,
            }
            for i in q
        ]
    )


@admin_bp.route("/delete_qualification/<int:id>", methods=["DELETE"])
def delete_qualification(id):

    qualification = QualificationTable.query.get_or_404(id)

    db.session.delete(qualification)
    db.session.commit()

    return jsonify({"message": "Qualification deleted successfully"})
