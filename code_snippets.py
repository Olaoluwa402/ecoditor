from flask_restx import Namespace, Resource, fields
from models import EditorCode
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, make_response
import requests
from enum import Enum

ecode_ns = Namespace("EditorCode", description="A namespace for EditorCode")


class LanguageEnum(Enum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"
    JAVA = "java"


ecode_model = ecode_ns.model(
    "EditorCode",
    {
        "title": fields.String(),
        "code": fields.String(),
        "language": fields.String(
            enum=[lang.value for lang in LanguageEnum],
            description="Programming Language",
        ),
        "description": fields.String(),
    },
)


@ecode_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@ecode_ns.route("/codes")
class RecipesResource(Resource):
    @ecode_ns.marshal_list_with(ecode_model)
    def get(self):
        """Get all codes"""
        try:
            codes = EditorCode.query.all()
            return codes
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @ecode_ns.marshal_with(ecode_model)
    @ecode_ns.expect(ecode_model)
    # @jwt_required()
    def post(self):
        """Create a new ecode"""
        try:
            # Get the currently logged-in user's identity
            current_user_id = get_jwt_identity()

            data = request.get_json()

            code_snippet = execute_user_code(data.get("code"), data.get("language"))

            if "error" in code_snippet:
                print(f"Error executing code: {code_snippet['error']}")
                return jsonify({"error": code_snippet["error"]}), 400
            else:
                print(f"Execution result: {code_snippet['result']}")

                new_code = EditorCode(
                    title=data.get("title"),
                    description=data.get("description"),
                    code=code_snippet,
                    language=data.get("language"),
                    user_id=current_user_id,
                )

                new_code.save()

                return new_code, 201
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)


@ecode_ns.route("/codes/<int:id>")
class RecipeResource(Resource):
    @ecode_ns.marshal_with(ecode_model)
    def get(self, id):
        """Get a code by id"""
        try:
            code = EditorCode.query.get_or_404(id)
            return code
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @ecode_ns.marshal_with(ecode_model)
    @jwt_required()
    def put(self, id):
        """Update an ecode by id"""
        try:
            code_to_update = EditorCode.query.get_or_404(id)
            data = request.get_json()
            code_to_update.update(
                data.get("title"),
                data.get("description"),
                data.get("code"),
                data.get("language"),
            )
            return code_to_update
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @ecode_ns.marshal_with(ecode_model)
    @jwt_required()
    def delete(self, id):
        """Delete a code by id"""
        try:
            code_to_delete = EditorCode.query.get_or_404(id)
            code_to_delete.delete()
            return code_to_delete
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)


def execute_user_code_repls(code, language="python"):
    try:
        # Specify the language in the API request
        url = f"https://replit.com/api/v0/repls/lang/{language}"
        payload = {"code": code}
        response = requests.post(url, json=payload)

        if response.status_code == 200:
            return response.json()
        else:
            return {
                "error": f"Failed to execute code. Status code: {response.status_code}"
            }
    except Exception as e:
        return {"error": str(e)}


def execute_user_code(code, language):
    try:
        print(code, language, "code and language")
        if language == "python":
            exec_result = {}
            exec(code, {}, exec_result)
            return {"result": exec_result}
        else:
            return {"error": "Unsupported language"}
    except Exception as e:
        return {"error": str(e)}
