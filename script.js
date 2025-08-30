const quizData = [
  {
    question: "Qual é a cor favorita dela?",
    options: ["Roxo", "Azul", "Verde", "Preto"],
    answer: "Preto"
  },
  {
    question: "Qual é o lanche que ela mais gosta?",
    options: ["Pizza", "Creme de Galinha", "Coxinha", "Pastel"],
    answer: "Creme de Galinha"
  },
  {
    question: "Qual dessas palavras mais combina com ela?",
    options: ["Criativa", "Divertida", "Chata", "Sentimental"],
    answer: "Sentimental"
  },
  {
    question: "Qual o estilo de música que ela mais curte?",
    options: ["Pop", "Rock", "Reggae", "Funk"],
    answer: "Reggae"
  },
  {
    question: "Complete a frase: 'Ela é _____'",
    options: ["Incrível", "Chata", "Linda", "Todas as opções"],
    answer: "Todas as opções"
  }
];

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function loadQuiz() {
  quizContainer.innerHTML = "";
  const questionData = quizData[currentQuestion];
  
  const questionEl = document.createElement("h2");
  questionEl.textContent = questionData.question;
  quizContainer.appendChild(questionEl);
  
  questionData.options.forEach(option => {
    const optionEl = document.createElement("div");
    optionEl.textContent = option;
    optionEl.classList.add("option");
    optionEl.addEventListener("click", () => selectOption(optionEl, option));
    quizContainer.appendChild(optionEl);
  });
}

function selectOption(element, option) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedOption = option;
}

nextBtn.addEventListener("click", () => {
  if (!selectedOption) {
    alert("Escolha uma opção antes de continuar!");
    return;
  }

  const correctAnswer = quizData[currentQuestion].answer;
  const feedback = document.createElement("p");

  if (selectedOption === correctAnswer) {
    score++;
    feedback.textContent = "✔️ Certo! Você arrasou nessa!";
    feedback.style.color = "lightgreen";
  } else {
    feedback.textContent = `❌ Ops! A resposta certa era: ${correctAnswer}`;
    feedback.style.color = "salmon";
  }

  quizContainer.appendChild(feedback);

  // Espera 1s antes de ir para a próxima questão
  setTimeout(() => {
    currentQuestion++;
    selectedOption = null;

    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }, 1000);
});

function showResult() {
  quizContainer.innerHTML = "";
  nextBtn.style.display = "none";

  let message = "";
  if (score === quizData.length) {
    message = "Perfeito! Você merece um prêmio só por se conhecer tão bem kk 💜🥰. Espero que tenha gostado dessas surpresas pré-aniversário Best, responda essa mensagem até amanhã se não quiser que eu poste uma mensagem carinhosa de feliz aniversário. kk";
  } else {
    message = "Não, aí vacilou, errou questões sobre si mesma ainda, assim como falaria Jorge Fernando: Decepção 😞✨. Espero que tenha gostado dessas surpresas pré-aniversário Best, responda essa mensagem até amanhã se não quiser que eu poste uma mensagem carinhosa de feliz aniversário. kk";
  } 

  resultContainer.innerHTML = `
    <h2>Você acertou ${score} de ${quizData.length} perguntas! 🎉</h2>
    <p>${message}</p>
  `;
}

loadQuiz();
