import os
import sys


def resource_path(relative_path: str) -> str:
    """
    Resolve resource paths safely for both development and frozen (PyInstaller) builds.

    - In a bundled exe, uses the `_MEIPASS` temp directory provided by PyInstaller.
    - In development, resolves relative to the project root (parent of `utils/`).
    """
    base_path = getattr(
        sys,
        "_MEIPASS",  # type: ignore[attr-defined]
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    )
    return os.path.join(base_path, relative_path)


