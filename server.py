from __future__ import annotations

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).parent
FRONTEND_DIR = ROOT / "frontend"
DATA_FILE = ROOT / "data" / "content.json"


def load_content() -> dict:
    with DATA_FILE.open("r", encoding="utf-8") as handle:
        return json.load(handle)


class PrototypeHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(FRONTEND_DIR), **kwargs)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self._handle_api(parsed.path)
            return
        super().do_GET()

    def _handle_api(self, path: str) -> None:
        content = load_content()
        routes = {
            "/api/home": content["home"],
            "/api/learning": content["learning"],
            "/api/quiz": content["quiz"],
            "/api/contracts": content["contracts"],
        }
        payload = routes.get(path)

        if payload is None:
            self.send_error(HTTPStatus.NOT_FOUND, "Endpoint not found")
            return

        encoded = json.dumps(payload).encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


def run() -> None:
    host = "127.0.0.1"
    port = 8000
    server = ThreadingHTTPServer((host, port), PrototypeHandler)
    print(f"Serving prototype at http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    run()
