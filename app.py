from flask import Flask, request, jsonify
from utils import preprocess_fingerprint, extract_features, generate_key, encrypt_data, decrypt_data
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/encrypt", methods=["POST"])
def encrypt():
    if 'file' not in request.files or 'text' not in request.form:
        return jsonify({"error": "Missing file or text"}), 400

    file = request.files['file']
    plaintext = request.form['text']

    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    image = preprocess_fingerprint(path)
    features = extract_features(image)
    key = generate_key(features)

    try:
        encrypted = encrypt_data(plaintext, key)
        return jsonify({"encrypted_data": encrypted.decode(), "key": key})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/decrypt", methods=["POST"])
def decrypt():
    try:
        encrypted_data = request.json['encrypted_data']
        key = request.json['key']
        decrypted = decrypt_data(encrypted_data.encode(), key)
        return jsonify({"decrypted_data": decrypted})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
