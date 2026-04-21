const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  buildAnswerRecord,
  buildQuizResults,
  createInitialQuizState,
  getProgressText,
  getProgressValue,
  getResultBand
} = require("../frontend/assets/js/app.js");

const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "content.json"), "utf8")
);

test("quiz contract includes required screen and scoring fields", () => {
  const { quiz } = content;

  assert.ok(quiz.title);
  assert.ok(quiz.summary);
  assert.ok(quiz.intro);
  assert.equal(typeof quiz.passingScore, "number");
  assert.ok(Array.isArray(quiz.resultBands));
  assert.ok(Array.isArray(quiz.questions));
  assert.equal(quiz.questions.length, 5);

  for (const question of quiz.questions) {
    assert.ok(question.id);
    assert.ok(question.prompt);
    assert.ok(question.context);
    assert.ok(Array.isArray(question.options));
    assert.ok(question.options.length >= 2);
    assert.equal(typeof question.answerIndex, "number");
    assert.ok(question.correctFeedback);
    assert.ok(question.incorrectFeedback);
    assert.ok(question.insight);
  }
});

test("initial quiz state starts on the intro screen", () => {
  assert.deepEqual(createInitialQuizState(), {
    screen: "intro",
    currentIndex: 0,
    score: 0,
    answers: []
  });
});

test("answer records preserve correctness and feedback details", () => {
  const question = content.quiz.questions[0];
  const correctRecord = buildAnswerRecord(question, question.answerIndex);
  const wrongRecord = buildAnswerRecord(question, 0);

  assert.equal(correctRecord.isCorrect, true);
  assert.equal(correctRecord.correctOption, question.options[question.answerIndex]);
  assert.equal(correctRecord.feedback, question.correctFeedback);

  assert.equal(wrongRecord.isCorrect, false);
  assert.equal(wrongRecord.feedback, question.incorrectFeedback);
  assert.equal(wrongRecord.correctOption, question.options[question.answerIndex]);
});

test("progress helpers produce human-readable progress and bar width", () => {
  assert.equal(getProgressText(0, 5), "Question 1 of 5");
  assert.equal(getProgressText(4, 5), "Question 5 of 5");
  assert.equal(getProgressValue(1, 5), 40);
});

test("result bands are selected by score thresholds", () => {
  assert.equal(getResultBand(content.quiz.resultBands, 5).title, "Genre guide");
  assert.equal(getResultBand(content.quiz.resultBands, 3).title, "On the right track");
  assert.equal(getResultBand(content.quiz.resultBands, 1).title, "Keep exploring");
});

test("quiz results compute score totals and pass state", () => {
  const answers = [
    buildAnswerRecord(content.quiz.questions[0], content.quiz.questions[0].answerIndex),
    buildAnswerRecord(content.quiz.questions[1], content.quiz.questions[1].answerIndex),
    buildAnswerRecord(content.quiz.questions[2], 0),
    buildAnswerRecord(content.quiz.questions[3], content.quiz.questions[3].answerIndex),
    buildAnswerRecord(content.quiz.questions[4], content.quiz.questions[4].answerIndex)
  ];

  const results = buildQuizResults(content.quiz, answers);

  assert.equal(results.correct, 4);
  assert.equal(results.incorrect, 1);
  assert.equal(results.total, 5);
  assert.equal(results.passed, true);
  assert.equal(results.band.title, "On the right track");
});
