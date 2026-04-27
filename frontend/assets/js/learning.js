function buildWaveform(containerId, seed) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.style.cssText = "display:flex;align-items:flex-end;gap:3px;height:56px;";
  const rand = (s) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 28; i++) {
    const bar = document.createElement("div");
    const h = Math.max(8, Math.floor(rand(seed + i) * 52));
    bar.style.cssText = `flex:1;height:${h}px;background:var(--accent);border-radius:3px;`;
    el.appendChild(bar);
  }
}

// Real-time audio visualizer using Web Audio API
function initAudioVisualizer(audioId, containerId) {
  const audio = document.getElementById(audioId);
  const container = document.getElementById(containerId);
  
  if (!audio || !container) return;

  // Create canvas for visualizer
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:56px;display:block;';
  container.innerHTML = ''; // Clear static waveform
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = container.offsetWidth;
  canvas.height = 56;

  // Web Audio API setup
  let audioContext = null;
  let analyser = null;
  let dataArray = null;
  let animationId = null;

  function setupAudioContext() {
    if (audioContext) return; // Already set up

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    
    analyser.fftSize = 64; // 32 frequency bars
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  function draw() {
    if (!analyser || !dataArray) return;

    animationId = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    // Clear canvas
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barCount = dataArray.length;
    const barWidth = (canvas.width / barCount) - 3;
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#b84a23';

    let x = 0;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.max(8, (dataArray[i] / 255) * canvas.height);
      
      ctx.fillStyle = accentColor;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      
      x += barWidth + 3;
    }
  }

  // Start visualizer when audio plays
  audio.addEventListener('play', () => {
    setupAudioContext();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    draw();
  });

  // Stop visualizer when audio pauses
  audio.addEventListener('pause', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });

  // Cleanup when audio ends
  audio.addEventListener('ended', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    // Reset to static bars
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = 56;
  });
}

function initAudioPlayer(genre) {
  const audio = document.getElementById(`audio-${genre}`);
  const playBtn = document.getElementById(`play-btn-${genre}`);
  const progressFill = document.getElementById(`progress-fill-${genre}`);
  const progressTrack = document.getElementById(`progress-track-${genre}`);
  const currentTimeEl = document.getElementById(`current-time-${genre}`);
  const durationTimeEl = document.getElementById(`duration-time-${genre}`);

  if (!audio || !playBtn || !progressFill) return;

  const playIcon = "▶";
  const pauseIcon = "⏸";

  // Format time as MM:SS
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Update progress bar and time display
  function updateProgress() {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  }

  // Set duration when metadata loads
  audio.addEventListener("loadedmetadata", () => {
    if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
  });

  // Update progress during playback
  audio.addEventListener("timeupdate", updateProgress);

  // Reset button when track ends
  audio.addEventListener("ended", () => {
    playBtn.innerHTML = `${playIcon} Play ${genre === "afrobeat" ? "Heis – Rema" : "Mnike – Tyler ICU & Uncle Waffles"}`;
    progressFill.style.width = "0%";
    if (currentTimeEl) currentTimeEl.textContent = "0:00";
  });

  // Play/pause toggle
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = `${pauseIcon} Pause`;
    } else {
      audio.pause();
      playBtn.innerHTML = `${playIcon} Play ${genre === "afrobeat" ? "Heis – Rema" : "Mnike – Tyler ICU & Uncle Waffles"}`;
    }
  });

  // Click on progress bar to seek
  if (progressTrack) {
    progressTrack.addEventListener("click", (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.currentTime = percent * audio.duration;
    });
  }

  // Handle errors
  audio.addEventListener("error", () => {
    console.error(`Error loading audio for ${genre}`);
    playBtn.disabled = true;
    playBtn.innerHTML = "⚠ Audio file not found";
    playBtn.style.opacity = "0.5";
    playBtn.style.cursor = "not-allowed";
  });
}

function initEntry() {
  document.getElementById("page-title").textContent = "Learn the Difference";
  document.getElementById("page-summary").textContent =
    "Two genres. One rhythm question. Start with the one you want to learn first.";

  const moduleList = document.getElementById("module-list");
  if (!moduleList) return;
  moduleList.className = "card-grid";

  const subs = {
    afrobeat: "Nigeria · ~95 BPM · Talking drum",
    amapiano: "South Africa · ~112 BPM · Log drum",
  };

  [LEARNING_DATA.afrobeat, LEARNING_DATA.amapiano].forEach((genre) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = genre.overviewPath;
    card.innerHTML = `
      <span class="stack-meta">${genre.label}</span>
      <h3>${genre.name}</h3>
      <p>${subs[genre.id]}</p>
    `;
    moduleList.appendChild(card);
  });
}

function initPreviewButton(genre) {
  const audio = document.getElementById(`audio-${genre}-preview`);
  const playBtn = document.getElementById(`play-btn-${genre}-preview`);

  if (!audio || !playBtn) return;

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = "⏸ Pause";
    } else {
      audio.pause();
      playBtn.innerHTML = "▶ Preview Track";
    }
  });

  audio.addEventListener("ended", () => {
    playBtn.innerHTML = "▶ Preview Track";
  });

  audio.addEventListener("error", () => {
    console.error(`Error loading preview audio for ${genre}`);
    playBtn.disabled = true;
    playBtn.innerHTML = "⚠ Audio not available";
    playBtn.style.opacity = "0.5";
    playBtn.style.cursor = "not-allowed";
  });
}

function getFlowState(pageId) {
  const index = LEARNING_FLOW.findIndex((step) => step.id === pageId);
  return {
    currentIndex: index,
    currentStep: LEARNING_FLOW[index],
    previousStep: index > 0 ? LEARNING_FLOW[index - 1] : null,
    nextStep: index >= 0 && index < LEARNING_FLOW.length - 1 ? LEARNING_FLOW[index + 1] : null,
    totalSteps: LEARNING_FLOW.length,
  };
}

function renderLessonProgress(pageId, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const state = getFlowState(pageId);
  if (state.currentIndex < 0) return;

  mount.innerHTML = `
    <div class="lesson-progress-bar">
      ${LEARNING_FLOW.map((step, index) => `
        <span class="lesson-progress-node ${index <= state.currentIndex ? "is-complete" : ""}"></span>
      `).join("")}
    </div>
    <div class="lesson-progress-copy">
      <span>Step ${state.currentIndex + 1} of ${state.totalSteps}</span>
      <strong>${state.currentStep.title}</strong>
    </div>
  `;
}

function renderLessonPager(pageId, mountId, options = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const state = getFlowState(pageId);
  if (state.currentIndex < 0) return;

  const previous = state.previousStep
    ? `<a href="${state.previousStep.path}" class="lesson-nav-link">← ${options.previousLabel || "Previous lesson"}</a>`
    : "";

  const nextLabel = options.nextLabel || "Next lesson";
  const next = state.nextStep
    ? `<a href="${state.nextStep.path}" class="button-link">${nextLabel} →</a>`
    : `<a href="/pages/quiz.html" class="button-link">Start quiz →</a>`;

  mount.innerHTML = `
    <div class="lesson-pager">
      <div>${previous}</div>
      <div>${next}</div>
    </div>
  `;
}

function renderListeningPrompts(genre, mountId) {
  const mount = document.getElementById(mountId);
  const info = LEARNING_DATA[genre];
  if (!mount || !info?.listeningPrompts) return;

  mount.innerHTML = info.listeningPrompts
    .map(
      (prompt, index) => `
        <div class="stack-item listen-callout">
          <strong>${index + 1}. Listen for this</strong>
          <p>${prompt}</p>
        </div>
      `
    )
    .join("");
}

function renderCompare() {
  renderLessonProgress("compare", "lesson-progress");
  renderLessonPager("compare", "lesson-pager");

  const comparisonGrid = document.getElementById("comparison-grid");
  if (comparisonGrid) {
    comparisonGrid.innerHTML = COMPARISON_DATA.map((item) => `
      <article class="compare-card">
        <div class="compare-label">${item.label}</div>
        <div class="compare-columns">
          <div class="compare-side compare-side-afrobeat">
            <h3>Afrobeat</h3>
            <p>${item.afrobeat}</p>
          </div>
          <div class="compare-side compare-side-amapiano">
            <h3>Amapiano</h3>
            <p>${item.amapiano}</p>
          </div>
        </div>
      </article>
    `).join("");
  }
}

function renderRecap() {
  renderLessonProgress("recap", "lesson-progress");
  renderLessonPager("recap", "lesson-pager", { nextLabel: "Start quiz" });

  const recapList = document.getElementById("recap-list");
  if (recapList) {
    recapList.innerHTML = `
      <article class="stack-item recap-card">
        <div class="compare-label">Afrobeat</div>
        <ul class="recap-points">
          ${LEARNING_DATA.afrobeat.recapPoints.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </article>
      <article class="stack-item recap-card">
        <div class="compare-label">Amapiano</div>
        <ul class="recap-points">
          ${LEARNING_DATA.amapiano.recapPoints.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </article>
    `;
  }

  const recapChecks = document.getElementById("recap-checks");
  if (recapChecks) {
    recapChecks.innerHTML = RECAP_CHECKS.map((item) => `
      <article class="stack-item recap-check">
        <h3>${item.prompt}</h3>
        <p><strong>Best answer:</strong> ${item.answer}</p>
      </article>
    `).join("");
  }
}

function init() {
  const page = document.body.dataset.page;
  const genre = document.body.dataset.genre;

  if (page === "learning-entry") {
    initEntry();
  } else if (page === "learning-overview" && genre) {
    buildWaveform("waveform-" + genre, genre === "afrobeat" ? 42 : 99);
    initPreviewButton(genre);
    renderLessonProgress(`${genre}-overview`, "lesson-progress");
    renderLessonPager(`${genre}-overview`, "lesson-pager");
  } else if (page === "learning-listen" && genre) {
    // Use real-time audio visualizer for listen pages
    initAudioVisualizer("audio-" + genre, "waveform-listen-" + genre);
    initAudioPlayer(genre);
    renderLessonProgress(`${genre}-listen`, "lesson-progress");
    renderLessonPager(`${genre}-listen`, "lesson-pager");
    renderListeningPrompts(genre, `listen-prompts-${genre}`);
  } else if (page === "learning-compare") {
    renderCompare();
  } else if (page === "learning-recap") {
    renderRecap();
  }
}

document.addEventListener("DOMContentLoaded", init);
