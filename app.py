from flask import Flask, request, jsonify
import os
from utils import compare_fingerprints

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/compare', methods=['POST'])
def compare():
    if 'image1' not in request.files or 'image2' not in request.files:
        return jsonify({'error': 'Please upload image1 and image2'}), 400

    image1 = request.files['image1']
    image2 = request.files['image2']

    path1 = os.path.join(UPLOAD_FOLDER, image1.filename)
    path2 = os.path.join(UPLOAD_FOLDER, image2.filename)

    image1.save(path1)
    image2.save(path2)

    score = compare_fingerprints(path1, path2)
    return jsonify({'similarity_score': round(score, 4)})

if __name__ == '__main__':
    app.run(debug=True)
