/* ============================================
   ENGINE.JS — Motor do jogo
   Lógica de processamento, animações, helpers
   ============================================ */

// ── Referências globais ───────────────────────
const audio    = document.getElementById('ap');
const cbEl     = () => document.getElementById('cb');
const oaEl     = () => document.getElementById('oa');
const cstEl    = () => document.getElementById('cst');
const avwEl    = () => document.getElementById('avw');
const cnmEl    = () => document.getElementById('cnm');

// ── Volume slider ─────────────────────────────
let isDrag = false;
const vtr  = document.getElementById('vtr');
const vf   = document.getElementById('vf');
const vth  = document.getElementById('vth');

function setVol(e) {
  const r = vtr.getBoundingClientRect();
  const x = Math.max(0, Math.min(e.clientX - r.left, r.width));
  const p = x / r.width;
  vf.style.width  = (p * 100) + '%';
  vth.style.right = ((1 - p) * r.width) + 'px';
  audio.volume    = p;
}
vtr.addEventListener('mousedown', e  => { isDrag = true; setVol(e); });
document.addEventListener('mousemove', e  => { if (isDrag) setVol(e); });
document.addEventListener('mouseup',   () => { isDrag = false; });
// Touch support — slider de volume
vtr.addEventListener('touchstart', e => {
  isDrag = true;
  setVol(e.touches[0]);
  e.preventDefault(); // evita scroll da página ao arrastar o slider
}, { passive: false });
document.addEventListener('touchmove', e => {
  if (isDrag) { setVol(e.touches[0]); e.preventDefault(); }
}, { passive: false });
document.addEventListener('touchend', () => { isDrag = false; });

// iOS: força -webkit-overflow-scrolling para o chat rolar suavemente
document.addEventListener('DOMContentLoaded', () => {
  const cb = document.getElementById('cb');
  if (cb) cb.style.webkitOverflowScrolling = 'touch';
});

// ── Música automática — coloque o arquivo como "musica.mp3" na pasta ──
// Se quiser trocar a música, basta substituir o arquivo musica.mp3
audio.src = 'musica.mp3';

// Upload opcional: se quiser usar outro arquivo sem renomear
document.getElementById('fi').addEventListener('change', function(e) {
  const f = e.target.files[0];
  if (f) {
    audio.src = URL.createObjectURL(f);
    document.getElementById('mn').textContent = '🎵 ' + f.name;
  }
});

function fecharModal() {
  document.getElementById('vm').style.display = 'none';
  const p = parseFloat(vf.style.width) / 100 || 0.5;
  audio.volume = p;
  audio.play().catch(() => {});
  iniciarHistoria();
}

function iniciarJogo() {
  document.getElementById('tela-inicio').style.display = 'none';
  document.getElementById('tela-jogo').style.display   = 'flex';
  document.getElementById('vm').style.display           = 'flex';
  audio.volume = 0.5;
}

function iniciarHistoria() {
  processa(0);
}

// ── Engine principal ──────────────────────────
function getCena(id) { return ROTEIRO.find(c => c.id === id); }

function processa(id) {
  const c = getCena(id);
  if (!c) return;

  oaEl().innerHTML = '<div class="ol">Aguarde...</div>';

  // ── Especiais ──
  if (c.esp === 'load-chat') { loadBar(cbEl(), 'Carregando conversa...', () => processa(c.prox)); return; }
  if (c.esp === 'popup')     { showPopup(() => processa(c.prox)); return; }
  if (c.esp === 'big-av')    { avwEl().classList.add('big'); cnmEl().textContent = '✨ Outro Ademir ✨'; setTimeout(() => processa(c.prox), 500); return; }
  if (c.esp === 'volta-av')  { avwEl().classList.remove('big'); cnmEl().textContent = 'Seu Futuro ❤️'; setTimeout(() => processa(c.prox), 500); return; }
  if (c.esp === 'drama')     { dramaBar(cbEl(), () => processa(c.prox)); return; }
  if (c.esp === 'fim')       { setTimeout(() => showFim(), c.d || 2000); return; }

  // ── Botão único ──
  if (c.esp === 'unica') {
    setTimeout(() => {
      oaEl().innerHTML = '<div class="ol">Toque para responder</div>';
      const b = document.createElement('button');
      b.className = 'ob';
      b.innerHTML = `<span class="obl">💬</span>${c.otxt}`;
      b.onclick = () => { oaEl().innerHTML = '<div class="ol">Aguarde...</div>'; processa(c.prox); };
      oaEl().appendChild(b);
    }, c.d || 600);
    return;
  }

  // ── 3 opções Rafaela ──
  if (c.esp === 'raf') {
    setTimeout(() => renderOpcoes(c), c.d || 600);
    return;
  }

  // ── Mensagem normal ──
  if (c.tipo === 'in') {
    cstEl().textContent = 'digitando...';
    const t = crTip(); cbEl().appendChild(t); cbEl().scrollTop = cbEl().scrollHeight;
    setTimeout(() => {
      t.remove(); cstEl().textContent = 'online';
      addMsg(cbEl(), 'in', c.msg);
      spawnEmoji();
      if (c.prox != null) setTimeout(() => processa(c.prox), 300);
    }, c.d || 1400);
    return;
  }

  if (c.tipo === 'out') {
    setTimeout(() => {
      addMsg(cbEl(), 'out', c.msg);
      if (c.prox != null) setTimeout(() => processa(c.prox), 400);
    }, c.d || 600);
    return;
  }
}

// ── Renderizar opções Rafaela ─────────────────
function renderOpcoes(c) {
  oaEl().innerHTML = '<div class="ol">Escolha a resposta da Rafaela</div>';
  const L = ['A', 'B', 'C'];
  c.ops.forEach((op, i) => {
    const b = document.createElement('button');
    b.className = 'ob';
    b.innerHTML = `<span class="obl">${L[i]}</span>${op.t}`;
    b.onclick = () => escolhe(op, c, b);
    oaEl().appendChild(b);
  });
}

function escolhe(op, cena, btn) {
  if (!op.ok) {
    btn.classList.add('wrong');
    setTimeout(() => {
      btn.classList.remove('wrong');
      renderOpcoes(cena);
    }, 700);
    return;
  }
  oaEl().innerHTML = '<div class="ol">Aguarde...</div>';
  // Dispara os emojis especiais da Rafaela 🎀🌪️
  spawnRafaela();
  processa(op.prox);
}

// ── Helpers visuais ───────────────────────────
function crTip() {
  const t = document.createElement('div');
  t.className = 'tip'; t.id = 'tp';
  t.innerHTML = '<div class="td"></div><div class="td"></div><div class="td"></div>';
  return t;
}

function addMsg(container, tipo, texto) {
  const w  = document.createElement('div'); w.className = 'mw ' + tipo;
  const b  = document.createElement('div'); b.className = 'mbl';
  b.innerHTML = texto.replace(/\n/g, '<br>');
  const tm = document.createElement('div'); tm.className = 'mtm';
  const n  = new Date();
  tm.textContent = n.getHours().toString().padStart(2,'0') + ':' + n.getMinutes().toString().padStart(2,'0') + (tipo === 'out' ? ' ✓✓' : '');
  w.appendChild(b); w.appendChild(tm);
  container.appendChild(w);
  container.scrollTop = container.scrollHeight;
}

function loadBar(container, label, cb2) {
  const w = document.createElement('div'); w.className = 'cld';
  w.innerHTML = `<div class="cll">${label}</div><div class="ltr"><div class="lb" id="lb1"></div></div>`;
  container.appendChild(w); container.scrollTop = container.scrollHeight;
  let p = 0;
  const b = document.getElementById('lb1');
  const iv = setInterval(() => {
    p += 2; b.style.width = p + '%';
    if (p >= 100) { clearInterval(iv); w.remove(); cb2(); }
  }, 30);
}

function dramaBar(container, cb2) {
  const msgs = ['⚠️ Carregando memórias...', '💔 Processando...', '🌀 Transmitindo entre universos...', '✅ Continuando...'];
  const w = document.createElement('div'); w.className = 'cld';
  w.innerHTML = '<div class="cll" id="dlb">Carregando...</div><div class="ltr"><div class="lb" id="lb2"></div></div>';
  container.appendChild(w); container.scrollTop = container.scrollHeight;
  let p = 0, i = 0;
  const dlb = document.getElementById('dlb');
  const b   = document.getElementById('lb2');
  const iv  = setInterval(() => {
    p += 1; b.style.width = p + '%';
    if (p % 25 === 0 && i < msgs.length) dlb.textContent = msgs[i++];
    if (p >= 100) { clearInterval(iv); w.remove(); cb2(); }
  }, 25);
}

function showPopup(cb2) {
  const ov = document.createElement('div'); ov.className = 'pov';
  ov.innerHTML = `
    <div class="pbx">
      <div class="pe">💬</div>
      <div class="pt">Uma mensagem chegou...</div>
      <div class="ps">Aperte o botão abaixo<br>e continue a conversa ❤️</div>
      <button class="pb" id="pbc">Continuar ▶</button>
    </div>`;
  document.body.appendChild(ov);
  document.getElementById('pbc').onclick = () => { ov.remove(); cb2(); };
}

function spawnEmoji() {
  // Emojis do Ademir — disparam quando ele envia mensagem
  const list = ['❤️', '✨', '💬', '😊', '💫', '🌟', '💙', '🌹'];
  const e = document.createElement('div'); e.className = 'ef';
  e.textContent = list[Math.floor(Math.random() * list.length)];
  e.style.left   = (15 + Math.random() * 65) + 'vw';
  e.style.bottom = '140px';
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 2000);
}

function spawnRafaela() {
  // Emojis da Rafaela — laços e tornado sobem em rajada quando ela responde
  const list = ['🎀', '🌪️', '🎀', '🌪️', '🎀', '🌪️'];
  // Dispara 6 emojis escalonados com posições e durações variadas
  list.forEach((emoji, i) => {
    setTimeout(() => {
      const e = document.createElement('div');
      e.className = 'ef-rafa';
      e.textContent = emoji;
      // Espalhados horizontalmente de forma orgânica
      e.style.left     = (8 + Math.random() * 82) + 'vw';
      e.style.bottom   = (80 + Math.random() * 60) + 'px';
      e.style.fontSize = (1.2 + Math.random() * 1.2) + 'rem';
      // Cada um sobe numa velocidade levemente diferente
      const dur = 1.6 + Math.random() * 1.2;
      e.style.animationDuration = dur + 's';
      document.body.appendChild(e);
      setTimeout(() => e.remove(), dur * 1000 + 100);
    }, i * 100); // 100ms entre cada um — efeito cascata
  });
}
