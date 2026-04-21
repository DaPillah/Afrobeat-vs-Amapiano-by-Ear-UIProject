async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function createCard(title, description, href) {
  const card = document.createElement("a");
  card.className = "card";
  card.href = href;
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <span>Open</span>
  `;
  return card;
}

function renderHome(home, contracts) {
  document.getElementById("page-title").textContent = home.title;
  document.getElementById("page-tagline").textContent = home.tagline;

  const routeGrid = document.getElementById("route-grid");
  home.routes.forEach((route) => {
    routeGrid.appendChild(createCard(route.label, route.description, route.href));
  });

  const teamList = document.getElementById("team-list");
  home.team.forEach((member) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${member.name}</strong><span>${member.responsibility}</span>`;
    teamList.appendChild(item);
  });

  const contractList = document.getElementById("contract-list");
  contracts.sharedNotes.forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    contractList.appendChild(item);
  });
}

function renderLearning(learning) {
  document.getElementById("page-title").textContent = learning.title;
  document.getElementById("page-summary").textContent = learning.summary;

  const moduleList = document.getElementById("module-list");
  learning.modules.forEach((module) => {
    const article = document.createElement("article");
    article.className = "stack-item";
    article.innerHTML = `
      <div class="stack-meta">${module.status}</div>
      <h3>${module.title}</h3>
      <p>${module.description}</p>
    `;
    moduleList.appendChild(article);
  });
}

function getResultBand(resultBands, score) {
  return resultBands.find((band) => score >= band.minScore) ?? resultBands[resultBands.length - 1];
}

function createInitialQuizState() {
  return {
    screen: "intro",
    currentIndex: 0,
    score: 0,
    answers: []
  };
}

function buildAnswerRecord(question, selectedIndex) {
  const isCorrect = selectedIndex === question.answerIndex;
  return {
    questionId: question.id,
    prompt: question.prompt,
    selectedIndex,
    selectedOption: question.options[selectedIndex],
    correctIndex: question.answerIndex,
    correctOption: question.options[question.answerIndex],
    isCorrect,
    feedback: isCorrect ? question.correctFeedback : question.incorrectFeedback,
    insight: question.insight
  };
}

function getProgressText(currentIndex, total) {
  return `Question ${currentIndex + 1} of ${total}`;
}

function getProgressValue(currentIndex, total) {
  return ((currentIndex + 1) / total) * 100;
}

function getScoreBreakdown(answers) {
  const correct = answers.filter((answer) => answer.isCorrect).length;
  return {
    correct,
    incorrect: answers.length - correct
  };
}

function buildQuizResults(quiz, answers) {
  const breakdown = getScoreBreakdown(answers);
  const band = getResultBand(quiz.resultBands, breakdown.correct);

  return {
    ...breakdown,
    total: quiz.questions.length,
    passed: breakdown.correct >= quiz.passingScore,
    band
  };
}

function renderQuiz(quiz) {
  document.getElementById("page-title").textContent = quiz.title;
  document.getElementById("page-summary").textContent = quiz.summary;

  const quizRoot = document.getElementById("quiz-root");
  let state = createInitialQuizState();

  const finalizeScreen = (screenName) => {
    quizRoot.dataset.screen = screenName;
    quizRoot.focus();
  };

  const renderIntro = () => {
    const highlights = quiz.intro.highlights
      .map((highlight) => `<li>${highlight}</li>`)
      .join("");

    quizRoot.innerHTML = `
      <article class="stack-item quiz-card">
        <div class="stack-meta">${quiz.intro.eyebrow}</div>
        <h3>Ready to test your ear?</h3>
        <p>${quiz.intro.description}</p>
        <ul class="quiz-highlight-list">${highlights}</ul>
        <div class="quiz-actions">
          <button class="button-link button-link--accent" type="button" data-action="start-quiz">${quiz.intro.primaryActionLabel}</button>
          <a class="button-link" href="/pages/learning.html">${quiz.intro.secondaryActionLabel}</a>
        </div>
      </article>
    `;
    finalizeScreen("intro");

    quizRoot.querySelector("[data-action='start-quiz']").addEventListener("click", () => {
      state.screen = "question";
      renderCurrentScreen();
    });
  };

  const renderQuestion = () => {
    const question = quiz.questions[state.currentIndex];
    const options = question.options
      .map(
        (option, index) => `
          <button class="quiz-option" type="button" data-index="${index}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
          </button>
        `
      )
      .join("");

    quizRoot.innerHTML = `
      <article class="stack-item quiz-card">
        <div class="quiz-progress-header">
          <div class="stack-meta">${getProgressText(state.currentIndex, quiz.questions.length)}</div>
          <div class="quiz-progress-copy">Score: ${state.score}</div>
        </div>
        <div class="quiz-progress-track" aria-hidden="true">
          <div class="quiz-progress-bar" style="width: ${getProgressValue(state.currentIndex, quiz.questions.length)}%"></div>
        </div>
        <p class="quiz-context">${question.context}</p>
        <h3>${question.prompt}</h3>
        <div class="quiz-options">${options}</div>
      </article>
    `;
    finalizeScreen("question");

    quizRoot.querySelectorAll(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedIndex = Number(button.dataset.index);
        const answerRecord = buildAnswerRecord(question, selectedIndex);
        state.answers.push(answerRecord);
        state.score += answerRecord.isCorrect ? 1 : 0;
        state.screen = "feedback";
        renderCurrentScreen();
      });
    });
  };

  const renderFeedback = () => {
    const question = quiz.questions[state.currentIndex];
    const answer = state.answers[state.answers.length - 1];
    const nextLabel = state.currentIndex === quiz.questions.length - 1 ? "See results" : "Next question";

    const options = question.options
      .map((option, index) => {
        const optionClasses = ["quiz-option", "quiz-option--static"];
        if (index === answer.correctIndex) {
          optionClasses.push("quiz-option--correct");
        }
        if (index === answer.selectedIndex && !answer.isCorrect) {
          optionClasses.push("quiz-option--incorrect");
        }

        return `
          <div class="${optionClasses.join(" ")}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
          </div>
        `;
      })
      .join("");

    quizRoot.innerHTML = `
      <article class="stack-item quiz-card">
        <div class="stack-meta">${answer.isCorrect ? "Correct answer" : "Review this one"}</div>
        <h3>${question.prompt}</h3>
        <div class="quiz-options">${options}</div>
        <p class="quiz-feedback ${answer.isCorrect ? "quiz-feedback--correct" : "quiz-feedback--incorrect"}" role="status">${answer.feedback}</p>
        <p class="quiz-insight">${answer.insight}</p>
        <div class="quiz-actions">
          <button class="button-link button-link--accent" type="button" data-action="next-step">${nextLabel}</button>
        </div>
      </article>
    `;
    finalizeScreen("feedback");

    quizRoot.querySelector("[data-action='next-step']").addEventListener("click", () => {
      state.currentIndex += 1;
      state.screen = state.currentIndex >= quiz.questions.length ? "results" : "question";
      renderCurrentScreen();
    });
  };

  const renderResults = () => {
    const results = buildQuizResults(quiz, state.answers);
    const percentage = Math.round((results.correct / results.total) * 100);
    const answerCards = state.answers
      .map(
        (answer, index) => `
          <article class="quiz-review-card">
            <div class="stack-meta">${answer.isCorrect ? "Correct" : "Needs review"}</div>
            <h4>${index + 1}. ${answer.prompt}</h4>
            <p><strong>Your answer:</strong> ${answer.selectedOption}</p>
            <p><strong>Correct answer:</strong> ${answer.correctOption}</p>
          </article>
        `
      )
      .join("");

    quizRoot.innerHTML = `
      <article class="stack-item quiz-card">
        <div class="stack-meta">${results.passed ? "Passed" : "Try again"}</div>
        <h3>${results.band.title}</h3>
        <p class="quiz-score-line">You got ${results.correct} out of ${results.total} correct.</p>
        <p class="quiz-score-line">Accuracy: ${percentage}%</p>
        <p>${results.band.message}</p>
        <div class="quiz-results-grid">
          <div class="quiz-stat">
            <strong>${results.correct}</strong>
            <span>Correct</span>
          </div>
          <div class="quiz-stat">
            <strong>${results.incorrect}</strong>
            <span>Incorrect</span>
          </div>
          <div class="quiz-stat">
            <strong>${quiz.passingScore}</strong>
            <span>Needed to pass</span>
          </div>
        </div>
        <div class="quiz-actions">
          <button class="button-link button-link--accent" type="button" data-action="review-answers">Review answers</button>
          <button class="button-link" type="button" data-action="restart-quiz">Restart quiz</button>
          <a class="button-link" href="/pages/learning.html">Back to learning</a>
        </div>
      </article>
      <section class="quiz-review-preview">
        ${answerCards}
      </section>
    `;
    finalizeScreen("results");

    quizRoot.querySelector("[data-action='restart-quiz']").addEventListener("click", () => {
      state = createInitialQuizState();
      state.screen = "question";
      renderCurrentScreen();
    });

    quizRoot.querySelector("[data-action='review-answers']").addEventListener("click", () => {
      state.screen = "review";
      renderCurrentScreen();
    });
  };

  const renderReview = () => {
    const reviewCards = state.answers
      .map(
        (answer, index) => `
          <article class="quiz-review-card">
            <div class="stack-meta">${answer.isCorrect ? "Correct" : "Needs review"}</div>
            <h4>${index + 1}. ${answer.prompt}</h4>
            <p><strong>Your answer:</strong> ${answer.selectedOption}</p>
            <p><strong>Correct answer:</strong> ${answer.correctOption}</p>
            <p>${answer.feedback}</p>
            <p class="quiz-insight">${answer.insight}</p>
          </article>
        `
      )
      .join("");

    quizRoot.innerHTML = `
      <section class="quiz-review-view">
        <article class="stack-item quiz-card">
          <div class="stack-meta">Answer review</div>
          <h3>Look back before your next attempt</h3>
          <p>Use this screen to see where your choices matched the genre clues and where they drifted.</p>
          <div class="quiz-actions">
            <button class="button-link button-link--accent" type="button" data-action="return-results">Back to results</button>
            <button class="button-link" type="button" data-action="restart-quiz">Try again</button>
          </div>
        </article>
        <div class="quiz-review-list">
          ${reviewCards}
        </div>
      </section>
    `;
    finalizeScreen("review");

    quizRoot.querySelector("[data-action='return-results']").addEventListener("click", () => {
      state.screen = "results";
      renderCurrentScreen();
    });

    quizRoot.querySelector("[data-action='restart-quiz']").addEventListener("click", () => {
      state = createInitialQuizState();
      state.screen = "question";
      renderCurrentScreen();
    });
  };

  const renderCurrentScreen = () => {
    if (state.screen === "intro") {
      renderIntro();
      return;
    }

    if (state.screen === "question") {
      renderQuestion();
      return;
    }

    if (state.screen === "feedback") {
      renderFeedback();
      return;
    }

    if (state.screen === "review") {
      renderReview();
      return;
    }

    renderResults();
  };

  renderCurrentScreen();
}

async function init() {
  const page = document.body.dataset.page;

  try {
    if (page === "home") {
      const [home, contracts] = await Promise.all([
        fetchJson("/api/home"),
        fetchJson("/api/contracts")
      ]);
      renderHome(home, contracts);
    }

    if (page === "learning") {
      const learning = await fetchJson("/api/learning");
      renderLearning(learning);
    }

    if (page === "quiz") {
      const quiz = await fetchJson("/api/quiz");
      renderQuiz(quiz);
    }
  } catch (error) {
    console.error(error);
    const title = document.getElementById("page-title");
    if (title) {
      title.textContent = "Something went wrong";
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    buildAnswerRecord,
    buildQuizResults,
    createInitialQuizState,
    getProgressText,
    getProgressValue,
    getResultBand,
    getScoreBreakdown
  };
}

if (typeof document !== "undefined") {
  init();
}
