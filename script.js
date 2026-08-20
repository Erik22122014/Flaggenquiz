const MAX_LEVEL = 35;
const QUESTIONS_PER_LEVEL = 7;

// Die Reihenfolge bildet die fünf Schwierigkeitsstufen mit je 49 Flaggen ab.
const flagCatalog = [
  ["jp", "Japan"], ["br", "Brasilien"], ["is", "Island"], ["za", "Südafrika"], ["gr", "Griechenland"], ["ma", "Marokko"], ["ca", "Kanada"], ["pt", "Portugal"], ["it", "Italien"], ["de", "Deutschland"], ["fr", "Frankreich"], ["au", "Australien"], ["us", "USA"], ["ch", "Schweiz"], ["kr", "Südkorea"], ["mx", "Mexiko"], ["eg", "Ägypten"], ["no", "Norwegen"], ["es", "Spanien"], ["tr", "Türkei"], ["in", "Indien"], ["ar", "Argentinien"], ["ke", "Kenia"], ["nl", "Niederlande"], ["se", "Schweden"], ["at", "Österreich"], ["dk", "Dänemark"], ["fi", "Finnland"], ["ie", "Irland"], ["nz", "Neuseeland"], ["cn", "China"], ["vn", "Vietnam"], ["th", "Thailand"], ["my", "Malaysia"], ["sg", "Singapur"], ["id", "Indonesien"], ["ph", "Philippinen"], ["co", "Kolumbien"], ["pe", "Peru"], ["uy", "Uruguay"], ["ec", "Ecuador"], ["bo", "Bolivien"], ["py", "Paraguay"], ["cr", "Costa Rica"], ["pa", "Panama"], ["cu", "Kuba"], ["jm", "Jamaika"], ["do", "Dominikanische Republik"], ["ht", "Haiti"],
  ["al", "Albanien"], ["dz", "Algerien"], ["ad", "Andorra"], ["ao", "Angola"], ["ag", "Antigua und Barbuda"], ["am", "Armenien"], ["az", "Aserbaidschan"], ["bs", "Bahamas"], ["bh", "Bahrain"], ["bd", "Bangladesch"], ["bb", "Barbados"], ["by", "Belarus"], ["be", "Belgien"], ["bz", "Belize"], ["bj", "Benin"], ["bt", "Bhutan"], ["ba", "Bosnien und Herzegowina"], ["bw", "Botswana"], ["bn", "Brunei"], ["bg", "Bulgarien"], ["bf", "Burkina Faso"], ["bi", "Burundi"], ["cv", "Kap Verde"], ["kh", "Kambodscha"], ["cm", "Kamerun"], ["cf", "Zentralafrikanische Republik"], ["td", "Tschad"], ["km", "Komoren"], ["cg", "Republik Kongo"], ["cd", "Demokratische Republik Kongo"], ["hr", "Kroatien"], ["cy", "Zypern"], ["cz", "Tschechien"], ["dj", "Dschibuti"], ["dm", "Dominica"], ["sv", "El Salvador"], ["gq", "Äquatorialguinea"], ["er", "Eritrea"], ["ee", "Estland"], ["sz", "Eswatini"], ["et", "Äthiopien"], ["fj", "Fidschi"], ["ga", "Gabun"], ["gm", "Gambia"], ["ge", "Georgien"], ["gh", "Ghana"], ["gd", "Grenada"], ["gt", "Guatemala"], ["gn", "Guinea"],
  ["gw", "Guinea-Bissau"], ["gy", "Guyana"], ["hn", "Honduras"], ["hu", "Ungarn"], ["ir", "Iran"], ["iq", "Irak"], ["il", "Israel"], ["ci", "Elfenbeinküste"], ["jo", "Jordanien"], ["kz", "Kasachstan"], ["kw", "Kuwait"], ["kg", "Kirgisistan"], ["la", "Laos"], ["lv", "Lettland"], ["lb", "Libanon"], ["ls", "Lesotho"], ["lr", "Liberia"], ["ly", "Libyen"], ["li", "Liechtenstein"], ["lt", "Litauen"], ["lu", "Luxemburg"], ["mg", "Madagaskar"], ["mw", "Malawi"], ["mv", "Malediven"], ["ml", "Mali"], ["mt", "Malta"], ["mh", "Marshallinseln"], ["mr", "Mauretanien"], ["mu", "Mauritius"], ["md", "Moldau"], ["mc", "Monaco"], ["mn", "Mongolei"], ["me", "Montenegro"], ["mz", "Mosambik"], ["mm", "Myanmar"], ["na", "Namibia"], ["nr", "Nauru"], ["np", "Nepal"], ["ni", "Nicaragua"], ["ne", "Niger"], ["ng", "Nigeria"], ["mk", "Nordmazedonien"], ["om", "Oman"], ["pk", "Pakistan"], ["pw", "Palau"], ["ps", "Palästina"], ["pg", "Papua-Neuguinea"], ["pl", "Polen"], ["qa", "Katar"], ["ro", "Rumänien"], ["ru", "Russland"], ["rw", "Ruanda"], ["kn", "St. Kitts und Nevis"], ["lc", "St. Lucia"], ["vc", "St. Vincent und die Grenadinen"], ["ws", "Samoa"], ["sm", "San Marino"], ["st", "São Tomé und Príncipe"], ["sa", "Saudi-Arabien"], ["sn", "Senegal"], ["rs", "Serbien"], ["sl", "Sierra Leone"], ["sk", "Slowakei"], ["si", "Slowenien"], ["sb", "Salomonen"], ["so", "Somalia"], ["lk", "Sri Lanka"], ["sd", "Sudan"], ["sr", "Suriname"], ["sy", "Syrien"], ["tj", "Tadschikistan"], ["tz", "Tansania"], ["tl", "Osttimor"], ["tg", "Togo"], ["to", "Tonga"], ["tn", "Tunesien"], ["tm", "Turkmenistan"], ["tv", "Tuvalu"], ["ug", "Uganda"], ["ua", "Ukraine"], ["ae", "Vereinigte Arabische Emirate"], ["gb", "Vereinigtes Königreich"], ["uz", "Usbekistan"], ["vu", "Vanuatu"], ["va", "Vatikanstadt"], ["ve", "Venezuela"], ["ye", "Jemen"], ["zm", "Sambia"], ["zw", "Simbabwe"], ["xk", "Kosovo"], ["ax", "Åland"], ["as", "Amerikanisch-Samoa"], ["ai", "Anguilla"], ["aq", "Antarktis"], ["aw", "Aruba"], ["bm", "Bermuda"], ["bq", "Bonaire, Sint Eustatius und Saba"], ["vg", "Britische Jungferninseln"], ["ky", "Kaimaninseln"], ["cx", "Weihnachtsinsel"], ["cc", "Kokosinseln"], ["ck", "Cookinseln"], ["cw", "Curaçao"], ["fk", "Falklandinseln"], ["fo", "Färöer"], ["gf", "Französisch-Guayana"], ["pf", "Französisch-Polynesien"], ["gi", "Gibraltar"], ["gl", "Grönland"], ["gu", "Guam"], ["gg", "Guernsey"], ["hk", "Hongkong"], ["im", "Isle of Man"], ["je", "Jersey"], ["mo", "Macau"], ["mq", "Martinique"], ["ms", "Montserrat"], ["nc", "Neukaledonien"], ["nu", "Niue"], ["nf", "Norfolkinsel"], ["mp", "Nördliche Marianen"], ["pn", "Pitcairninseln"], ["pr", "Puerto Rico"], ["re", "Réunion"], ["sh", "St. Helena"], ["mf", "Saint-Martin"], ["pm", "Saint-Pierre und Miquelon"], ["sx", "Sint Maarten"], ["sj", "Spitzbergen und Jan Mayen"], ["tw", "Taiwan"], ["tk", "Tokelau"], ["tc", "Turks- und Caicosinseln"], ["vi", "Amerikanische Jungferninseln"], ["wf", "Wallis und Futuna"], ["eh", "Westsahara"], ["yt", "Mayotte"], ["um", "United States Minor Outlying Islands"], ["bv", "Bouvetinsel"], ["io", "Britisches Territorium im Indischen Ozean"], ["bl", "Saint-Barthélemy"], ["gp", "Guadeloupe"], ["tf", "Französische Süd- und Antarktisgebiete"], ["hm", "Heard und McDonaldinseln"], ["ki", "Kiribati"], ["gs", "Südgeorgien und die Südlichen Sandwichinseln"], ["ta", "Tristan da Cunha"], ["dg", "Diego Garcia"]
].map(([code, country]) => ({ code, country }));

const flagImage = document.querySelector("#flag-image");
const answersElement = document.querySelector("#answers");
const scoreElement = document.querySelector("#score");
const questionCount = document.querySelector("#question-count");
const progressBar = document.querySelector("#progress-bar");
const levelCount = document.querySelector("#level-count");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const resultEyebrow = document.querySelector("#result-eyebrow");
const resultTitle = document.querySelector("#result-title");
const finalScore = document.querySelector("#final-score");
const resultDetail = document.querySelector("#result-detail");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");
const difficultyElement = document.querySelector(".stage-label");

let level = 1;
let questionIndex = 0;
let levelFailed = false;
let answered = false;
let levelQuestions = [];
let currentUser = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startLevel() {
  const firstFlagIndex = (level - 1) * QUESTIONS_PER_LEVEL;
  levelQuestions = flagCatalog.slice(firstFlagIndex, firstFlagIndex + QUESTIONS_PER_LEVEL).map((question) => ({
    ...question,
    options: getOptions(question)
  }));
  questionIndex = 0;
  levelFailed = false;
  renderQuestion();
}

function getOptions(question) {
  const difficultyStart = Math.floor((level - 1) / 7) * 49;
  const difficultyEnd = difficultyStart + 49;
  const sameDifficultyFlags = flagCatalog.slice(difficultyStart, difficultyEnd);
  const distractors = shuffle(sameDifficultyFlags.filter((flag) => flag.code !== question.code))
    .slice(0, 3)
    .map((flag) => flag.country);
  return shuffle([question.country, ...distractors]);
}

function renderQuestion() {
  const question = levelQuestions[questionIndex];
  answered = false;
  flagImage.src = `https://flagcdn.com/w640/${question.code}.png`;
  flagImage.alt = "Flagge ohne Länderhinweis";
  questionCount.textContent = `Frage ${String(questionIndex + 1).padStart(2, "0")} / ${QUESTIONS_PER_LEVEL}`;
  progressBar.style.width = `${((questionIndex + 1) / QUESTIONS_PER_LEVEL) * 100}%`;
  levelCount.textContent = `Level ${String(level).padStart(2, "0")} / ${MAX_LEVEL}`;
  scoreElement.textContent = String(level).padStart(2, "0");
  difficultyElement.textContent = getDifficulty(level);
  answersElement.innerHTML = shuffle(question.options).map((option, index) => `
    <button class="answer-button" type="button" data-answer="${option}">
      <span class="answer-number">0${index + 1}</span>
      <span class="answer-text">${option}</span>
      <span class="answer-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");
  answersElement.querySelectorAll(".answer-button").forEach((button) => button.addEventListener("click", () => chooseAnswer(button)));
}

function getDifficulty(currentLevel) {
  if (currentLevel <= 7) return "Sehr einfach";
  if (currentLevel <= 14) return "Einfach";
  if (currentLevel <= 21) return "Mittel";
  if (currentLevel <= 28) return "Schwer";
  return "Sehr schwer";
}

function chooseAnswer(button) {
  if (answered) return;
  answered = true;
  const question = levelQuestions[questionIndex];
  if (button.dataset.answer !== question.country) levelFailed = true;
  answersElement.querySelectorAll(".answer-button").forEach((item) => { item.disabled = true; });
  window.setTimeout(nextQuestion, 280);
}

function nextQuestion() {
  if (questionIndex === QUESTIONS_PER_LEVEL - 1) {
    showLevelResult();
    return;
  }
  questionIndex += 1;
  renderQuestion();
}

function showLevelResult() {
  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
  const passed = !levelFailed;
  resultEyebrow.textContent = passed ? `Level ${level} geschafft` : `Level ${level} wiederholen`;
  resultTitle.innerHTML = passed ? "Weiter zur<br><em>nächsten Stufe.</em>" : "Fast geschafft.<br><em>Versuch es erneut.</em>";
  finalScore.textContent = String(level).padStart(2, "0");
  resultDetail.textContent = passed ? `/ ${MAX_LEVEL} Level` : "· 7 neue Flaggen";
  resultMessage.textContent = passed
    ? "Alle sieben Antworten waren richtig."
    : "Für den Aufstieg müssen alle sieben Antworten richtig sein.";
  if (currentUser) {
    currentUser.rounds += 1;
    if (passed) currentUser.highscore = Math.max(currentUser.highscore, level);
    currentUser.level = passed ? Math.min(MAX_LEVEL, level + 1) : level;
    saveCurrentUser();
    updateDashboard();
  }
  restartButton.textContent = passed && level === MAX_LEVEL ? "Nochmal spielen ↗" : passed ? "Nächstes Level ↗" : "Level wiederholen ↗";
}

restartButton.addEventListener("click", () => {
  const wasPassed = !levelFailed;
  if (wasPassed && level < MAX_LEVEL) level += 1;
  quizView.classList.remove("hidden");
  resultView.classList.add("hidden");
  startLevel();
});
document.addEventListener("keydown", (event) => {
  if (answered || quizView.classList.contains("hidden")) return;
  const index = Number(event.key) - 1;
  const button = answersElement.querySelectorAll(".answer-button")[index];
  if (button) chooseAnswer(button);
});

startLevel();

const authModal = document.querySelector("#auth-modal");
const passwordModal = document.querySelector("#password-modal");
const authForm = document.querySelector("#auth-form");
const passwordForm = document.querySelector("#password-form");
const authMessage = document.querySelector("#auth-message");
const passwordMessage = document.querySelector("#password-message");
const authTitle = document.querySelector("#auth-title");
const authSubmit = document.querySelector("#auth-submit");
const nameInput = document.querySelector("#auth-name");
const nameLabel = document.querySelector("#name-label");
const userChip = document.querySelector("#user-chip");
const loginButton = document.querySelector("#login-button");
const logoutButton = document.querySelector("#logout-button");
const dashboard = document.querySelector("#dashboard");
const profileName = document.querySelector("#profile-name");
const profileProgress = document.querySelector("#profile-progress");
const profileScore = document.querySelector("#profile-score");
const profileRounds = document.querySelector("#profile-rounds");
const leaderboard = document.querySelector("#leaderboard");
let authMode = "login";

function getUsers() {
  return JSON.parse(localStorage.getItem("flaggenquiz-users") || "{}");
}

function saveCurrentUser() {
  if (!currentUser) return;
  const users = getUsers();
  users[currentUser.email] = currentUser;
  localStorage.setItem("flaggenquiz-users", JSON.stringify(users));
  localStorage.setItem("flaggenquiz-current", currentUser.email);
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function openModal(modal) { modal.classList.remove("hidden"); }
function closeModal(modal) { modal.classList.add("hidden"); }

function setAuthMode(mode) {
  authMode = mode;
  const register = mode === "register";
  document.querySelectorAll(".auth-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.authView === mode));
  authTitle.innerHTML = register ? "Konto<br><em>erstellen.</em>" : "Willkommen<br><em>zurück.</em>";
  authSubmit.textContent = register ? "Registrieren ↗" : "Anmelden ↗";
  nameInput.classList.toggle("hidden", !register);
  nameLabel.classList.toggle("hidden", !register);
  nameInput.required = register;
  authMessage.textContent = "";
}

function updateDashboard() {
  if (!currentUser) return;
  userChip.textContent = currentUser.name;
  profileName.textContent = currentUser.name;
  profileProgress.textContent = `Level ${String(currentUser.level).padStart(2, "0")}`;
  profileScore.textContent = currentUser.highscore;
  profileRounds.textContent = currentUser.rounds;
  dashboard.classList.remove("hidden");
  renderLeaderboard();
}

function renderLeaderboard() {
  const entries = Object.values(getUsers()).sort((first, second) => second.highscore - first.highscore || second.level - first.level).slice(0, 10);
  leaderboard.innerHTML = entries.length ? entries.map((entry, index) => `
    <div class="leader-row"><span class="leader-rank">0${index + 1}</span><strong>${entry.name}</strong><span>Level ${String(entry.level).padStart(2, "0")}</span><b>${entry.highscore} Punkte</b></div>
  `).join("") : `<p class="empty-state">Noch keine Spieler registriert.</p>`;
}

function restoreSession() {
  const email = localStorage.getItem("flaggenquiz-current");
  const user = email ? getUsers()[email] : null;
  if (!user) return;
  currentUser = user;
  level = Math.min(MAX_LEVEL, Math.max(1, user.level));
  updateDashboard();
  userChip.classList.remove("hidden");
  loginButton.classList.add("hidden");
  logoutButton.classList.remove("hidden");
}

document.querySelectorAll(".auth-tab").forEach((tab) => tab.addEventListener("click", () => setAuthMode(tab.dataset.authView)));
loginButton.addEventListener("click", () => { setAuthMode("login"); openModal(authModal); });
logoutButton.addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("flaggenquiz-current");
  userChip.classList.add("hidden");
  loginButton.classList.remove("hidden");
  logoutButton.classList.add("hidden");
  dashboard.classList.add("hidden");
  level = 1;
  startLevel();
});
document.querySelector("#auth-close").addEventListener("click", () => closeModal(authModal));
document.querySelector("#password-close").addEventListener("click", () => closeModal(passwordModal));
document.querySelector("#password-button").addEventListener("click", () => { passwordMessage.textContent = ""; passwordForm.reset(); openModal(passwordModal); });
document.querySelector("#challenge-button").addEventListener("click", () => { resultEyebrow.textContent = "Lokale Challenge"; resultTitle.innerHTML = "Schlag deine<br><em>Mitspieler.</em>"; resultMessage.textContent = "Spiele eine Runde und setze dich an die Spitze der Rangliste."; quizView.classList.remove("hidden"); dashboard.classList.add("hidden"); window.scrollTo({ top: 0, behavior: "smooth" }); });

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#auth-email").value.trim().toLowerCase();
  const password = document.querySelector("#auth-password").value;
  const users = getUsers();
  if (authMode === "register") {
    const name = nameInput.value.trim();
    if (users[email]) { authMessage.textContent = "Diese E-Mail ist bereits registriert."; return; }
    currentUser = { email, name, passwordHash: await hashPassword(password), level: 1, highscore: 0, rounds: 0 };
    users[email] = currentUser;
    localStorage.setItem("flaggenquiz-users", JSON.stringify(users));
  } else {
    const user = users[email];
    if (!user || user.passwordHash !== await hashPassword(password)) { authMessage.textContent = "E-Mail oder Passwort ist nicht korrekt."; return; }
    currentUser = user;
  }
  localStorage.setItem("flaggenquiz-current", email);
  level = currentUser.level;
  updateDashboard();
  userChip.classList.remove("hidden");
  loginButton.classList.add("hidden");
  logoutButton.classList.remove("hidden");
  closeModal(authModal);
  startLevel();
});

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  currentUser.passwordHash = await hashPassword(document.querySelector("#new-password").value);
  saveCurrentUser();
  passwordMessage.textContent = "Passwort erfolgreich geändert.";
  window.setTimeout(() => closeModal(passwordModal), 700);
});

restoreSession();
