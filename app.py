from flask import Flask, send_from_directory, jsonify
import json
from pathlib import Path

app = Flask(__name__, static_folder='frontend', static_url_path='')

# Load content data
DATA_FILE = Path(__file__).parent / "data" / "content.json"

def load_content():
    with DATA_FILE.open("r", encoding="utf-8") as handle:
        return json.load(handle)

# Serve frontend files
@app.route('/')
def index():
    return send_from_directory('frontend/pages', 'index.html')

@app.route('/pages/<path:filename>')
def pages(filename):
    return send_from_directory('frontend/pages', filename)

@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory('frontend/assets', filename)

# API endpoints
@app.route('/api/home')
def api_home():
    content = load_content()
    return jsonify(content.get("home", {}))

@app.route('/api/learning')
def api_learning():
    content = load_content()
    return jsonify(content.get("learning", {}))

@app.route('/api/quiz')
def api_quiz():
    content = load_content()
    return jsonify(content.get("quiz", {}))

@app.route('/api/contracts')
def api_contracts():
    content = load_content()
    return jsonify(content.get("contracts", {}))

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8000)
