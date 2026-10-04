// =========================
// 1. MENU TOGGLE
// =========================
const menuToggle = document.getElementById("menuToggle");
const menuList = document.getElementById("menuList");

if (menuToggle && menuList) {
  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
  });

  document.querySelectorAll("#menuList a").forEach(link => {
    link.addEventListener("click", () => {
      menuList.classList.add("hidden");
    });
  });
}

// =========================
// 2. PWA INSTALL BUTTON
// =========================
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
  installButton.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
});

// =========================
// 3. PLAYER CONTROLS
// =========================
const playButton = document.getElementById("playButton");
const radioPlayer = document.getElementById("radioPlayer");
const statusText = document.getElementById("statusText");

let isPlaying = false;

if (playButton && radioPlayer) {
  playButton.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await radioPlayer.play();
        isPlaying = true;
        playButton.textContent = "⏸ Pause Live Radio";
        playButton.classList.add("playing");
        if (statusText) statusText.textContent = "Streaming live…";
      } else {
        radioPlayer.pause();
        isPlaying = false;
        playButton.textContent = "▶️ Listen Live";
        playButton.classList.remove("playing");
        if (statusText) statusText.textContent = "Paused.";
      }
    } catch (err) {
      if (statusText) statusText.textContent = "Unable to start stream. Please check your connection.";
    }
  });
}

// =========================
// 4. FULL WEEKLY SCHEDULE
// =========================
const schedule = {
  Monday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 10:00", show: "The Breakfast Show", host: "Mike Hammond" },
    { time: "10:00 – 14:00", show: "The Mid Morning Show", host: "" },
    { time: "14:00 – 15:00", show: "The Gold Mine", host: "" },
    { time: "15:00 – 19:00", show: "The Afternoon Show", host: "Andy Hoyle" },
    { time: "19:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Tuesday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 10:00", show: "The Breakfast Show", host: "Mike Hammond" },
    { time: "10:00 – 14:00", show: "The Mid Morning Show", host: "" },
    { time: "14:00 – 15:00", show: "The Gold Mine", host: "" },
    { time: "15:00 – 19:00", show: "The Afternoon Show", host: "Andy Hoyle" },
    { time: "19:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Wednesday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 10:00", show: "The Breakfast Show", host: "Mike Hammond" },
    { time: "10:00 – 14:00", show: "The Mid Morning Show", host: "" },
    { time: "14:00 – 15:00", show: "The Gold Mine", host: "" },
    { time: "15:00 – 19:00", show: "The Afternoon Show", host: "Andy Hoyle" },
    { time: "19:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Thursday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 10:00", show: "The Breakfast Show", host: "Mike Hammond" },
    { time: "10:00 – 14:00", show: "The Mid Morning Show", host: "" },
    { time: "14:00 – 15:00", show: "The Gold Mine", host: "" },
    { time: "15:00 – 19:00", show: "The Afternoon Show", host: "Andy Hoyle" },
    { time: "19:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Friday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 10:00", show: "The Breakfast Show", host: "Mike Hammond" },
    { time: "10:00 – 14:00", show: "The Mid Morning Show", host: "" },
    { time: "14:00 – 15:00", show: "The Gold Mine", host: "" },
    { time: "15:00 – 19:00", show: "The Afternoon Show", host: "Andy Hoyle" },
    { time: "19:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Saturday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 08:00", show: "Wake Up to the Weekend", host: "Mel Rispin" },
    { time: "08:00 – 12:00", show: "The Saturday Morning Show", host: "Mike Hammond" },
    { time: "12:00 – 14:00", show: "The Rob Charles Show", host: "Rob Charles" },
    { time: "14:00 – 18:00", show: "Nothing but the 80's", host: "" },
    { time: "18:00 – 19:00", show: "A to Z of Northern Soul", host: "Glyn Williams" },
    { time: "19:00 – 20:00", show: "Get on the Good Foot", host: "Mark Mason" },
    { time: "20:00 – 22:00", show: "Rob Charles Rewind", host: "Rob Charles" },
    { time: "22:00 – 00:00", show: "The Evening Session", host: "" }
  ],

  Sunday: [
    { time: "00:00 – 06:00", show: "Nightflight", host: "" },
    { time: "06:00 – 09:00", show: "Wake Up to the Weekend", host: "Mel Rispin" },
    { time: "09:00 – 12:00", show: "We Love the 1970's", host: "Mark Mason" },
    { time: "12:00 – 14:00", show: "The Rob Charles Show", host: "Rob Charles" },
    { time: "14:00 – 16:00", show: "Silky Soul", host: "Glyn Williams" },
    { time: "16:00 – 18:00", show: "The Sunday Sequence", host: "" },
    { time: "18:00 – 00:00", show: "The Evening Session", host: "" }
  ]
};

// =========================
// 5. TODAY'S SHOWS
// =========================
function showTodaysSchedule() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
  const todaysShows = schedule[today] || [];
  const container = document.getElementById("todays-shows");

  if (!container) return;

  container.innerHTML = todaysShows
    .map(item => `<p><strong>${item.time}</strong> – ${item.show} ${item.host ? `(${item.host})` : ""}</p>`)
    .join("");
}

showTodaysSchedule();
// =========================
// NOW ON AIR — PRESENTER PHOTO + CURRENT SHOW
// =========================

function getCurrentShow() {
  const now = new Date();
  const today = now.toLocaleDateString("en-GB", { weekday: "long" });
  const todaysShows = schedule[today] || [];

  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (const show of todaysShows) {
    const [start, end] = show.time.split(" – ");
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    if (currentTime >= startMinutes && currentTime < endMinutes) {
      return show;
    }
  }

  return null;
}

function updateNowOnAir() {
  const box = document.getElementById("now-on-air-box");
  const photo = document.getElementById("now-on-air-photo");
  const show = getCurrentShow();

  if (!box || !photo) return;

  if (show) {
    box.innerHTML = `
      <p><strong>${show.time}</strong></p>
      <p>${show.show}</p>
      <p>${show.host ? show.host : ""}</p>
    `;

    // Presenter photo mapping
    const presenterPhotos = {
      "Mike Hammond": "assets/mike.jpg",
      "Andy Hoyle": "assets/andy.png",
      "Mel Rispin": "assets/mel.jpg",
      "Rob Charles": "assets/rob.jpg",
      "Glyn Williams": "assets/glyn.jpg",
      "Mark Mason": "assets/mark.jpg"
    };

    if (show.host && presenterPhotos[show.host]) {
      photo.src = presenterPhotos[show.host];
      photo.style.display = "block";
    } else {
      photo.style.display = "none";
    }

  } else {
    box.textContent = "No show currently scheduled.";
    photo.style.display = "none";
  }
}

updateNowOnAir();
setInterval(updateNowOnAir, 60000); // update every minute

// =========================
// 6. NOW PLAYING METADATA
// =========================
async function fetchNowPlaying() {
  try {
    const response = await fetch("https://bridgold.radioca.st/status-json.xsl");
    const data = await response.json();

    const titleElement = document.getElementById("track-title");
    const artistElement = document.getElementById("track-artist");

    let nowPlaying = data.icestats?.source?.[0]?.title || "Unknown Track";

    nowPlaying = nowPlaying.replace(/[\u0000-\u001F\u007F]/g, "").trim();

    if (nowPlaying.includes(" - ")) {
      const [title, artist] = nowPlaying.split(" - ");
      titleElement.textContent = title.trim();
      artistElement.textContent = artist.trim();
    } else {
      titleElement.textContent = nowPlaying;
      artistElement.textContent = "";
    }

  } catch (error) {
    console.error("Metadata error:", error);
    document.getElementById("track-title").textContent = "Unable to load";
    document.getElementById("track-artist").textContent = "";
  }
}

setInterval(fetchNowPlaying, 10000);
fetchNowPlaying();
