document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.eco-topic-expandido').forEach(card => {
    const btn = card.querySelector('.eco-topic-toggle');
    const extra = card.querySelector('.eco-topic-extra');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      const isActive = card.classList.toggle('ativo');
      btn.firstChild.textContent = isActive ? 'Ver menos' : 'Ver mais';
    });
  });
  const btnMore = document.getElementById('btn-more-topics');
  btnMore?.remove();
});
