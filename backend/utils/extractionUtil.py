import docx
import PyPDF2
import io
from langchain_community.document_loaders import WebBaseLoader

ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}


def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_doc(file_storage):
    """Extract text from a .doc or .docx file."""
    doc = docx.Document(file_storage)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

def extract_text_from_pdf(file_storage):
    """Extract text from a .pdf file."""
    pdf_reader = PyPDF2.PdfReader(file_storage)
    full_text = ""
    for page in pdf_reader.pages:
        full_text += page.extract_text()
    return full_text

def extract_text_from_url(url):
    """Extract text from a URL."""
    loader = WebBaseLoader(url)
    data = loader.load()
    result = data[0].page_content
    return result
