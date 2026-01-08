import os
import uuid
import soundfile as sf

from kokoro_onnx import Kokoro
from misaki import espeak
from misaki.espeak import EspeakG2P

# -------------------------
# Paths
# -------------------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_ROOT = os.path.join(BASE_DIR, "models")
AUDIO_DIR = os.path.join(BASE_DIR, "audio")

os.makedirs(AUDIO_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_ROOT, "kokoro-v1.0.onnx")
VOICES_PATH = os.path.join(MODEL_ROOT, "voices-v1.0.bin")

# -------------------------
# Load models once
# -------------------------

kokoro = Kokoro(MODEL_PATH, VOICES_PATH)

# espeak fallback (required by Misaki)
fallback = espeak.EspeakFallback(british=False)

# -------------------------
# G2P cache (load once)
# -------------------------

G2P_MAP = {
    "hi": EspeakG2P(language="hi"),
    "fr": EspeakG2P(language="fr-fr"),
    "it": EspeakG2P(language="it"),
    "es": EspeakG2P(language="es"),
    "pt": EspeakG2P(language="pt-br"),
}

# -------------------------
# Synthesize
# -------------------------

def synthesize(
    text: str,
    language: str = "en",
    voice: str = "hf_alpha",
):
    filename = f"audio_{uuid.uuid4().hex}.wav"
    path = os.path.join(AUDIO_DIR, filename)

    g2p = G2P_MAP.get(language)

    # 🔹 Phoneme-based languages
    if g2p:
        phonemes, _ = g2p(text)
        audio, sr = kokoro.create(
            phonemes,
            voice=voice,
            is_phonemes=True,
        )

    # 🔹 English (text mode)
    else:
        audio, sr = kokoro.create(
            text,
            voice=voice,
        )

    sf.write(path, audio, sr)
    return filename
