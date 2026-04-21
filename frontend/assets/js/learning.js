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

function init() {
  const page = document.body.dataset.page;
  const genre = document.body.dataset.genre;

  if (page === "learning-entry") {
    initEntry();
  } else if (page === "learning-overview" && genre) {
    buildWaveform("waveform-" + genre, genre === "afrobeat" ? 42 : 99);
    initPreviewButton(genre);
  } else if (page === "learning-listen" && genre) {
    buildWaveform("waveform-listen-" + genre, genre === "afrobeat" ? 42 : 99);
    initAudioPlayer(genre);
  }
}

document.addEventListener("DOMContentLoaded", init);
