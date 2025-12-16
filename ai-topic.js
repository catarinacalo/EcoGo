// "Gerador" simples de cards de mobilidade sustentável

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("ai-topics-grid");
  const btnMore = document.getElementById("btn-more-topics");

  if (!grid || !btnMore) return;

  const tags = [
    { label: "Transporte Público", icon: "🚌" },
    { label: "Bicicleta", icon: "🚴" },
    { label: "Cidades Inteligentes", icon: "🏙️" },
    { label: "Carro Elétrico", icon: "⚡" },
    { label: "Partilha", icon: "🤝" },
    { label: "Planeamento", icon: "🧭" },
  ];

  const titulos = [
    "Substituir viagens curtas de carro por bicicleta",
    "Criar corredores de autocarro dedicados",
    "Implementar zonas de baixas emissões no centro",
    "Incentivar estacionamento periférico com shuttle",
    "Ligar ciclovias a estações de comboio",
    "Adotar frotas municipais elétricas",
    "Criar apps de boleia entre colegas de trabalho",
    "Requalificar ruas para prioridade pedonal",
    "Usar dados de tráfego para otimizar semáforos",
    "Tarifas integradas entre autocarro e comboio",
    "Instalar parkings seguros para bicicletas",
    "Promover teletrabalho alguns dias por semana",
  ];

  const descricoes = [
    "Reduz emissões, melhora a saúde e diminui o congestionamento urbano.",
    "Aumenta a velocidade média do transporte público e torna-o mais competitivo.",
    "Limita veículos mais poluentes em zonas sensíveis, melhorando a qualidade do ar.",
    "Diminui o tráfego dentro da cidade e mantém a acessibilidade ao centro.",
    "Facilita a combinação bicicleta + comboio em viagens diárias.",
    "Reduz custos operacionais e emissões na prestação de serviços públicos.",
    "Diminui o número de carros na estrada e reparte custos de deslocação.",
    "Cria espaços mais seguros e agradáveis para caminhar e conviver.",
    "Evita paragens desnecessárias e reduz o consumo de combustível.",
    "Torna a mudança de linha ou modo de transporte mais simples para o utilizador.",
    "Dá confiança às pessoas para deixarem a bicicleta na estação.",
    "Evita deslocações desnecessárias e picos de tráfego nas horas de ponta.",
  ];

  const impactos = [
    "Redução alta de CO₂",
    "Impacto moderado",
    "Mudança estrutural",
    "Baixo custo, alto benefício",
    "Requer coordenação entre entidades",
  ];

  let cardCount = 0;

  function gerarCard() {
    // escolhe elementos pseudo-aleatórios
    const tag = tags[Math.floor(Math.random() * tags.length)];
    const titulo = titulos[Math.floor(Math.random() * titulos.length)];
    const desc = descricoes[Math.floor(Math.random() * descricoes.length)];
    const impacto = impactos[Math.floor(Math.random() * impactos.length)];

    cardCount += 1;

    const card = document.createElement("article");
    card.className = "ai-topic-card";
    card.innerHTML = `
      <div class="ai-topic-tag">
        <span>${tag.icon}</span>
        <span>${tag.label}</span>
      </div>
      <h3 class="ai-topic-title">${titulo}</h3>
      <p class="ai-topic-desc">${desc}</p>
      <div class="ai-topic-meta">
        <span class="ai-topic-badge">${impacto}</span>
        <span>Ação #${cardCount}</span>
      </div>
    `;
    return card;
  }

  function gerarLote(qtd) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < qtd; i++) {
      frag.appendChild(gerarCard());
    }
    grid.appendChild(frag);
  }

  // gera os primeiros 9
  gerarLote(9);

  btnMore.addEventListener("click", () => {
    gerarLote(9);
    // scroll suave para mostrar os novos cards
    grid.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" });
  });
});
