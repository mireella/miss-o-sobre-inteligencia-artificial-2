// Dados do quiz – 10 perguntas detalhadas
const quizData = [
  {
    question: "Quando você tem um tempo livre num sábado ensolarado, o que costuma fazer?",
    options: [
      { text: "Organizo um mutirão de limpeza no parque", type: "ambiental" },
      { text: "Visito um abrigo para doar tempo e atenção", type: "social" },
      { text: "Procuro um festival ou exposição de arte local", type: "cultural" }
    ]
  },
  {
    question: "Qual notícia mais chama sua atenção ao abrir o jornal?",
    options: [
      { text: "Relatório sobre níveis recordes de poluição", type: "ambiental" },
      { text: "Matéria sobre aumento da fome nas periferias", type: "social" },
      { text: "Entrevista com um artista indígena sobre ancestralidade", type: "cultural" }
    ]
  },
  {
    question: "Se recebesse um financiamento para um projeto comunitário, aplicaria em:",
    options: [
      { text: "Inovação em energia solar para casas populares", type: "ambiental" },
      { text: "Capacitação profissional para jovens em risco", type: "social" },
      { text: "Centro cultural para valorizar saberes tradicionais", type: "cultural" }
    ]
  },
  {
    question: "Qual habilidade você mais gostaria de desenvolver?",
    options: [
      { text: "Cultivo de hortas urbanas e compostagem", type: "ambiental" },
      { text: "Mediação de conflitos e liderança comunitária", type: "social" },
      { text: "Criação de documentários e projetos artísticos", type: "cultural" }
    ]
  },
  {
    question: "Em uma viagem ao exterior, seu roteiro ideal inclui:",
    options: [
      { text: "Visitar reservas naturais protegidas", type: "ambiental" },
      { text: "Conhecer projetos de inclusão social locais", type: "social" },
      { text: "Participar de festas e rituais culturais autênticos", type: "cultural" }
    ]
  },
  {
    question: "Qual destas frases ressoa mais com você?",
    options: [
      { text: "‘A Terra não é herança de nossos pais, é empréstimo de nossos filhos.’", type: "ambiental" },
      { text: "‘Ninguém solta a mão de ninguém.’", type: "social" },
      { text: "‘Sem cultura não há liberdade possível.’", type: "cultural" }
    ]
  },
  {
    question: "Na hora de escolher produtos, você prioriza:",
    options: [
      { text: "Selos de sustentabilidade e baixo carbono", type: "ambiental" },
      { text: "Empresas que valorizam comércio justo", type: "social" },
      { text: "Marcas que apoiam artistas locais", type: "cultural" }
    ]
  },
  {
    question: "Se pudesse propor uma lei amanhã, ela seria para:",
    options: [
      { text: "Reduzir drasticamente plásticos de uso único", type: "ambiental" },
      { text: "Garantir renda básica universal", type: "social" },
      { text: "Destinar 3% do orçamento público à cultura", type: "cultural" }
    ]
  },
  {
    question: "Qual série de documentários você maratonaria?",
    options: [
      { text: "Impactos da crise climática ao redor do mundo", type: "ambiental" },
      { text: "Histórias de superação em comunidades sub-representadas", type: "social" },
      { text: "Viagem pela música e gastronomia de diferentes povos", type: "cultural" }
    ]
  },
  {
    question: "Uma pequena vitória que te deixa feliz no dia a dia é:",
    options: [
      { text: "Encher minha garrafinha e evitar copos descartáveis", type: "ambiental" },
      { text: "Ajudar alguém a atravessar a rua com segurança", type: "social" },
      { text: "Descobrir uma nova banda ou livro independente", type: "cultural" }
    ]
  }
];

let current = 0;
const scores = { ambiental: 0, social: 0, cultural: 0 };

const quizEl = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function updateProgress() {
  const pct = ((current) / quizData.length) * 100;
  progressEl.style.width = pct + "%";
}

function renderQuestion() {
  quizEl.classList.remove("fade");
  void quizEl.offsetWidth; // reinicia animação
  quizEl.classList.add("fade");

  const qData = quizData[current];
  quizEl.innerHTML = `<h2>${qData.question}</h2>`;

  qData.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt.text;
    div.onclick = () => selectOption(opt.type, div);
    quizEl.appendChild(div);
  });

  updateProgress();
}

function selectOption(type, element) {
  // marca visualmente
  [...quizEl.querySelectorAll(".option")].forEach(o => o.classList.remove("selected"));
  element.classList.add("selected");
  nextBtn.classList.remove("hidden");

  nextBtn.onclick = () => {
    scores[type]++;
    current++;
    nextBtn.classList.add("hidden");
    if (current < quizData.length) {
      renderQuestion();
    } else {
      showResult();
    }
  };
}

function showResult() {
  quizEl.classList.add("hidden");
  progressEl.style.width = "100%";
  resultEl.classList.remove("hidden");
  const top = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  const messages = {
    ambiental: "🌱 **Perfil Ambiental** – Você é movido por um forte senso de responsabilidade ecológica e acredita que cada ação pode regenerar o planeta.",
    social: "🤝 **Perfil Social** – Sua empatia guia suas ações. Luta por equidade e justiça, inspirando quem está à sua volta.",
    cultural: "🎭 **Perfil Cultural** – A criatividade e a diversidade são seu combustível. Vê na arte e na memória coletiva ferramentas de transformação."
  };

  resultEl.innerHTML = `<h2>Resultado:</h2><p>${messages[top]}</p>`;
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

// inicia quiz
renderQuestion();
