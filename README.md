## Afrobeat vs Amapiano by Ear

Small multi-page prototype for comparing Afrobeat and Amapiano through a homepage, learning path, and quiz flow.

## Run locally

```bash
python server.py
```

Open `http://127.0.0.1:8000/pages/index.html`.

## Quiz test notes

Eldad's quiz delivery covers:

- intro screen with quiz expectations and start action
- active question screen with progress and score tracking
- answer feedback screen after every selection
- results screen with score tier, restart, and learning return path
- answer review screen with selected answer, correct answer, and insight

Basic feature checks completed:

- verified `content.json` quiz contract includes the fields used by the UI
- verified score counting for correct and incorrect answers
- verified pass/fail and result-band thresholds
- verified restart returns the quiz flow to the first question state
- verified review data preserves selected answers and correct answers

## Automated checks

```bash
node --test tests/quiz.test.js
```
