from apps import app
from routes import routes

if __name__ == '__main__':
    app.run(host="192.168.0.4", port=5000, debug=True)
