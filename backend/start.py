import os
import sys

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PYTHON_DIR = os.path.join(BACKEND_DIR, "python")
SITE_PACKAGES = os.path.join(PYTHON_DIR, "Lib", "site-packages")

# ✅ ONLY INSERT, NEVER CLEAR
if SITE_PACKAGES not in sys.path:
    sys.path.insert(0, SITE_PACKAGES)

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

import uvicorn
from app.server import app

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        log_level="info",
    )
