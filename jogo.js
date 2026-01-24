// 1. POOL de perguntas suficiente (>10)
const questionPool = [
  {
    question: "Em média, quantos gramas de CO₂ por km emite um carro a gasolina?",
    options: ["50g", "80g", "120g", "200g"],
    correct: 2,
    explanation: "Um carro a gasolina emite cerca de 120g de CO₂ por quilómetro percorrido.",
  },
  {
    question: "Qual o meio de transporte que emite ZERO emissões diretas de CO₂?",
    options: ["Carro Híbrido", "Autocarro a Diesel", "Bicicleta", "Carro a Gasolina"],
    correct: 2,
    explanation: "A bicicleta não emite CO₂ e ainda promove a saúde e bem-estar!",
  },
  {
    question: "Qual destas opções reduz mais as emissões de CO₂ em viagens urbanas?",
    options: [
      "Conduzir mais devagar",
      "Usar transporte público",
      "Comprar gasolina premium",
      "Ligar o ar condicionado"
    ],
    correct: 1,
    explanation: "O transporte público pode reduzir emissões em até 95% comparado com carros individuais!",
  },
  {
    question: "Que percentagem de emissões pode reduzir ao partilhar o carro com 3 colegas?",
    options: ["25%", "50%", "75%", "90%"],
    correct: 2,
    explanation: "Partilhar o carro com 3 pessoas reduz as emissões per capita em cerca de 75%!",
  },
  {
    question: "Qual destes hábitos NÃO ajuda a reduzir o consumo de combustível?",
    options: [
      "Manter pneus calibrados",
      "Acelerações bruscas",
      "Manutenção regular",
      "Velocidade constante"
    ],
    correct: 1,
    explanation: "Acelerações bruscas aumentam o consumo de combustível em até 30%.",
  },
  {
    question: "Qual o meio de transporte público mais eficiente em termos de emissões?",
    options: [
      "Autocarro a diesel",
      "Autocarro elétrico",
      "Comboio elétrico",
      "Metro a diesel"
    ],
    correct: 2,
    explanation: "O comboio elétrico é um dos meios mais eficientes, emitindo cerca de 35g CO₂/km.",
  },
  {
    question: "Trabalhar remotamente quantos dias por semana pode reduzir significativamente a pegada de carbono?",
    options: [
      "1 dia",
      "2-3 dias",
      "4 dias",
      "Não faz diferença"
    ],
    correct: 1,
    explanation: "Trabalhar remotamente 2-3 dias por semana elimina uma grande parte das deslocações diárias!",
  },
  {
    question: "Qual o impacto de manter o motor ligado em paragens de trânsito?",
    options: [
      "Economiza combustível",
      "Aumenta consumo desnecessariamente",
      "Melhora o motor",
      "Não tem impacto"
    ],
    correct: 1,
    explanation: "Desligar o motor em paragens longas pode economizar combustível e reduzir emissões.",
  },
  {
    question: "Qual destas afirmações sobre mobilidade sustentável é verdadeira?",
    options: [
      "Só beneficia o ambiente",
      "É mais cara sempre",
      "Beneficia ambiente, saúde e economia",
      "Só funciona em grandes cidades"
    ],
    correct: 2,
    explanation: "A mobilidade sustentável beneficia o ambiente, melhora a saúde pública e pode ser mais económica!",
  },
  {
    question: "Quantas gramas de CO₂ por km emite aproximadamente um comboio elétrico?",
    options: ["10g", "35g", "80g", "120g"],
    correct: 1,
    explanation: "Um comboio elétrico emite cerca de 35g de CO₂ por km.",
  },
  {
    question: "Que combustível tem geralmente maiores emissões de CO₂?",
    options: ["Eletricidade", "Gasolina", "Hidrogênio", "Gás Natural"],
    correct: 1,
    explanation: "Gasolina libera mais CO₂ por km quando comparada com eletricidade ou gás natural.",
  }
];


// 2. Função shuffle que devolve novo array (Fischer-Yates)
function shuffle(arr) { // troca a oredem das pergyuntas
  const temp = [...arr];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}


// 3. Sempre seleciona 10 diferentes por jogo
let questions = [];
let current = 0;
let score = 0;
let answered = false;


// 4. Confetti
function showConfetti() {
  // Biblioteca externa, tipo https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js
  if (window.confetti) {
    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.6 }
    });
  } else {
    // Versão simples estilo emoji fallback
    const node = document.createElement('div');
    node.innerText = "🎉🎉🎉 PARABÉNS! 🎉🎉🎉";
    node.style.cssText = 'position:fixed;top:42%;left:50%;transform:translate(-50%,-50%);font-size:2.5em;z-index:9999;background:white;padding:25px 50px;border-radius:15px;box-shadow:0 0 22px #d6ffea;text-align:center;';
    document.body.appendChild(node);
    setTimeout(()=>node.remove(),1800);
  }
}


// 5. Game render + perguntas variadas a cada tentativa
function updateGame() {
  const triviaDiv = document.getElementById('trivia-game');
  triviaDiv.innerHTML = "";
  if (current >= questions.length) {
    if (score === questions.length * 10) showConfetti();
    triviaDiv.innerHTML = `
      <div class="trivia-end">
        <div class="trivia-pontos-final">Pontuação: ${score} pontos</div>
        <div class="trivia-msg">${getScoreMessage(score, questions.length)}</div>
        <button onclick="startGame()" style="margin-top:15px;padding:13px 32px;border-radius:8px;background:#68c978;color:white;font-size:1.1em;border:none;cursor:pointer;">Jogar Novamente</button>
      </div>
    `;
    return;
  }
  triviaDiv.innerHTML += `
    <div class="trivia-card" id="trivia-card">
      <div class="trivia-score-bar">
        <div>
          <span style="font-weight:500;color:#396524;">Pontuação:</span>
          <span id="pontuacao-atual" style="color:#37a972;font-weight:600;">${score} pontos</span>
        </div>
        <div class="trivia-bar-label">Pergunta ${current + 1} de ${questions.length}</div>
      </div>
      <div class="trivia-bar-bg">
        <div class="trivia-bar-fill" style="width:${((current)/questions.length)*100}%"></div>
      </div>
    </div>
    <div class="trivia-card">
      <div style="font-size:1.15em;font-weight:500;color:#252e2a;margin-bottom:18px;">
        ${questions[current].question}
      </div>
      <div class="trivia-options">
        ${questions[current].options.map(
          (opt, i) => `<button onclick="chooseOption(${i})" id="option-${i}" ${answered ? 'disabled':''}>${opt}</button>`
        ).join('')}
      </div>
      <div id="trivia-explicacao"></div>
      <!-- Âncora para scroll até à zona da explicação/botão -->
      <div id="trivia-bottom-anchor"></div>
    </div>
    <div class="trivia-info">
      Cada resposta correta vale <b>10 pontos</b>. Boa sorte! 
    </div>
  `;
}


function chooseOption(i) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const buttons = document.querySelectorAll(".trivia-options button");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add('correct');
    else if (idx === i) btn.classList.add(idx !== q.correct ? 'wrong':'');
  });

  const explicacao = document.getElementById("trivia-explicacao");
  if (i === q.correct) {
    score += 10;
    explicacao.innerHTML = `<div class="trivia-explanation correct"><b>Correto!</b><br>${q.explanation}</div>`;
  } else {
    explicacao.innerHTML = `<div class="trivia-explanation wrong"><b>Incorreto!</b><br>${q.explanation}</div>`;
  }

  explicacao.innerHTML += `<button id="btn-proxima-pergunta" style="margin-top:10px;padding:9px 28px;border-radius:7px;background:#68c978;color:white;font-size:1em;border:none;cursor:pointer;">${current < questions.length-1 ? 'Próxima Pergunta':'Ver Resultados'}</button>`;

  // SCROLL para a área da explicação / botão
  const bottomAnchor = document.getElementById("trivia-bottom-anchor");
  if (bottomAnchor) {
    bottomAnchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // associar o click do botão à função nextQuestion (depois de o botão existir)
  const btnNext = document.getElementById("btn-proxima-pergunta");
  if (btnNext) {
    btnNext.addEventListener("click", nextQuestion);
  }
}


function nextQuestion() {
  current += 1;
  answered = false;
  updateGame();

  // Depois de carregar a nova pergunta, voltar ao topo do cartão
  const card = document.getElementById("trivia-card");
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


function getScoreMessage(score, total) {
  const percent = Math.round(score/(total*10)*100);
  if (percent === 100) return "Perfeito! És um especialista em mobilidade sustentável!";
  if (percent >= 80) return "Excelente! Tens um ótimo conhecimento sobre o tema!";
  if (percent >= 60) return "Muito bem! Continua a aprender sobre mobilidade sustentável!";
  if (percent >= 40) return "Bom esforço! Há ainda muito para descobrir!";
  return "Continua a explorar! A mobilidade sustentável é importante!";
}





function startGame() {
  // Embaralha pool e seleciona 10 diferentes
  questions = shuffle(questionPool).slice(0, 10); 
  current = 0;
  score = 0;
  answered = false;
  updateGame();
}


// Confetti externo opcional:
(function(){
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
  document.head.appendChild(script);
})();


startGame();
