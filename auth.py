from flask_restx import Resource, Namespace, fields
from models import User
import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from flask import Flask, request, jsonify, make_response

auth_ns = Namespace("auth", description="A namespace for our Authentication")

email_regex = re.compile(r"[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(validate=lambda s: bool(email_regex.match(s))),
        "password": fields.String(),
    },
)

login_model = auth_ns.model(
    "Login", {"username_or_email": fields.String(), "password": fields.String()}
)


@auth_ns.route("/signup")
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        try:
            data = request.get_json()

            username = data.get("username")

            db_user = User.query.filter_by(username=username).first()

            if db_user:
                return jsonify(
                    {"message": f"User with username {username} already exists"}
                )

            new_user = User(
                username=data.get("username"),
                email=data.get("email"),
                password=generate_password_hash(data.get("password")),
            )

            new_user.save()

            return make_response(jsonify({"message": "User created successfully"}), 201)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)


@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        try:
            data = request.get_json()

            username_or_email = data.get("username_or_email")
            password = data.get("password")

            # Check if the input is an email
            is_email = "@" in username_or_email

            if is_email:
                # If it's an email, find the user by email
                db_user = User.query.filter_by(email=username_or_email).first()
            else:
                # If it's not an email, find the user by username
                db_user = User.query.filter_by(username=username_or_email).first()

            if not db_user:
                return make_response(jsonify({"message": "User not found"}), 404)

            if db_user and check_password_hash(db_user.password, password):
                access_token = create_access_token(identity=db_user.username)
                refresh_token = create_refresh_token(identity=db_user.username)

                user_dict = db_user.to_dict()

                return jsonify(
                    {
                        "user": user_dict,
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                    }
                )
            else:
                return make_response(
                    jsonify({"message": "Invalid username or password"}), 401
                )
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)


@auth_ns.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        try:
            current_user = get_jwt_identity()
            db_user = User.query.filter_by(username=current_user).first()

            if not db_user:
                return make_response(jsonify({"message": "User not found"}), 404)

            user_dict = db_user.to_dict()
            new_access_token = create_access_token(identity=current_user)
            new_refresh_token = create_refresh_token(identity=current_user)

            return jsonify(
                {
                    "user": user_dict,
                    "access_token": new_access_token,
                    "refresh_token": new_refresh_token,
                }
            )
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)
