import requests
import os
from dotenv import load_dotenv
load_dotenv()

CARTESIA_API_KEY = os.environ.get("CARTESIA_API")

url = "https://api.cartesia.ai/tts/bytes"

def texttospeech(text):
    payload = {
        "model_id": "sonic-2",
        "transcript": text,
        "voice": {
            "mode": "id",
            "id": "bf0a246a-8642-498a-9950-80c35e9276b5"
        },
        "output_format": {
            "container": "mp3",
            "bit_rate": 128000,
            "sample_rate": 44100
        },
        "language": "en"
    }
    headers = {
        "Cartesia-Version": "2024-11-13",
        "X-API-Key": CARTESIA_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        with open("output.mp3", "wb") as f:
            f.write(response.content)
        print("MP3 file saved as output.mp3")
    else:
        print(f"Error: {response.status_code}, {response.text}")

    return response.content

# if response.status_code == 200:
#     audio_bytes = io.BytesIO(response.content)  # Store in memory
#     audio = AudioSegment.from_file(audio_bytes, format="mp3")  # Load as audio
#     play(audio)  # Play immediately
# else:
#     print(f"Error: {response.status_code}, {response.text}")