// Geração de cards automáticos iguais aos de cima
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".eco-topic-destaque");
  const btnMore = document.getElementById("btn-more-topics");
  if (!container || !btnMore) return;

  const tags = [
    { label: "Custos do Automóvel", icon: "💰", pillClass: "pill-green" },
    { label: "Bicicleta", icon: "🚴", pillClass: "pill-orange" },
    { label: "Transporte Público", icon: "🚌", pillClass: "pill-blue" },
    { label: "Partilha", icon: "🤝", pillClass: "pill-purple" },
    { label: "Planeamento", icon: "🧭", pillClass: "pill-indigo" }
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
    "Promover teletrabalho alguns dias por semana"
  ];

  const descricoes = [
    "Reduz emissões, melhora a saúde e diminui o congestionamento urbano.",
    "Aumenta a velocidade média do transporte público e torna-o mais competitivo.",
    "Limita veículos poluentes em zonas sensíveis e melhora a qualidade do ar.",
    "Diminui o tráfego dentro da cidade, mantendo acesso fácil ao centro.",
    "Facilita a combinação bicicleta + comboio em viagens diárias.",
    "Reduz custos operacionais e emissões na prestação de serviços públicos.",
    "Diminui o número de carros na estrada e reparte custos de deslocação.",
    "Cria espaços mais seguros e agradáveis para caminhar e conviver.",
    "Evita paragens desnecessárias e reduz o consumo de combustível.",
    "Torna a mudança de linha ou modo de transporte mais simples.",
    "Dá confiança às pessoas para deixarem a bicicleta na estação.",
    "Evita deslocações desnecessárias e picos de tráfego nas horas de ponta."
  ];

  const extras = [
    "Trocar deslocações até 3 km por bicicleta ou caminhada pode reduzir até 50% das emissões pessoais diárias.",
    "Faixas BUS bem planeadas tornam o transporte público mais rápido que o carro em muitos percursos urbanos.",
    "Zonas de baixas emissões combinadas com bom transporte público transformam centros urbanos em espaços mais saudáveis.",
    "Parques periféricos com shuttle reduzem o número de carros a circular no centro, mantendo o acesso cómodo.",
    "Ciclovias ligadas a estações incentivam o uso combinado bicicleta + comboio nas rotinas diárias.",
    "Renovar frotas municipais com veículos elétricos reduz ruído, emissões e custos de combustível.",
    "Plataformas de boleia entre colegas reduzem carros na estrada e dividem custos de deslocação.",
    "Ruas pensadas para peões trazem mais comércio local, segurança e qualidade de vida.",
    "Semáforos otimizados reduzem paragens, consumo de combustível e atrasos em horas de ponta.",
    "Bilhética e tarifas integradas facilitam usar vários modos de transporte na mesma viagem.",
    "Estacionamento seguro para bicicletas é essencial para quem deixa a bike na estação ou na escola.",
    "Dias de teletrabalho bem planeados retiram carros da estrada e aliviam muito o trânsito."
  ];

  const imagens = [
    { src: "imagens/topico-co2.jpg", alt: "Aerogeradores ao pôr-do-sol" },
    { src: "imagens/topico-cidade.jpg", alt: "Maquete de cidade inteligente" },
    { src: "imagens/topico-ruido.jpg", alt: "Pessoa a atravessar rua com trânsito" },
    { src: "imagens/topico-estacionamento.jpg", alt: "Sinal de estacionamento" },
    { src: "imagens/topico-ciclovia.jpg", alt: "Sinal de ciclovia" },
    { src: "imagens/topico-partilhado.jpg", alt: "Pessoa a usar mobilidade partilhada elétrica" }
  ];

  let cardCount = 3;

  function ligarToggle(card) {
    const btn = card.querySelector(".eco-topic-toggle");
    const extra = card.querySelector(".eco-topic-extra");
    if (!btn || !extra) return;

    btn.addEventListener("click", () => {
      const isActive = card.classList.toggle("ativo");
      btn.firstChild.textContent = isActive ? "Ver menos " : "Ver mais ";
    });
  }

  function gerarCard() {
    const tag = tags[Math.floor(Math.random() * tags.length)];
    const titulo = titulos[Math.floor(Math.random() * titulos.length)];
    const desc = descricoes[Math.floor(Math.random() * descricoes.length)];
    const extra = extras[Math.floor(Math.random() * extras.length)];
    const img = imagens[Math.floor(Math.random() * imagens.length)];

    cardCount += 1;

    const card = document.createElement("article");
    card.className = "eco-topic-expandido";

    card.innerHTML = `
      <div class="eco-topic-banner quadrado">
        <img src="${img.src}" alt="${img.alt}">
        <div class="eco-topic-pill ${tag.pillClass}">
          <span>${tag.icon}</span>
        </div>
      </div>
      <div class="eco-topic-main">
        <h3>${titulo}</h3>
        <p class="eco-topic-sub">${desc}</p>
        <button class="eco-topic-toggle">
          Ver mais <span>▼</span>
        </button>
      </div>
      <div class="eco-topic-extra">
        <p>${extra}</p>
        <p><strong>Ação #${cardCount}</strong> • Inspirado nas melhores práticas de mobilidade sustentável.</p>
      </div>
    `;

    ligarToggle(card);
    return card;
  }

  // ligar toggle aos 3 cards que já existem no HTML
  document
    .querySelectorAll(".eco-topic-expandido")
    .forEach(card => ligarToggle(card));

  function gerarLote(qtd) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < qtd; i++) {
      frag.appendChild(gerarCard());
    }
    container.appendChild(frag);
  }

  gerarLote(3);

  btnMore.addEventListener("click", () => {
    gerarLote(3);
  });
});
