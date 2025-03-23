from google.generativeai import GenerativeModel

from dotenv import load_dotenv
load_dotenv()

def format_qa_response(response_text):
    """
    Formats a question-and-answer response string into a more readable format.

    Args:
        response_text: The string containing the questions and answers.

    Returns:
        A formatted string with questions and answers clearly separated.
    """

    questions = response_text.split("**Question ")[1:]  # Split into individual questions
    res = []
    for question_str in questions:
        formatted_output = ""
        parts = question_str.split("\n")
        question_number = parts[0].split(":")[0]
        question_text = question_str.split('?')[0][6:] + "?"
        options = []
        answer = ""

        for part in parts[2:]:
            if part.startswith(("a)", "b)", "c)", "d)")):
                options.append(part)
            elif part.startswith("**"):
                answer = part.replace("**", "")

        # formatted_output += f"**{question_number}:** {question_text}\n"
        # for option in options:
            # formatted_output += f"{option}\n"
        # formatted_output += f"**Answer:** {answer}\n\n"
        res.append({f"question {question_number}": question_text, "options": options, "answer": answer})

    return res


def generate_mcq_data(paragraph, n):
    """
    Generates n multiple-choice questions from a given paragraph.

    Args:
        paragraph (str): The text paragraph to generate questions from.
        n (int): The number of questions to generate.

    Returns:
        list: A list of dictionaries, where each dictionary represents a question
              with its options and correct answer.
    """
    
    prompt = f"Generate {n} multiple-choice questions along with 4 options and 1 correct option based on the following paragraph: {paragraph}"
    
    # Initialize the model
    model = GenerativeModel('gemini-2.0-flash')

    # Generate content
    response = model.generate_content(prompt)
    result = format_qa_response(response.text)
    
    return result
