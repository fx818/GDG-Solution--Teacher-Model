from google.generativeai import GenerativeModel

from dotenv import load_dotenv
load_dotenv()

def generate_qna_with_gemini(prompt):

    # Initialize the model
    model = GenerativeModel('gemini-2.0-flash')

    # Generate content
    response = model.generate_content(prompt)

    return response.text