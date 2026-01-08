from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os

from app.tts import synthesize
from app.tts import AUDIO_DIR

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

app = FastAPI(title="Kokoro Multilingual TTS")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev
        "http://127.0.0.1:5173",
        "http://localhost",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str
    language: str = "en"   # "en" | "hi"
    voice: str = "hf_alpha"

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/tts")
def tts(req: TTSRequest):
    filename = synthesize(
        text=req.text,
        language=req.language,
        voice=req.voice
    )
    return {"file": filename}

@app.get("/audio/{filename}")
def audio(filename: str):
    path = os.path.join(AUDIO_DIR, filename)
    return FileResponse(path, media_type="audio/wav")


@app.on_event("shutdown")
def shutdown_event():
    print("Backend shutting down cleanly...")
