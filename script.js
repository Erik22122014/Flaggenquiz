const questions = [
  { code: "jp", country: "Japan", options: ["Japan", "Südkorea", "Vietnam", "China"] },
  { code: "br", country: "Brasilien", options: ["Brasilien", "Kolumbien", "Mexiko", "Argentinien"] },
  { code: "is", country: "Island", options: ["Norwegen", "Island", "Finnland", "Schweden"] },
  { code: "za", country: "Südafrika", options: ["Kenia", "Ghana", "Südafrika", "Namibia"] },
  { code: "gr", country: "Griechenland", options: ["Griechenland", "Uruguay", "Israel", "Kuba"] },
  { code: "ma", country: "Marokko", options: ["Tunesien", "Marokko", "Türkei", "Albanien"] },
  { code: "ca", country: "Kanada", options: ["Kanada", "Peru", "Österreich", "Dänemark"] },
  { code: "bt", country: "Bhutan", options: ["Bhutan", "Myanmar", "Sri Lanka", "Nepal"] },
  { code: "pt", country: "Portugal", options: ["Italien", "Portugal", "Irland", "Ungarn"] },
  { code: "sc", country: "Seychellen", options: ["Seychellen", "Mauritius", "Madagaskar", "Bahamas"] }
];

const flagImage = document.querySelector("#flag-image");
const answersElement = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const questionCount = document.querySelector("#question-count");
const progressBar = document.querySelector("#progress-bar");
const streakElement = document.querySelector("#streak");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const finalScore = document.querySelector("#final-score");
const resultMessage = document.querySelector("#result-message");

let questionIndex = 0;
let score = 0;
let streak = 0;
let answered = false;

function renderQuestion() {
  const question = questions[questionIndex];
  answered = false;
  flagImage.src = `https://flagcdn.com/w640/${question.code}.png`;
  flagImage.alt = `Flagge von ${question.country}`;
  questionCount.textContent = `Frage ${String(questionIndex + 1).padStart(2, "0")} / ${questions.length}`;
  progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  streakElement.textContent = `${streak}er Serie`;
  feedback.textContent = "";
  feedback.className = "feedback";
  answersElement.innerHTML = question.options.map((option, index) => `
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
  const question = questions[questionIndex];
  const isCorrect = button.dataset.answer === question.country;
  const allButtons = answersElement.querySelectorAll(".answer-button");
  allButtons.forEach((item) => { item.disabled = true; });
  if (isCorrect) {
    score += 1;
    streak += 1;
    button.classList.add("correct");
    feedback.textContent = `Richtig! Das ist die Flagge von ${question.country}.`;
    feedback.classList.add("good");
  } else {
    streak = 0;
    button.classList.add("wrong");
    allButtons.forEach((item) => { if (item.dataset.answer === question.country) item.classList.add("correct"); });
    feedback.textContent = `Fast. Die richtige Antwort ist ${question.country}.`;
    feedback.classList.add("bad");
  }
  scoreElement.textContent = String(score).padStart(2, "0");
  streakElement.textContent = `${streak}er Serie`;
  window.setTimeout(nextQuestion, 1050);
}

function nextQuestion() {
  if (questionIndex === questions.length - 1) {
    showResults();
    return;
  }
  questionIndex += 1;
  renderQuestion();
}

function showResults() {
  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
  finalScore.textContent = score;
  resultMessage.textContent = score === questions.length
    ? "Perfekt. Deine Weltkarte sitzt."
    : score >= 7
      ? "Sehr stark. Du hast ein gutes Auge für Flaggen."
      : "Gute Runde. Noch ein Durchlauf und du knackst die nächste Stufe.";
}

document.querySelector("#skip-button").addEventListener("click", () => {
  if (!answered) { streak = 0; nextQuestion(); }
});
document.querySelector("#restart-button").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  streak = 0;
  scoreElement.textContent = "00";
  quizView.classList.remove("hidden");
  resultView.classList.add("hidden");
  renderQuestion();
});
document.addEventListener("keydown", (event) => {
  if (answered || quizView.classList.contains("hidden")) return;
  const index = Number(event.key) - 1;
  const button = answersElement.querySelectorAll(".answer-button")[index];
  if (button) chooseAnswer(button);
});

renderQuestion();
