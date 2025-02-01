from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


openai.api_key = "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"

@app.route('/summrize', methods=['GET','POST'])
def summrize():
    if 'file' not in request.file:
        return jsonfiy({"error":"No File Uploader"}), 400
    uploaded_file = request.file['file']
    
    if uploaded_file.filename == '':
        return jsonify({"error":"No File Selected"}), 400
    
    file_content = uploaded_file.read().decode('utf-8')
    
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",  # Use "gpt-4" or "gpt-3.5-turbo"
        messages=[
            {"role": "system", "content": "You are an AI that summarizes text."},
            {"role": "user", "content": f"Summarize this text:\n\n{file_content}"}
        ],
        temperature=0.7,
        max_tokens=200
    )
    
    summary = response["choices"][0]["message"]["content"]
    return jsonify({"summary":summary})


if __name__ == '__main__':
    app.run(debug=True)