const quizData = [
  {
    question: "Você prefere participar de:",
    options: [
      { text: "Campanhas de reciclagem", type: "ambiental" },
      { text: "Projetos sociais com comunidades", type: "social" },
      { text: "Eventos culturais e artísticos", type: "cultural" }
    ]
  },
  {
    question: "Você se preocupa mais com:",
    options: [
      { text: "Mudanças climáticas", type: "ambiental" },
      { text: "Desigualdade social", type: "social" },
      { text: "Preservação de tradições locais", type: "cultural" }
    ]
  },
  {
    question: "Qual dessas atitudes você considera mais importante?",
    options: [
      { text: "Economizar água e energia", type: "ambiental" },
      { text: "Ajudar pessoas em situação de vulnerabilidade", type: "social" },
      { text: "Valorizar a diversidade cultural", type: "cultural" }
    ]
  },
  {
    question: "Em um projeto de escola, você gostaria de trabalhar com:",
    options: [
      { text: "Soluções para o lixo urbano", type: "ambiental" },
      { text: "Campanhas contra o preconceito", type: "social" },
      { text: "Divulgação da arte popular", type: "cultural" }
    ]
  },
  {
    question: "Você se identifica mais com:",
    options: [
      { text: "Ativistas ambientais", type: "ambiental" },
      { text: "Lideranças comunitárias", type: "social" },
      { text: "Artistas e educadores culturais", type: "cultural" }
    ]
  }
];

let currentQuestion = 0;
let scores = { ambiental: 0, social: 0, cultural: 0 };

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

function showQuestion() {
  const questionData = quizData[currentQuestion];
  quizContainer.innerHTML = `<h2>${questionData.question}</h2>`;
  questionData.options.forEach(option => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = option.text;
    div.addEventListener("click", () => selectOption(option.type));
    quizContainer.appendChild(div);
  });
}

function selectOption(type) {
  scores[type]++;
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const maxType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let message = "";
  if (maxType === "ambiental") {
    message = "🌱 Você tem um perfil **Ambiental**! Está sempre atento ao planeta, busca soluções sustentáveis e se preocupa com o futuro ecológico.";
  } else if (maxType === "social") {
    message = "🤝 Você tem um perfil **Social**! Engajado com causas humanas, você busca igualdade, justiça e inclusão.";
  } else {
    message = "🎭 Você tem um perfil **Cultural**! Valoriza as artes, a história, a diversidade e as expressões culturais em todas as formas.";
  }

  resultContainer.innerHTML = `<h2>Resultado:</h2><p>${message}</p>`;
}

showQuestion();
