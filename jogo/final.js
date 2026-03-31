/* ============================================
   FINAL.JS — Tela final: mensagem de amor + carta do Outro Ademir
   ============================================ */

function showFim() {
  audio.pause();

  // ── Confetti colorido ──
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c  = document.createElement('div');
      c.className = 'cf';
      c.style.left             = Math.random() * 100 + 'vw';
      c.style.background       = ['#e63946','#ff9999','#fff','#ffd700','#ffb3c1','#ff6b9d'][Math.floor(Math.random() * 6)];
      c.style.animationDuration = (2 + Math.random() * 3) + 's';
      c.style.animationDelay   = (Math.random() * 0.5) + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }, i * 40);
  }

  document.getElementById('tela-jogo').style.display = 'none';
  const tf = document.getElementById('tela-final');
  tf.style.display = 'flex';

  // Anima a carta após 1 segundo
  setTimeout(() => {
    const carta = document.getElementById('carta-block');
    if (carta) {
      carta.style.opacity   = '0';
      carta.style.transform = 'translateY(30px)';
      carta.style.transition = 'all 0.8s cubic-bezier(.34,1.56,.64,1)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carta.style.opacity   = '1';
          carta.style.transform = 'translateY(0)';
        });
      });
    }
  }, 1200);
}
