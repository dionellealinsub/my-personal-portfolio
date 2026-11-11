
from flask import Flask, render_template

# Initialize Flask application
app = Flask(__name__)


# Homepage route
@app.route("/")
def home():
    return render_template("index.html")


# Run the application
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
