from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

app = Flask(__name__)
CORS(app) # Allow Java to talk to us

# --- 1. THE TRAINING DATA (The Knowledge Base) ---
# In a real app, this would come from a massive CSV file.
data = [
    ("I have a severe headache and sensitivity to light", "Neurologist"),
    ("dizzy and blurred vision", "Neurologist"),
    ("unbearable migraine", "Neurologist"),
    ("chest pain and shortness of breath", "Cardiologist"),
    ("heart feels like it is beating too fast", "Cardiologist"),
    ("pressure in my chest", "Cardiologist"),
    ("dry cough and high fever", "General Physician"),
    ("sore throat and runny nose", "General Physician"),
    ("feeling very weak and shivering", "General Physician"),
    ("red rash on my arm", "Dermatologist"),
    ("itchy skin and dry patches", "Dermatologist"),
    ("acne breakouts on face", "Dermatologist"),
    ("stomach pain and vomiting", "Gastroenterologist"),
    ("acid reflux and burning sensation", "Gastroenterologist")
]

# Separate symptoms (X) and labels (y)
X_train = [x[0] for x in data]
y_train = [x[1] for x in data]

# --- 2. TRAIN THE MODEL (The Brain) ---
# Convert text to numbers (Vectorization)
vectorizer = CountVectorizer()
X_train_vectors = vectorizer.fit_transform(X_train)

# Train the Classifier
model = MultinomialNB()
model.fit(X_train_vectors, y_train)

print("🤖 AI Model Trained and Ready!")

# --- 3. THE API ENDPOINT ---
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptom_text = data.get('symptoms', '')

    if not symptom_text:
        return jsonify({"error": "No symptoms provided"}), 400

    # Transform input and predict
    input_vector = vectorizer.transform([symptom_text])
    prediction = model.predict(input_vector)[0]
    
    # Get confidence score (probability)
    probability = max(model.predict_proba(input_vector)[0]) * 100

    return jsonify({
        "specialist": prediction,
        "confidence": f"{probability:.2f}%"
    })

if __name__ == '__main__':
    app.run(port=5000)