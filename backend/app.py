
# AIzaSyDxByW2GpWT0OKSLifZbiFatBZyG_8QfDE

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as palm  # Import the Gemini library

app = Flask(__name__)
CORS(app)

# Load API Key securely from environment variable
key = "AIzaSyDxByW2GpWT0OKSLifZbiFatBZyG_8QfDE"  # Replace this with your actual API key
if not key:
    raise ValueError("GOOGLE_API_KEY environment variable not set.")

# Configure the API
palm.configure(api_key=key)
model = palm.GenerativeModel("gemini-1.5-flash")

@app.route('/summarize', methods=['POST'])
def summarize():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']

    if uploaded_file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        file_content = uploaded_file.read().decode('utf-8', errors='ignore')
        print(file_content)
        print("✅ File content read successfully")
        
        # Initialize and generate summary
        response = model.generate_content(file_content)
        
        # Get the summary directly from the response
        summary = response.text  # Fixed: no parentheses
        print("✅ Summary genrated successfully")
        
        # Check if the summary is empty or None
        if not summary:
            return jsonify({"error": "No summary generated"}), 500

        return jsonify({"summary": summary})

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
