document.documentElement.classList.add('js');
const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const escapar = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Rolagem suave com inércia (Lenis). Sem ele, a página rola normal.
let lenis = null;
if (!reduzir && window.Lenis) {
  lenis = new Lenis({ lerp: 0.09 });
  const quadroLenis = (t) => { lenis.raf(t); requestAnimationFrame(quadroLenis); };
  requestAnimationFrame(quadroLenis);
}

// Links internos (#secao) passam pelo Lenis para manter a suavidade
// (menos o "Pular para o conteúdo": o salto nativo leva junto o foco do teclado)
document.querySelectorAll('a[href^="#"]:not(.pular)').forEach((a) => {
  a.addEventListener('click', (e) => {
    const alvo = document.querySelector(a.getAttribute('href'));
    if (!alvo || !lenis) return;
    e.preventDefault();
    // force: o menu do celular pausa o Lenis e só o libera depois deste clique
    lenis.scrollTo(alvo, { offset: -70, force: true });
  });
});

// Menu do celular
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const abrirMenu = (aberto) => {
  menu.classList.toggle('aberto', aberto);
  menuBtn.setAttribute('aria-expanded', aberto);
  menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  if (lenis) aberto ? lenis.stop() : lenis.start();
};
menuBtn.addEventListener('click', () => abrirMenu(!menu.classList.contains('aberto')));
menu.addEventListener('click', (e) => e.target.closest('a') && abrirMenu(false));
addEventListener('keydown', (e) => e.key === 'Escape' && abrirMenu(false));

// Palavra que troca no título
const troca = document.querySelector('.troca');
if (troca && !reduzir) {
  const palavras = troca.dataset.palavras.split('|');
  let i = 0;
  setInterval(() => {
    troca.classList.add('saindo');
    setTimeout(() => {
      i = (i + 1) % palavras.length;
      troca.textContent = palavras[i];
      troca.classList.remove('saindo');
    }, 350);
  }, 2600);
}

// Títulos das seções sobem palavra por palavra
document.querySelectorAll('.revela h2').forEach((h2) => {
  h2.setAttribute('aria-label', h2.textContent);
  h2.innerHTML = h2.textContent.trim().split(/\s+/)
    .map((p, i) => `<span class="pal" aria-hidden="true"><span style="--i:${i}">${escapar(p)}</span></span>`).join(' ');
});

// Quem somos: o editor digita o HTML da preview (que aparece crua) e depois o CSS abaixo,
// aplicado ao vivo na preview conforme é digitado. Seletores sempre em .vz (só a preview tem essa classe); keyframes com nomes únicos.
const cssQuemSomos = `.vz { font-family: 'Space Grotesk', sans-serif; color: #0A1A4A; }
.vz h2 {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.15;
  margin: 0 0 .5em;
  background: linear-gradient(90deg, #00B2FF, #0B40CE, #00B2FF) 0 0 / 200%;
  -webkit-background-clip: text;
  color: transparent;
  animation: brilho 4s linear infinite;
}
.vz p { font: 1rem/1.7 Inter, sans-serif; color: #4A5468; margin: 0 0 1em; }
.vz ul { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: .4em 0 1.6em; list-style: none; }
.vz li {
  padding: 6px 16px;
  border-radius: 99px;
  background: #EAF0FD;
  color: #1157EA;
  font-weight: 600;
  animation: boia 2.4s ease-in-out infinite;
}
.vz li:nth-child(even) { animation-delay: -1.2s; }
.vz a {
  padding: 14px 26px;
  border-radius: 99px;
  background: linear-gradient(135deg, #00B2FF, #2F6BFF);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  animation: onda 2s infinite;
}
@keyframes brilho { to { background-position: -200% 0; } }
@keyframes boia { 50% { transform: translateY(-6px); } }
@keyframes onda {
  from { box-shadow: 0 0 0 0 #2F6BFF99; }
  to { box-shadow: 0 0 0 16px #2F6BFF00; }
}`;

const ide = document.querySelector('.ide');
const codigo = ide.querySelector('.ide-codigo');
const estilo = document.head.appendChild(document.createElement('style'));
const tokens = [['\n'], ['<section ', 'tg'], ['class', 'at'], ['="vz"', 'vl'], ['>', 'tg']]; // [texto, classe, elemento revelado ao terminar, é CSS]
const escrever = (el, recuo) => {
  const n = el.tagName.toLowerCase();
  const folha = !el.children.length;
  tokens.push(['\n' + recuo], [`<${n}>`, 'tg']);
  if (folha) tokens.push([el.textContent.trim().replace(/\s+/g, ' '), 'tx']);
  else { [...el.children].forEach((f) => escrever(f, recuo + '  ')); tokens.push(['\n' + recuo]); }
  tokens.push([`</${n}>`, 'tg', folha && el]);
};
[...ide.querySelector('.ide-site').children].forEach((el) => escrever(el, '  '));
tokens.push(['\n'], ['</section>', 'tg'], ['\n'], ['<style>', 'tg']);
// Cores do CSS: seletor até o primeiro "{" (ou antes de outro "{"), valor depois de ":", propriedade no resto
let antes = '';
cssQuemSomos.split('\n').forEach((l) => {
  tokens.push(['\n  ' + l.match(/^\s*/)[0]]);
  const [, sel = '', resto] = l.trim().match(/^([^{]*(?=\{))?(.*)$/);
  if (sel) tokens.push([sel, 'sel', null, true]);
  resto.split(/([{}:;])/).filter(Boolean).forEach((p, i, ps) => {
    const delim = p.length === 1 && '{}:;'.includes(p);
    tokens.push([p, delim ? '' : ps[i + 1] === '{' ? 'sel' : antes === ':' ? 'vl' : 'pr', null, true]);
    if (delim) antes = p;
  });
});
tokens.push(['\n'], ['</style>', 'tg']);
// Texto corrido sai palavra por palavra, mais rápido quanto maior: a história toda leva no máximo ~2,5 s
const palavras = tokens.filter((t) => t[1] === 'tx').reduce((n, t) => n + t[0].split(' ').length, 0);
const msPalavra = Math.min(30, 2500 / palavras);

const cursor = document.createElement('span');
cursor.className = 'cursor';
let linha, trecho, cssDigitado = '';
const depois = (ms, i, c) => (reduzir ? digitar(i, c) : setTimeout(digitar, ms, i, c));
function digitar(i, c) {
  if (i >= tokens.length) return;
  const [texto, classe = '', revela, css] = tokens[i];
  if (texto[0] === '\n') {
    linha = codigo.appendChild(document.createElement('div'));
    linha.append(texto.slice(1), cursor);
    codigo.scrollTop = codigo.scrollHeight;
    return depois(20, i + 1, 0);
  }
  if (c === 0) { trecho = document.createElement('span'); trecho.className = classe; cursor.before(trecho); }
  // Código sai de 3 em 3 caracteres (o navegador não garante timers abaixo de ~10 ms)
  const fim = classe === 'tx' ? texto.indexOf(' ', c + 1) + 1 || texto.length : Math.min(c + 3, texto.length);
  trecho.textContent += texto.slice(c, fim);
  // O CSS digitado entra na página a cada declaração fechada (";" ou "}"), não a cada letra
  if (css) { cssDigitado += texto.slice(c, fim); if (texto === ';' || texto === '}') estilo.textContent = cssDigitado; }
  if (fim < texto.length) return depois(classe === 'tx' ? msPalavra : 12, i, fim);
  if (revela) revela.classList.add('on');
  depois(revela ? 200 : 12, i + 1, 0);
}
new IntersectionObserver(([e], o) => {
  if (!e.isIntersecting) return;
  o.disconnect();
  setTimeout(digitar, reduzir ? 0 : 400, 0, 0);
}, { threshold: 0.4 }).observe(ide);

// Logos: duplica cada trilho para o carrossel não ter emenda
document.querySelectorAll('.logos-trilho').forEach((t) => {
  [...t.children].forEach((f) => { const c = f.cloneNode(true); c.setAttribute('aria-hidden', 'true'); t.appendChild(c); });
});

// Revelar ao rolar, em cascata dentro de cada grupo
const obs = new IntersectionObserver((itens) => {
  itens.forEach((it) => {
    if (!it.isIntersecting) return;
    const irmaos = [...it.target.parentElement.children].filter((el) => el.classList.contains('revela'));
    it.target.style.transitionDelay = `${irmaos.indexOf(it.target) * 90}ms`;
    it.target.classList.add('visivel');
    obs.unobserve(it.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.revela').forEach((el) => obs.observe(el));

// Apps: celulares 3D. As fatias dão espessura; o mouse gira o aparelho.
const celulares = document.querySelectorAll('.cel3d');
celulares.forEach((cel) => {
  for (let z = -8; z < 8; z += 2) {
    const f = document.createElement('span');
    f.className = 'fatia';
    f.style.setProperty('--z', `${z}px`);
    cel.insertBefore(f, cel.firstChild);
  }
});
const mouseFino = matchMedia('(pointer: fine)').matches;
if (!reduzir && mouseFino) {
  document.querySelectorAll('.vitrine-app').forEach((bloco) => {
    const cel = bloco.querySelector('.cel3d');
    bloco.addEventListener('pointermove', (e) => {
      const r = cel.getBoundingClientRect();
      const x = limitar((e.clientX - (r.left + r.width / 2)) / (innerWidth / 2), -1, 1);
      const y = limitar((e.clientY - (r.top + r.height / 2)) / (innerHeight / 2), -1, 1);
      cel.style.setProperty('--ry', `${x * 35}deg`);
      cel.style.setProperty('--rx', `${-y * 22}deg`);
    });
    bloco.addEventListener('pointerleave', () => { cel.style.removeProperty('--ry'); cel.style.removeProperty('--rx'); });
  });
}

// Cases: as telas dos <article class="app"> vão para o aparelho e o <h3> de cada um vira botão da lista.
// A linha .tempo do case ativo é o relógio (CSS pausa no hover); quando termina, passa para o próximo.
const secaoApps = document.getElementById('apps');
const aparelho = secaoApps.querySelector('.cel3d');
const visor = aparelho.querySelector('.visor');
const listaApps = secaoApps.querySelector('.apps-info');
const apps = [...listaApps.querySelectorAll('.app')];
const telasApps = apps.map((app) => visor.appendChild(app.querySelector('.tela')));
const botoesApps = apps.map((app, i) => {
  const h3 = app.querySelector('h3');
  const b = document.createElement('button');
  b.type = 'button';
  b.append(...h3.childNodes);
  h3.append(b);
  app.append(Object.assign(document.createElement('i'), { className: 'tempo' }));
  b.addEventListener('click', () => mostrarApp(i));
  return b;
});
const espera = (ms) => new Promise((r) => setTimeout(r, reduzir ? 0 : ms));
let appAtual = -1, trocando = false;
async function mostrarApp(i) {
  if (trocando || i === appAtual) return;
  trocando = true;
  const app = apps[i];
  // A lista abre o case na hora (e o relógio dele começa); o aparelho troca em seguida
  apps.forEach((a, j) => a.classList.toggle('ativo', j === i));
  botoesApps.forEach((b, j) => b.setAttribute('aria-expanded', j === i));
  if (appAtual >= 0) {
    telasApps[appAtual].classList.remove('aberta');
    await espera(350);
  }
  // Troca de tipo de aparelho (celular, coletor, notebook): ele vira de lado, troca e volta
  if (aparelho.dataset.tipo !== app.dataset.aparelho) {
    if (appAtual >= 0) { aparelho.classList.add('virando'); await espera(450); }
    aparelho.dataset.tipo = app.dataset.aparelho;
    aparelho.classList.remove('virando');
  }
  secaoApps.style.setProperty('--cor', app.dataset.cor);
  telasApps[i].classList.add('aberta');
  appAtual = i;
  trocando = false;
}
listaApps.addEventListener('animationend', (e) => e.target.classList.contains('tempo') && mostrarApp((appAtual + 1) % apps.length));
new IntersectionObserver(([e]) => secaoApps.classList.toggle('fora', !e.isIntersecting)).observe(aparelho);
mostrarApp(0);

// Tudo o que depende da rolagem, num só lugar
const topo = document.getElementById('topo');
const heroConteudo = document.querySelector('.hero-conteudo');
const trajetoria = document.querySelector('.trajetoria');
const paralaxe = document.querySelectorAll('[data-paralaxe]');
function aoRolar() {
  const y = scrollY;
  topo.classList.toggle('rolado', y > 30);
  document.documentElement.style.setProperty('--p', limitar(y / (document.documentElement.scrollHeight - innerHeight)));

  if (reduzir) {
    trajetoria.style.setProperty('--progresso', 1);
    return;
  }

  // Topo some devagar ao descer
  const h = limitar(y / innerHeight);
  heroConteudo.style.transform = `translateY(${h * 120}px)`;
  heroConteudo.style.opacity = 1 - h * 1.1;

  // Sem mouse (celular), o aparelho gira conforme passa pela tela
  if (!mouseFino) {
    celulares.forEach((cel) => {
      const c = cel.getBoundingClientRect();
      const d = limitar((c.top + c.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
      cel.style.setProperty('--ry', `${d * 40}deg`);
    });
  }

  // Linha da trajetória
  const r = trajetoria.getBoundingClientRect();
  trajetoria.style.setProperty('--progresso', limitar((innerHeight * 0.65 - r.top) / r.height));

  // Formas com parallax
  paralaxe.forEach((el) => {
    const c = el.parentElement.getBoundingClientRect();
    el.style.transform = `translateY(${(c.top + c.height / 2 - innerHeight / 2) * Number(el.dataset.paralaxe)}px)`;
  });
}
addEventListener('scroll', aoRolar, { passive: true });
addEventListener('resize', aoRolar);
aoRolar();

// Inclinação 3D e brilho que segue o mouse nos cards
if (!reduzir && matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// Cena 3D do topo: núcleo de rede (icosaedro) com partículas em volta
function cena3d() {
  const canvas = document.getElementById('cena3d');
  if (!window.THREE || !canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;

  const grupo = new THREE.Group();
  cena.add(grupo);

  const geo = new THREE.IcosahedronGeometry(2.4, 1);
  grupo.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: 0x1157ea, transparent: true, opacity: 0.55 })));
  grupo.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00b2ff, size: 0.14 })));
  const nucleo = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 0), new THREE.MeshBasicMaterial({ color: 0x2f6bff, wireframe: true }));
  grupo.add(nucleo);

  const anel = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.02, 8, 120), new THREE.MeshBasicMaterial({ color: 0x00b2ff, transparent: true, opacity: 0.6 }));
  anel.rotation.x = Math.PI / 2.6;
  grupo.add(anel);

  const n = 600;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * 30;
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particulas = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0x1157ea, size: 0.045, transparent: true, opacity: 0.45 }));
  cena.add(particulas);

  let largo = true;
  const ajustar = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // No computador o objeto fica à direita do texto; no celular, atrás dele e mais apagado
    largo = w > 860;
    grupo.position.set(largo ? 3.6 : 0, largo ? 0 : 1.5, 0);
    canvas.style.opacity = largo ? 1 : 0.35;
  };
  addEventListener('resize', ajustar);
  ajustar();

  if (reduzir) { renderer.render(cena, camera); return; }

  const mouse = { x: 0, y: 0 };
  addEventListener('pointermove', (e) => {
    mouse.x = e.clientX / innerWidth - 0.5;
    mouse.y = e.clientY / innerHeight - 0.5;
  }, { passive: true });

  // Só anima enquanto o topo está na tela
  let quadro = 0;
  new IntersectionObserver(([e]) => {
    cancelAnimationFrame(quadro);
    if (e.isIntersecting) loop();
  }).observe(canvas);

  const relogio = new THREE.Clock();
  function loop() {
    const t = relogio.getElapsedTime();
    const s = scrollY / innerHeight; // ao descer, o objeto gira mais rápido e cresce
    grupo.rotation.y = t * 0.15 + mouse.x * 0.6 + s * 2;
    grupo.rotation.x = Math.sin(t * 0.3) * 0.15 + mouse.y * 0.4 + s * 0.6;
    grupo.scale.setScalar((largo ? 1 : 0.8) * (1 + s * 0.5));
    nucleo.rotation.y = -t * 0.5;
    nucleo.rotation.z = t * 0.3;
    anel.rotation.z = t * 0.2;
    particulas.rotation.y = t * 0.02 + s * 0.3;
    renderer.render(cena, camera);
    quadro = requestAnimationFrame(loop);
  }
}
cena3d();
