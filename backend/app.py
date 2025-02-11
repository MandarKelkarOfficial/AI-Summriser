
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
        print(" File content read successfully")
        prompt = f"""
        Please provide a concise and informative summary of the following text, focusing on the key points and main arguments.  Aim for a summary that is about 200-250 words long and captures the essence of the original document.  Maintain the original tone and avoid adding any personal opinions or interpretations.  If the text is code, summarize the functionality and purpose of the code.

        ```
        {file_content}
        ```
        """
        
        # Initialize and generate summary
        response = model.generate_content(prompt)
        
        # Get the summary directly from the response
        summary = response.text  # Fixed: no parentheses
        print(" Summary genrated successfully")
        
        # Check if the summary is empty or None
        if not summary:
            return jsonify({"error": "No summary generated"}), 500

        return jsonify({"summary": summary})

    except Exception as e:
        print(f" Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
