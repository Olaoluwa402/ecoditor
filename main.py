from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import EditorCode, User
from exts import db
from flask_migrate import Migrate
from code_snippets import ecode_ns
from auth import auth_ns


def create_app(config):
    app = Flask(__name__, static_url_path="/", static_folder="./client/dist")
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc="/docs")

    api.add_namespace(ecode_ns)
    api.add_namespace(auth_ns)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file("index.html")

    # model (serializer)
    @app.shell_context_processor
    def make_shell_context():
        return {"db": db, "EditorCode": EditorCode, "User": User}

    return app
