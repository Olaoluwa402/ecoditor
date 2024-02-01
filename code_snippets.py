from flask_restx import Namespace, Resource, fields
from models import EditorCode
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, make_response
import requests
from enum import Enum
import subprocess
import sys
import os
 
ecode_ns = Namespace("EditorCode", description="A namespace for EditorCode")

code_model = ecode_ns.model(
    "EditorCode", {"code": fields.String(), "language": fields.String()}
)


class LanguageEnum(Enum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"
    JAVA = "java"


@ecode_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@ecode_ns.route("/codes")
class RecipesResource(Resource):
    @ecode_ns.expect(code_model)
    def post(self):
        """Compile code"""
        try:
            data = request.get_json()

            print(data.get("code"), data.get("language"), "data")

            code_snippet = execute_user_code(data.get("code"), data.get("language"))
            print(code_snippet, "code_snippet")

            if "error" in code_snippet:
                print(f"Error executing code: {code_snippet['error']}")
                return {"error": code_snippet["error"]}, 400
            else:
                print(f"Execution result: {code_snippet['result']}")
                # Extract relevant information and return as JSON
                result_data = {"result": code_snippet["result"]}
                return result_data
        except Exception as e:
            print(f"Error executing code: {str(e)}")
            # Handle other exceptions and return as JSON
            return {"error": str(e)}, 500


def execute_user_code(code, language):
    try:
        if language == "python":
            result = subprocess.run(
                ["python", "-c", code], text=True, capture_output=True, check=True
            )
            return {"result": result.stdout}
        elif language == "typescript":
            # Get the absolute path to the directory of the Python script
            script_dir = os.path.dirname(os.path.abspath(__file__))

            # Create an absolute path for the temporary TypeScript file
            temp_ts_file_path = os.path.join(script_dir, "temp_typescript_code.ts")

            # Write the TypeScript code to the temporary file
            with open(temp_ts_file_path, "w") as ts_file:
                ts_file.write(code)

            ts_node_path = get_ts_node_path()
            if not ts_node_path.lower().endswith(".cmd"):
                ts_node_path += ".cmd"

            print("ts_node_path:", ts_node_path)
            print("temp_ts_file_path:", temp_ts_file_path)
            result = subprocess.run(
                [ts_node_path, temp_ts_file_path],
                text=True,
                capture_output=True,
                check=True,
            )
            print(result, "rsulttttt")

            return {"result": result.stdout}
        else:
            return {"error": "Unsupported language"}
        
    except subprocess.CalledProcessError as e:
        # Handle subprocess errors more gracefully
        return {"error": str(e)}
    except Exception as e:
        # Handle other exceptions
        return {"error": str(e)}


def get_ts_node_path():
    try:
        if sys.platform.startswith("win"):
            result = subprocess.run(
                ["where", "ts-node.cmd"], text=True, capture_output=True, check=True
            )
            ts_node_path = result.stdout.strip()
            if not ts_node_path:
                result = subprocess.run(
                    ["where", "ts-node"], text=True, capture_output=True, check=True
                )
                ts_node_path = result.stdout.strip()
        else:
            result = subprocess.run(
                ["which", "ts-node"], text=True, capture_output=True, check=True
            )
            ts_node_path = result.stdout.strip()

        # Return the path to ts-node or raise an exception if not found
        if not ts_node_path:
            raise Exception(
                "ts-node not found. Make sure it's installed and in your PATH."
            )

        return ts_node_path
    except subprocess.CalledProcessError:
        raise Exception("ts-node not found. Make sure it's installed and in your PATH.")
