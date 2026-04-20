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

function renderQuiz(quiz) {
  document.getElementById("page-title").textContent = quiz.title;
  document.getElementById("page-summary").textContent = quiz.summary;

  const quizRoot = document.getElementById("quiz-root");
  let currentIndex = 0;
  let score = 0;

  const renderQuestion = () => {
    const question = quiz.questions[currentIndex];
    if (!question) {
      quizRoot.innerHTML = `
        <article class="stack-item">
          <div class="stack-meta">Flow complete</div>
          <h3>Quiz finished</h3>
          <p>You answered ${score} out of ${quiz.questions.length} questions correctly.</p>
          <a class="button-link" href="/pages/index.html">Back to homepage</a>
        </article>
      `;
      return;
    }

    const options = question.options
      .map(
        (option, index) => `
          <button class="quiz-option" data-index="${index}">${option}</button>
        `
      )
      .join("");

    quizRoot.innerHTML = `
      <article class="stack-item">
        <div class="stack-meta">Question ${currentIndex + 1} of ${quiz.questions.length}</div>
        <h3>${question.prompt}</h3>
        <div class="quiz-options">${options}</div>
        <p id="quiz-feedback" class="quiz-feedback"></p>
      </article>
    `;

    quizRoot.querySelectorAll(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedIndex = Number(button.dataset.index);
        const isCorrect = selectedIndex === question.answerIndex;
        if (isCorrect) {
          score += 1;
        }

        const feedback = document.getElementById("quiz-feedback");
        feedback.textContent = isCorrect ? "Correct. Moving to the next question." : "Not quite. Moving to the next question.";

        setTimeout(() => {
          currentIndex += 1;
          renderQuestion();
        }, 700);
      });
    });
  };

  renderQuestion();
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

init();
