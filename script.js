const MAX_LEVEL = 25;
const QUESTIONS_PER_LEVEL = 7;

const veryEasyQuestions = [
  { code: "jp", country: "Japan", options: ["Japan", "Südkorea", "Vietnam", "China"] },
  { code: "br", country: "Brasilien", options: ["Brasilien", "Kolumbien", "Mexiko", "Argentinien"] },
  { code: "is", country: "Island", options: ["Norwegen", "Island", "Finnland", "Schweden"] },
  { code: "za", country: "Südafrika", options: ["Kenia", "Ghana", "Südafrika", "Namibia"] },
  { code: "gr", country: "Griechenland", options: ["Griechenland", "Uruguay", "Israel", "Kuba"] },
  { code: "ma", country: "Marokko", options: ["Tunesien", "Marokko", "Türkei", "Albanien"] },
  { code: "ca", country: "Kanada", options: ["Kanada", "Peru", "Österreich", "Dänemark"] },
  { code: "pt", country: "Portugal", options: ["Italien", "Portugal", "Irland", "Ungarn"] },
  { code: "it", country: "Italien", options: ["Italien", "Frankreich", "Irland", "Mexiko"] },
  { code: "de", country: "Deutschland", options: ["Belgien", "Deutschland", "Rumänien", "Ungarn"] },
  { code: "fr", country: "Frankreich", options: ["Frankreich", "Italien", "Niederlande", "Russland"] },
  { code: "au", country: "Australien", options: ["Neuseeland", "Australien", "Fidschi", "Samoa"] },
  { code: "us", country: "USA", options: ["USA", "Liberia", "Malaysia", "Großbritannien"] },
  { code: "ch", country: "Schweiz", options: ["Dänemark", "Schweiz", "Tonga", "Georgien"] }
];

const easyQuestions = [
  { code: "bt", country: "Bhutan", options: ["Bhutan", "Myanmar", "Sri Lanka", "Nepal"] },
  { code: "sc", country: "Seychellen", options: ["Seychellen", "Mauritius", "Madagaskar", "Bahamas"] },
  { code: "kr", country: "Südkorea", options: ["Japan", "Südkorea", "Laos", "Mongolei"] },
  { code: "mx", country: "Mexiko", options: ["Mexiko", "Italien", "Peru", "Portugal"] },
  { code: "eg", country: "Ägypten", options: ["Ägypten", "Syrien", "Irak", "Jemen"] },
  { code: "no", country: "Norwegen", options: ["Norwegen", "Island", "Färöer", "Finnland"] },
  { code: "es", country: "Spanien", options: ["Spanien", "Andorra", "Rumänien", "Litauen"] },
  { code: "tr", country: "Türkei", options: ["Tunesien", "Türkei", "Pakistan", "Algerien"] },
  { code: "in", country: "Indien", options: ["Indien", "Niger", "Irland", "Elfenbeinküste"] },
  { code: "ar", country: "Argentinien", options: ["Uruguay", "Argentinien", "Honduras", "El Salvador"] },
  { code: "ke", country: "Kenia", options: ["Kenia", "Botswana", "Simbabwe", "Tansania"] },
  { code: "nl", country: "Niederlande", options: ["Luxemburg", "Niederlande", "Kroatien", "Slowenien"] },
  { code: "se", country: "Schweden", options: ["Schweden", "Finnland", "Norwegen", "Island"] },
  { code: "at", country: "Österreich", options: ["Österreich", "Lettland", "Polen", "Monaco"] }
];

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

let level = 1;
let questionIndex = 0;
let levelFailed = false;
let answered = false;
let levelQuestions = [];

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startLevel() {
  const pool = level <= 15 ? veryEasyQuestions : easyQuestions;
  levelQuestions = shuffle(pool).slice(0, QUESTIONS_PER_LEVEL);
  questionIndex = 0;
  levelFailed = false;
  renderQuestion();
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
  answersElement.innerHTML = shuffle(question.options).map((option, index) => `
    <button class="answer-button" type="button" data-answer="${option}">
      <span class="answer-number">0${index + 1}</span>
      <span class="answer-text">${option}</span>
      <span class="answer-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");
  answersElement.querySelectorAll(".answer-button").forEach((button) => button.addEventListener("click", () => chooseAnswer(button)));
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
  resultDetail.textContent = passed ? `/ ${MAX_LEVEL} Level` : "· 7 neue Fragen";
  resultMessage.textContent = passed
    ? "Alle sieben Antworten waren richtig."
    : "Für den Aufstieg müssen alle sieben Antworten richtig sein.";
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
