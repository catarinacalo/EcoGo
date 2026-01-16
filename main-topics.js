<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
  // Toggle "Ver mais/menos" nos cards .eco-topic-expandido
  const cards = document.querySelectorAll('.eco-topic-expandido');
  cards.forEach(card => {
    const btn = card.querySelector('.eco-topic-toggle');
    const extra = card.querySelector('.eco-topic-extra');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      const isActive = card.classList.toggle('ativo');
      btn.firstChild.textContent = isActive ? 'Ver menos' : 'Ver mais';
    });
  });

  // Remove botão "Gerar mais" da grelha AI
  const btnMore = document.getElementById('btn-more-topics');
  if (btnMore) {
    btnMore.remove();
  }
=======
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".eco-topic-expandido");

  cards.forEach(card => {
    const btn = card.querySelector(".eco-topic-toggle");
    const extra = card.querySelector(".eco-topic-extra");
    if (!btn || !extra) return;

    btn.addEventListener("click", () => {
      const isActive = card.classList.toggle("ativo");
      btn.firstChild.textContent = isActive ? "Ver menos " : "Ver mais ";
    });
  });
>>>>>>> eca352724c5a5cb0248eb0e49b3b65ce58b92299
});
