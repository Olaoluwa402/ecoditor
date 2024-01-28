from decouple import config
import os
from datetime import timedelta

from dotenv import load_dotenv


load_dotenv()

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

print(os.getenv("DATABASE_URI"), "os.getenv")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "secret")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "code_dev.db")
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///code_dev.db")
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "code_prod.db")
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///prod.db")
    DEBUG = os.getenv("DEBUG", False)
    SQLALCHEMY_ECHO = os.getenv("ECHO", False)
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "code_test.db")
    SQLALCHEMY_ECHO = False
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = (
        False  # Disable Flask-Migrate's modification tracking
    )
