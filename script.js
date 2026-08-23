const LEVELS_PER_DIFFICULTY = 8;
const MAX_LEVEL = LEVELS_PER_DIFFICULTY * 4;
const QUESTIONS_PER_LEVEL = 8;
const CHALLENGE_QUESTIONS = 20;
const CHALLENGE_OPTIONS = 10;

// Die Reihenfolge bildet die fünf Schwierigkeitsstufen mit je 49 Flaggen ab.
const flagCatalog = [
  ["jp", "Japan"], ["br", "Brasilien"], ["is", "Island"], ["za", "Südafrika"], ["gr", "Griechenland"], ["ma", "Marokko"], ["ca", "Kanada"], ["pt", "Portugal"], ["it", "Italien"], ["de", "Deutschland"], ["fr", "Frankreich"], ["au", "Australien"], ["us", "USA"], ["ch", "Schweiz"], ["kr", "Südkorea"], ["mx", "Mexiko"], ["eg", "Ägypten"], ["no", "Norwegen"], ["es", "Spanien"], ["tr", "Türkei"], ["in", "Indien"], ["ar", "Argentinien"], ["ke", "Kenia"], ["nl", "Niederlande"], ["se", "Schweden"], ["at", "Österreich"], ["dk", "Dänemark"], ["fi", "Finnland"], ["ie", "Irland"], ["nz", "Neuseeland"], ["cn", "China"], ["vn", "Vietnam"], ["th", "Thailand"], ["my", "Malaysia"], ["sg", "Singapur"], ["id", "Indonesien"], ["ph", "Philippinen"], ["co", "Kolumbien"], ["pe", "Peru"], ["uy", "Uruguay"], ["ec", "Ecuador"], ["bo", "Bolivien"], ["py", "Paraguay"], ["cr", "Costa Rica"], ["pa", "Panama"], ["cu", "Kuba"], ["jm", "Jamaika"], ["do", "Dominikanische Republik"], ["ht", "Haiti"],
  ["al", "Albanien"], ["dz", "Algerien"], ["ad", "Andorra"], ["ao", "Angola"], ["ag", "Antigua und Barbuda"], ["am", "Armenien"], ["az", "Aserbaidschan"], ["bs", "Bahamas"], ["bh", "Bahrain"], ["bd", "Bangladesch"], ["bb", "Barbados"], ["by", "Belarus"], ["be", "Belgien"], ["bz", "Belize"], ["bj", "Benin"], ["bt", "Bhutan"], ["ba", "Bosnien und Herzegowina"], ["bw", "Botswana"], ["bn", "Brunei"], ["bg", "Bulgarien"], ["bf", "Burkina Faso"], ["bi", "Burundi"], ["cv", "Kap Verde"], ["kh", "Kambodscha"], ["cm", "Kamerun"], ["cf", "Zentralafrikanische Republik"], ["td", "Tschad"], ["km", "Komoren"], ["cg", "Republik Kongo"], ["cd", "Demokratische Republik Kongo"], ["hr", "Kroatien"], ["cy", "Zypern"], ["cz", "Tschechien"], ["dj", "Dschibuti"], ["dm", "Dominica"], ["sv", "El Salvador"], ["gq", "Äquatorialguinea"], ["er", "Eritrea"], ["ee", "Estland"], ["sz", "Eswatini"], ["et", "Äthiopien"], ["fj", "Fidschi"], ["ga", "Gabun"], ["gm", "Gambia"], ["ge", "Georgien"], ["gh", "Ghana"], ["gd", "Grenada"], ["gt", "Guatemala"], ["gn", "Guinea"],
  ["gw", "Guinea-Bissau"], ["gy", "Guyana"], ["hn", "Honduras"], ["hu", "Ungarn"], ["ir", "Iran"], ["iq", "Irak"], ["il", "Israel"], ["ci", "Elfenbeinküste"], ["jo", "Jordanien"], ["kz", "Kasachstan"], ["kw", "Kuwait"], ["kg", "Kirgisistan"], ["la", "Laos"], ["lv", "Lettland"], ["lb", "Libanon"], ["ls", "Lesotho"], ["lr", "Liberia"], ["ly", "Libyen"], ["li", "Liechtenstein"], ["lt", "Litauen"], ["lu", "Luxemburg"], ["mg", "Madagaskar"], ["mw", "Malawi"], ["mv", "Malediven"], ["ml", "Mali"], ["mt", "Malta"], ["mh", "Marshallinseln"], ["mr", "Mauretanien"], ["mu", "Mauritius"], ["md", "Moldau"], ["mc", "Monaco"], ["mn", "Mongolei"], ["me", "Montenegro"], ["mz", "Mosambik"], ["mm", "Myanmar"], ["na", "Namibia"], ["nr", "Nauru"], ["np", "Nepal"], ["ni", "Nicaragua"], ["ne", "Niger"], ["ng", "Nigeria"], ["mk", "Nordmazedonien"], ["om", "Oman"], ["pk", "Pakistan"], ["pw", "Palau"], ["ps", "Palästina"], ["pg", "Papua-Neuguinea"], ["pl", "Polen"], ["qa", "Katar"], ["ro", "Rumänien"], ["ru", "Russland"], ["rw", "Ruanda"], ["kn", "St. Kitts und Nevis"], ["lc", "St. Lucia"], ["vc", "St. Vincent und die Grenadinen"], ["ws", "Samoa"], ["sm", "San Marino"], ["st", "São Tomé und Príncipe"], ["sa", "Saudi-Arabien"], ["sn", "Senegal"], ["rs", "Serbien"], ["sl", "Sierra Leone"], ["sk", "Slowakei"], ["si", "Slowenien"], ["sb", "Salomonen"], ["so", "Somalia"], ["lk", "Sri Lanka"], ["sd", "Sudan"], ["sr", "Suriname"], ["sy", "Syrien"], ["tj", "Tadschikistan"], ["tz", "Tansania"], ["tl", "Osttimor"], ["tg", "Togo"], ["to", "Tonga"], ["tn", "Tunesien"], ["tm", "Turkmenistan"], ["tv", "Tuvalu"], ["ug", "Uganda"], ["ua", "Ukraine"], ["ae", "Vereinigte Arabische Emirate"], ["gb", "Vereinigtes Königreich"], ["uz", "Usbekistan"], ["vu", "Vanuatu"], ["va", "Vatikanstadt"], ["ve", "Venezuela"], ["ye", "Jemen"], ["zm", "Sambia"], ["zw", "Simbabwe"], ["xk", "Kosovo"], ["ax", "Åland"], ["as", "Amerikanisch-Samoa"], ["ai", "Anguilla"], ["aq", "Antarktis"], ["aw", "Aruba"], ["bm", "Bermuda"], ["bq", "Bonaire, Sint Eustatius und Saba"], ["vg", "Britische Jungferninseln"], ["ky", "Kaimaninseln"], ["cx", "Weihnachtsinsel"], ["cc", "Kokosinseln"], ["ck", "Cookinseln"], ["cw", "Curaçao"], ["fk", "Falklandinseln"], ["fo", "Färöer"], ["gf", "Französisch-Guayana"], ["pf", "Französisch-Polynesien"], ["gi", "Gibraltar"], ["gl", "Grönland"], ["gu", "Guam"], ["gg", "Guernsey"], ["hk", "Hongkong"], ["im", "Isle of Man"], ["je", "Jersey"], ["mo", "Macau"], ["mq", "Martinique"], ["ms", "Montserrat"], ["nc", "Neukaledonien"], ["nu", "Niue"], ["nf", "Norfolkinsel"], ["mp", "Nördliche Marianen"], ["pn", "Pitcairninseln"], ["pr", "Puerto Rico"], ["re", "Réunion"], ["sh", "St. Helena"], ["mf", "Saint-Martin"], ["pm", "Saint-Pierre und Miquelon"], ["sx", "Sint Maarten"], ["sj", "Spitzbergen und Jan Mayen"], ["tw", "Taiwan"], ["tk", "Tokelau"], ["tc", "Turks- und Caicosinseln"], ["vi", "Amerikanische Jungferninseln"], ["wf", "Wallis und Futuna"], ["eh", "Westsahara"], ["yt", "Mayotte"], ["um", "United States Minor Outlying Islands"], ["bv", "Bouvetinsel"], ["io", "Britisches Territorium im Indischen Ozean"], ["bl", "Saint-Barthélemy"], ["gp", "Guadeloupe"], ["tf", "Französische Süd- und Antarktisgebiete"], ["hm", "Heard und McDonaldinseln"], ["ki", "Kiribati"], ["gs", "Südgeorgien und die Südlichen Sandwichinseln"], ["ta", "Tristan da Cunha"], ["dg", "Diego Garcia"]
].map(([code, country]) => ({ code, country }));

const recognitionOrder = [
  "be", "bg", "hr", "cz", "ge", "gh", "gt", "hu", "al", "dz", "ad", "ao", "ag", "am", "az", "bs", "bh", "bd", "bb", "by", "bz", "bj", "bt", "ba", "bw", "bn", "bf", "bi", "cv", "kh", "cm", "cf", "td", "km", "cg", "cd", "cy", "dj", "dm", "sv", "gq", "er", "ee", "sz", "et", "fj", "ga", "gm", "gd", "gn", "gw", "gy", "hn", "ir", "iq", "il", "ci", "jo", "kz", "kw", "kg", "la", "lv", "lb", "ls", "lr", "ly", "li", "lt", "lu", "mg", "mw", "mv", "ml", "mt", "mh", "mr", "mu", "md", "mc", "mn", "me", "mz", "mm", "na", "nr", "np", "ni", "ne", "ng", "mk", "om", "pk", "pw", "ps", "pg", "pl", "qa", "ro", "ru", "rw", "kn", "lc", "vc", "ws", "sm", "st", "sa", "sn", "rs", "sl", "sk", "si", "sb", "so", "lk", "sd", "sr", "sy", "tj", "tz", "tl", "tg", "to", "tn", "tm", "tv", "ug", "ua", "ae", "gb", "uz", "vu", "va", "ve", "ye", "zm", "zw", "xk", "ax", "as", "ai", "aq", "aw", "bm", "bq", "vg", "ky", "cx", "cc", "ck", "cw", "fk", "fo", "gf", "pf", "gi", "gl", "gu", "gg", "hk", "im", "je", "mo", "mq", "ms", "nc", "nu", "nf", "mp", "pn", "pr", "re", "sh", "mf", "pm", "sx", "sj", "tw", "tk", "tc", "vi", "wf", "eh", "yt", "um", "bv", "io", "bl", "gp", "tf", "hm", "ki", "gs", "ta", "dg"
];
const recognitionRank = new Map(recognitionOrder.map((code, index) => [code, index]));
const sortedDifficultyGroup = (group) => [...group].sort((first, second) => {
  const firstRank = recognitionRank.get(first.code) ?? Number.MAX_SAFE_INTEGER;
  const secondRank = recognitionRank.get(second.code) ?? Number.MAX_SAFE_INTEGER;
  if (firstRank !== secondRank) return firstRank - secondRank;
  return first.country.length - second.country.length;
});
const challengeCatalog = flagCatalog.slice(49).sort((first, second) => (recognitionRank.get(first.code) ?? Number.MAX_SAFE_INTEGER) - (recognitionRank.get(second.code) ?? Number.MAX_SAFE_INTEGER));
const orderedFlagCatalog = [
  ...flagCatalog.slice(0, 49),
  ...Array.from({ length: 4 }, (_, groupIndex) => sortedDifficultyGroup(challengeCatalog.slice(groupIndex * 49, (groupIndex + 1) * 49))).flat()
];

const completeFlagCatalog = [...flagCatalog, ...[
  ["af", "Afghanistan"], ["cl", "Chile"], ["kp", "Nordkorea"], ["ss", "Südsudan"], ["tt", "Trinidad und Tobago"], ["fm", "Mikronesien"], ["gb-eng", "England"], ["gb-sct", "Schottland"], ["gb-wls", "Wales"], ["gb-nir", "Nordirland"], ["sh-ta", "Tristan da Cunha"]
].map(([code, country]) => ({ code, country }))];
const difficultyCatalog = [
  completeFlagCatalog.slice(0, 49).concat(completeFlagCatalog.slice(49, 64)),
  completeFlagCatalog.slice(64, 98).concat(completeFlagCatalog.slice(98, 128)),
  completeFlagCatalog.slice(128, 147).concat(completeFlagCatalog.slice(147, 192)),
  completeFlagCatalog.slice(192, 256)
];
const difficultyFlagGroups = difficultyCatalog.map((group) => group.slice(0, 64));

const flagImage = document.querySelector("#flag-image");
const answersElement = document.querySelector("#answers");
const scoreElement = document.querySelector("#score");
const scoreLabel = document.querySelector("#score-label");
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
const nextLevelButton = document.querySelector("#next-level-button");
const retryLevelButton = document.querySelector("#retry-level-button");
const difficultyElement = document.querySelector(".stage-label");
const challengeTimer = document.querySelector("#challenge-timer");

let level = 1;
let questionIndex = 0;
let levelFailed = false;
let answered = false;
let levelQuestions = [];
let currentUser = null;
let practiceMode = false;
let challengeMode = false;
let challengeQuestions = [];
let challengeCorrect = 0;
let challengeQuestionIndex = 0;
let challengeStartedAt = 0;
let challengeTimerId = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startLevel() {
  challengeMode = false;
  clearChallengeTimer();
  quizView.classList.remove("challenge-active");
  challengeTimer.classList.add("hidden");
  scoreLabel.textContent = "Level";
  const difficultyIndex = Math.floor((level - 1) / LEVELS_PER_DIFFICULTY);
  const levelIndex = (level - 1) % LEVELS_PER_DIFFICULTY;
  const difficultyFlags = difficultyFlagGroups[difficultyIndex];
  const levelFlags = shuffle(difficultyFlags).slice(levelIndex * QUESTIONS_PER_LEVEL, (levelIndex + 1) * QUESTIONS_PER_LEVEL);
  if (difficultyIndex >= 2) levelFlags[1 + Math.floor(Math.random() * (levelFlags.length - 1))] = levelFlags[0];
  levelQuestions = levelFlags.map((question, index) => ({
    ...question,
    options: getOptions(question, levelFlags, index)
  }));
  questionIndex = 0;
  levelFailed = false;
  renderQuestion();
}

function getOptions(question, levelFlags, questionIndex) {
  const levelOptions = levelFlags.filter((flag, index) => index !== questionIndex && flag.code !== question.code);
  const distractors = shuffle(levelOptions)
    .slice(0, Math.min(3, levelOptions.length))
    .map((flag) => flag.country);
  return shuffle([question.country, ...distractors]);
}

function startChallenge() {
  challengeMode = true;
  practiceMode = false;
  challengeQuestions = shuffle(orderedFlagCatalog).slice(0, CHALLENGE_QUESTIONS).map((question) => ({
    ...question,
    options: [question.country, ...shuffle(orderedFlagCatalog.filter((flag) => flag.code !== question.code)).slice(0, CHALLENGE_OPTIONS - 1).map((flag) => flag.country)]
      .sort((first, second) => first.localeCompare(second, "de"))
  }));
  challengeCorrect = 0;
  challengeQuestionIndex = 0;
  challengeStartedAt = Date.now();
  clearChallengeTimer();
  challengeTimerId = window.setInterval(updateChallengeTimer, 250);
  resultView.classList.add("hidden");
  dashboard.classList.add("hidden");
  quizView.classList.remove("hidden", "challenge-active");
  quizView.classList.add("challenge-active");
  renderChallengeQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateChallengeTimer() {
  const elapsedSeconds = Math.floor((Date.now() - challengeStartedAt) / 1000);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");
  challengeTimer.textContent = `${minutes}:${seconds}`;
}

function clearChallengeTimer() {
  if (challengeTimerId) window.clearInterval(challengeTimerId);
  challengeTimerId = null;
}

function renderChallengeQuestion() {
  const question = challengeQuestions[challengeQuestionIndex];
  answered = false;
  flagImage.src = `https://flagcdn.com/w640/${question.code}.png`;
  flagImage.alt = "Flagge ohne Länderhinweis";
  questionCount.textContent = `Frage ${String(challengeQuestionIndex + 1).padStart(2, "0")} / ${CHALLENGE_QUESTIONS}`;
  progressBar.style.width = `${((challengeQuestionIndex + 1) / CHALLENGE_QUESTIONS) * 100}%`;
  levelCount.textContent = "Challenge · 20 Fragen";
  scoreLabel.textContent = "Richtig";
  scoreElement.textContent = String(challengeCorrect).padStart(2, "0");
  difficultyElement.textContent = "Auf Zeit";
  challengeTimer.classList.remove("hidden");
  updateChallengeTimer();
  answersElement.innerHTML = question.options.map((option, index) => `
    <button class="answer-button" type="button" data-answer="${option}">
      <span class="answer-number">${index === 9 ? "0" : index + 1}</span>
      <span class="answer-text">${option}</span>
      <span class="answer-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");
  answersElement.querySelectorAll(".answer-button").forEach((button) => button.addEventListener("click", () => chooseAnswer(button)));
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
  return ["Einfach", "Mittel", "Schwer", "Sehr schwer"][Math.floor((currentLevel - 1) / LEVELS_PER_DIFFICULTY)];
}

function chooseAnswer(button) {
  if (answered) return;
  answered = true;
  if (challengeMode) {
    const question = challengeQuestions[challengeQuestionIndex];
    if (button.dataset.answer === question.country) challengeCorrect += 1;
    answersElement.querySelectorAll(".answer-button").forEach((item) => { item.disabled = true; });
    window.setTimeout(nextChallengeQuestion, 180);
    return;
  }
  const question = levelQuestions[questionIndex];
  if (button.dataset.answer !== question.country) levelFailed = true;
  answersElement.querySelectorAll(".answer-button").forEach((item) => { item.disabled = true; });
  window.setTimeout(nextQuestion, 280);
}

function nextChallengeQuestion() {
  if (challengeQuestionIndex === CHALLENGE_QUESTIONS - 1) {
    showChallengeResult();
    return;
  }
  challengeQuestionIndex += 1;
  renderChallengeQuestion();
}

function showChallengeResult() {
  clearChallengeTimer();
  const elapsedSeconds = Math.max(1, Math.floor((Date.now() - challengeStartedAt) / 1000));
  const timePoints = Math.max(0, 120 - elapsedSeconds);
  const challengePoints = timePoints * challengeCorrect;
  if (currentUser) {
    const previousBest = currentUser.challengeBest || 0;
    if (challengePoints > previousBest) {
      currentUser.challengeBest = challengePoints;
      currentUser.challengeCorrect = challengeCorrect;
      currentUser.challengeTime = elapsedSeconds;
    }
    currentUser.challengeAttempts = (currentUser.challengeAttempts || 0) + 1;
    saveCurrentUser();
    updateDashboard(false);
  }
  quizView.classList.add("hidden");
  quizView.classList.remove("challenge-active");
  resultView.classList.remove("hidden");
  resultEyebrow.textContent = "Challenge beendet";
  resultTitle.innerHTML = `${challengeCorrect} von ${CHALLENGE_QUESTIONS}<br><em>richtig beantwortet.</em>`;
  finalScore.textContent = challengePoints;
  resultDetail.textContent = `${formatTime(elapsedSeconds)} · ${challengeCorrect}/${CHALLENGE_QUESTIONS} richtig`;
  resultMessage.textContent = "Dein bestes Challenge-Ergebnis wird in der Rangliste angezeigt.";
  nextLevelButton.classList.add("hidden");
  retryLevelButton.classList.remove("hidden");
  retryLevelButton.textContent = "Challenge noch einmal spielen ↗";
  restartButton.textContent = "Zum Profil gehen ↗";
}

function formatTime(totalSeconds) {
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")} : ${String(totalSeconds % 60).padStart(2, "0")}`;
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
  resultDetail.textContent = passed ? `/ ${MAX_LEVEL} Level` : "· 8 neue Flaggen";
  resultMessage.textContent = passed
    ? "Alle acht Antworten waren richtig."
    : "Für den Aufstieg müssen alle acht Antworten richtig sein.";
  if (currentUser && !practiceMode) {
    currentUser.rounds += 1;
    if (passed) currentUser.highscore = Math.max(currentUser.highscore, level);
    currentUser.level = passed ? Math.min(MAX_LEVEL, level + 1) : level;
    saveCurrentUser();
    updateDashboard(false);
  }
  restartButton.textContent = practiceMode ? "Zurück zum Profil ↗" : "Zum Profil gehen ↗";
  nextLevelButton.classList.toggle("hidden", practiceMode || !passed || level >= MAX_LEVEL);
  retryLevelButton.classList.toggle("hidden", challengeMode);
  retryLevelButton.textContent = "Level noch einmal spielen ↗";
}

nextLevelButton.addEventListener("click", () => {
  practiceMode = false;
  level = Math.min(MAX_LEVEL, level + 1);
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  startLevel();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

retryLevelButton.addEventListener("click", () => {
  if (challengeMode) {
    startChallenge();
    return;
  }
  levelFailed = false;
  answered = false;
  resultView.classList.add("hidden");
  quizView.classList.remove("hidden");
  startLevel();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

restartButton.addEventListener("click", () => {
  if (practiceMode) {
    practiceMode = false;
    resultView.classList.add("hidden");
    quizView.classList.add("hidden");
    dashboard.classList.remove("hidden");
    updateDashboard();
    return;
  }
  resultView.classList.add("hidden");
  quizView.classList.add("hidden");
  dashboard.classList.remove("hidden");
  updateDashboard();
});
document.addEventListener("keydown", (event) => {
  if (answered || quizView.classList.contains("hidden")) return;
  if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) return;
  const index = event.key === "0" ? 9 : Number(event.key) - 1;
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
const practiceLevels = document.querySelector("#practice-levels");
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

function updateDashboard(show = true) {
  if (!currentUser) return;
  userChip.textContent = currentUser.name;
  profileName.textContent = currentUser.name;
  profileProgress.textContent = `Level ${String(currentUser.level).padStart(2, "0")}`;
  profileScore.textContent = currentUser.highscore;
  profileRounds.textContent = currentUser.rounds;
  dashboard.classList.toggle("hidden", !show);
  renderPracticeLevels();
  renderLeaderboard();
}

function renderPracticeLevels() {
  const completedLevels = Math.min(MAX_LEVEL, Math.max(0, currentUser.level - 1));
  practiceLevels.innerHTML = completedLevels
    ? Array.from({ length: completedLevels }, (_, index) => `<button class="practice-level" type="button" data-level="${index + 1}">Level ${String(index + 1).padStart(2, "0")} <span>↗</span></button>`).join("")
    : `<p class="empty-state">Schließe dein erstes Level ab, um es hier üben zu können.</p>`;
  practiceLevels.querySelectorAll(".practice-level").forEach((button) => button.addEventListener("click", () => startPractice(Number(button.dataset.level))));
}

function startPractice(practiceLevel) {
  practiceMode = true;
  level = practiceLevel;
  levelFailed = false;
  answered = false;
  resultView.classList.add("hidden");
  dashboard.classList.add("hidden");
  quizView.classList.remove("hidden");
  startLevel();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLeaderboard() {
  const entries = Object.values(getUsers()).filter((entry) => entry.challengeAttempts > 0).sort((first, second) => second.challengeBest - first.challengeBest).slice(0, 10);
  leaderboard.innerHTML = entries.length ? entries.map((entry, index) => `
    <div class="leader-row"><span class="leader-rank">${String(index + 1).padStart(2, "0")}</span><strong>${entry.name}</strong><span>${entry.challengeCorrect || 0}/${CHALLENGE_QUESTIONS} · ${formatTime(entry.challengeTime || 0)}</span><b>${entry.challengeBest} Punkte</b></div>
  `).join("") : `<p class="empty-state">Noch niemand hat eine Challenge gespielt.</p>`;
}

function restoreSession() {
  const email = localStorage.getItem("flaggenquiz-current");
  const user = email ? getUsers()[email] : null;
  if (!user) return;
  currentUser = user;
  level = Math.min(MAX_LEVEL, Math.max(1, user.level));
  startLevel();
  updateDashboard();
  userChip.classList.remove("hidden");
  loginButton.classList.add("hidden");
  logoutButton.classList.remove("hidden");
}

document.querySelectorAll(".auth-tab").forEach((tab) => tab.addEventListener("click", () => setAuthMode(tab.dataset.authView)));
loginButton.addEventListener("click", () => { setAuthMode("login"); openModal(authModal); });
logoutButton.addEventListener("click", () => {
  currentUser = null;
  practiceMode = false;
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
document.querySelector("#challenge-button").addEventListener("click", () => {
  startChallenge();
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#auth-email").value.trim().toLowerCase();
  const password = document.querySelector("#auth-password").value;
  const users = getUsers();
  if (authMode === "register") {
    const name = nameInput.value.trim();
    if (users[email]) { authMessage.textContent = "Diese E-Mail ist bereits registriert."; return; }
    currentUser = { email, name, passwordHash: await hashPassword(password), level: 1, highscore: 0, rounds: 0, challengeBest: 0, challengeAttempts: 0, challengeCorrect: 0, challengeTime: 0 };
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
