from flask import Flask, request, jsonify, send_file, Response
from dotenv import load_dotenv
from utils.chatPdfUtil import *
from utils.chatUrlUtil import *
from utils.plaqueUtils import *
from utils.qnaUtils import *
from utils.mcqUtils import *
from utils.voiceUtil import *
from utils.extractionUtil import *
from flask_cors import CORS
import io

load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app)

# chat pdf api
@app.route('/query', methods=['POST'])
def query_pdf():
    try:
        # Check if a file was uploaded
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']
        query = request.form.get("query", "").strip()
       

        if not file or file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        if not query:
            return jsonify({"error": "Query cannot be empty"}), 400

        # Save the file temporarily
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        # Process the PDF and get the response
        
        astra_vector_index = utility_function(file_path)
        response = get_query_result(query, astra_vector_index)

        return jsonify({"response": response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# chat url api
@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()
        url = data.get("url", "").strip()

        if not question:
            return jsonify({"error": "Question cannot be empty"}), 400
        
        if not url:
            return jsonify({"error": "URL cannot be empty"}), 400

        answer = get_answer(question, url)

        return jsonify({"answer": answer})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Plaque Detection
@app.route("/check_plagiarism", methods=["POST"])
def check_plagiarism():
    """Placeholder for plagiarism check API endpoint."""
    data = request.get_json()
    text = data.get("text", "")
    score = check_plague(text)
    return jsonify({"plaque_score": score})


# Generating question and answers


@app.route("/generate_qa", methods=["POST"])
def generate_qa():
    """
    API endpoint to generate questions and answers from a paragraph.
    """
    data = request.get_json()
    paragraph = data.get("paragraph", "")
    n = data.get("n", 5)

    if not paragraph or not isinstance(n, int) or n <= 0:
        return jsonify({"error": "Invalid input: 'paragraph' (text) and 'n' (positive integer) are required."}), 400

    qa_pairs = []
    for i in range(n):
        prompt = f"Generate a question and answer based on the following paragraph: {paragraph}"
        try:
            qa_text = generate_qna_with_gemini(prompt)
            question_index = qa_text.find("Question:")
            answer_index = qa_text.find("Answer:")
            
            if question_index != -1 and answer_index != -1:
                question = qa_text[question_index + len("Question:"):answer_index].strip()
                answer = qa_text[answer_index + len("Answer:"):].strip()
            else:
                question = ""
                answer = qa_text.strip()
            
            qa_pairs.append({"question": question, "answer": answer})
        except Exception as e:
            return jsonify({"error": f"Error during QA generation: {e}"}), 500

    return jsonify(qa_pairs)


# Generate MCQ
@app.route("/generate_mcq", methods=["POST"])
def generate_mcq():
    """Generate multiple-choice questions based on a paragraph."""
    data = request.get_json()
    paragraph = data.get("paragraph")
    n = data.get("n")

    if not paragraph or not isinstance(n, int):
        return jsonify({"error": "Invalid request body"}), 400
    mcq_data = generate_mcq_data(paragraph, n)
    return jsonify(mcq_data)

@app.route("/texttovoice", methods=["POST"])
def voice_response():
    data = request.get_json()
    text = data.get("text")
    
    audio_data = texttospeech(text)  # Assuming this returns binary MP3 data
    
    # Convert to an in-memory file
    # audio_response = texttospeech(text)
    return Response(audio_data, mimetype="audio/mpeg")
    # return audio_response
    # audio_data = audio_response.content  # Extract the bytes from the response
    # audio_file = io.BytesIO(audio_data)
    # audio_file.seek(0)
    # return send_file(audio_file, mimetype="audio/mpeg", as_attachment=False)

# content extract

@app.route('/extract_content', methods=['POST'])
def extract_content():
    """API endpoint to extract text content from a file upload."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        try:
            file_extension = file.filename.rsplit('.', 1)[1].lower()
            if file_extension in ['doc', 'docx']:
               text = extract_text_from_doc(file)
            elif file_extension == 'pdf':
               text = extract_text_from_pdf(file)
            
            if text:
                return jsonify({'content': text})
            else:
                 return jsonify({'error': 'Could not read file'}), 500

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/extract_url_content', methods=['POST'])
def extract_content_url():
    """API endpoint to extract text content from a URL."""
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify({'error': 'URL cannot be empty'}), 400
    try:
        text = extract_text_from_url(url)
        if text:
            return jsonify({'content': text})
        else:
            return jsonify({'error': 'Could not read URL content'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
    
