#!/usr/bin/env python3
"""
Pindai file proyek (HTML, CSS, JS, dan lainnya) untuk menemukan URL ImageKit.
Output: imagekit_urls.json di folder yang sama dengan file Python.

Penggunaan:
    python scan_imagekit.py
    python scan_imagekit.py "D:/folder/proyek"
"""

import argparse
import html
import json
import os
import re
from pathlib import Path
from urllib.parse import urlsplit

EXTENSIONS = {
    ".html", ".htm", ".css", ".js", ".mjs", ".cjs",
    ".jsx", ".ts", ".tsx", ".vue", ".php", ".json",
    ".svg", ".xml", ".md",
}
SKIP_DIRS = {
    ".git", "node_modules", "vendor", ".next", "dist", "build",
    "__pycache__", ".venv", "venv"
}

URL_PATTERN = re.compile(r"""(?i)(?:https?:)?//[^\s"'<>`\\)\]}]+""")
IMAGEKIT_HOST_PATTERN = re.compile(r"(?i)(?:^|\.)imagekit\.io$")

# Penanda URL dinamis (template string / templating) yang tidak lengkap.
TEMPLATE_MARKERS = ("${", "{{", "{%", "<?", "%7B%7B")


def clean_url(raw_url: str) -> str:
    # Ubah entitas HTML (&amp; &quot; dll.) menjadi karakter aslinya.
    url = html.unescape(raw_url.strip())
    url = url.rstrip(".,;:!?")
    if url.startswith("//"):
        url = "https:" + url
    return url


def is_dynamic_url(url: str) -> bool:
    return any(marker in url for marker in TEMPLATE_MARKERS)


def is_imagekit_url(url: str) -> bool:
    try:
        host = (urlsplit(url).hostname or "").lower()
        return bool(IMAGEKIT_HOST_PATTERN.search(host))
    except ValueError:
        return False


def iter_source_files(root: Path):
    for current_dir, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            path = Path(current_dir) / name
            if path.suffix.lower() in EXTENSIONS:
                yield path


def main():
    parser = argparse.ArgumentParser(
        description="Temukan URL ImageKit dalam file proyek."
    )
    parser.add_argument(
        "folder", nargs="?", default=".",
        help="Folder proyek yang dipindai (default: folder saat ini)"
    )
    args = parser.parse_args()

    root = Path(args.folder).expanduser().resolve()
    if not root.is_dir():
        parser.error(f"Folder tidak ditemukan: {root}")

    # Output selalu di folder yang sama dengan file .py ini.
    output_path = Path(__file__).resolve().parent / "imagekit_urls.json"

    found_urls = set()
    scanned_files = 0
    skipped_dynamic = 0

    for file_path in iter_source_files(root):
        # .json ikut dipindai, jadi file output harus dilewati.
        if file_path.resolve() == output_path:
            continue
        try:
            content = file_path.read_text(encoding="utf-8", errors="replace")
        except OSError as exc:
            print(f"[PERINGATAN] Tidak bisa membaca {file_path}: {exc}")
            continue

        scanned_files += 1
        for match in URL_PATTERN.finditer(content):
            url = clean_url(match.group(0))
            if not is_imagekit_url(url):
                continue
            if is_dynamic_url(url):
                skipped_dynamic += 1
                continue
            found_urls.add(url)

    result = sorted(found_urls)
    output_path.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8"
    )

    print(f"File sumber diperiksa: {scanned_files}")
    print(f"URL ImageKit unik: {len(result)}")
    if skipped_dynamic:
        print(f"URL dinamis dilewati: {skipped_dynamic}")
    print(f"Output: {output_path}")


if __name__ == "__main__":
    main()