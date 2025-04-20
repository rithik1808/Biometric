import cv2
import numpy as np

def preprocess_fingerprint(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    _, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)
    return binary

def extract_features(image):
    features = cv2.findNonZero(image)
    if features is not None:
        return features.reshape(-1, 2)
    return np.array([])

def compare_fingerprints(image1_path, image2_path):
    img1 = preprocess_fingerprint(image1_path)
    img2 = preprocess_fingerprint(image2_path)

    features1 = extract_features(img1)
    features2 = extract_features(img2)

    if features1.size == 0 or features2.size == 0:
        return 0.0

    min_len = min(len(features1), len(features2))
    matches = np.sum(np.all(features1[:min_len] == features2[:min_len], axis=1))

    return float(matches) / min_len
