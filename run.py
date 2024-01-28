from main import create_app
from exts import db
from config import DevConfig, ProdConfig

app = create_app(DevConfig)

with app.app_context():
    db.create_all()

# Run with
if __name__ == "__main__":
    # Run the app on port 5001
    app.run(port=5001)
