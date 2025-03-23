from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google.generativeai import GenerativeModel

from dotenv import load_dotenv
load_dotenv()

def generate_text_with_gemini(prompt):
    """
    Placeholder function to simulate generating text with Gemini.

    Args:
        prompt: The prompt to use for text generation (string).

    Returns:
        A generated text based on the prompt (string).
    """
    

    # Initialize the model
    model = GenerativeModel('gemini-2.0-flash')

    # Generate content
    response = model.generate_content(prompt)

    return response.text


def cosine_similarity_texts(text1, text2):
    """
    Calculates the cosine similarity between two texts.

    Args:
        text1: The first text (string).
        text2: The second text (string).

    Returns:
        The cosine similarity between the two texts (float).
    """
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([text1, text2])
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
    return similarity


def check_plague(text):
    """
    Checks if the input text is plagiarized based on cosine similarity with
    a generated text.

    Args:
        text: The text to check for plagiarism (string).

    Returns:
        True if the text is plagiarized (above the threshold), False otherwise.
    """
    prompt = "Rewrite this with same length " + text
    generated_text = generate_text_with_gemini(prompt)

    similarity = cosine_similarity_texts(text, generated_text)

    return similarity
