document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".eco-topic-expandido");

  cards.forEach(card => {
    const btn = card.querySelector(".eco-topic-toggle");
    const extra = card.querySelector(".eco-topic-extra");
    if (!btn || !extra) return;

    btn.addEventListener("click", () => {
      const isActive = card.classList.toggle("ativo");
      // atualiza texto do botão
      btn.firstChild.textContent = isActive ? "Ver menos " : "Ver mais ";
    });
  });
});
