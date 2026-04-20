# Afrobeat vs Amapiano Prototype

This is a lightweight functional prototype for a Python + HTML/CSS/JS team workflow.

## Project structure

- `frontend/pages`: app pages
- `frontend/assets/css`: shared styles
- `frontend/assets/js`: shared client logic
- `data`: shared JSON content contracts
- `server.py`: local Python server and API endpoints

## Build flow

- Update page structure in `frontend/pages`
- Keep shared behavior in `frontend/assets/js/app.js`
- Keep reusable styling in `frontend/assets/css/styles.css`
- Use `data/content.json` as the shared source of truth for content and routes

## Run locally

```bash
python3 server.py
```

Then open `http://127.0.0.1:8000/pages/index.html`.
