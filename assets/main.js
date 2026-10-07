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
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const alvo = document.querySelector(a.getAttribute('href'));
    if (!alvo || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(alvo, { offset: -70 });
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

// Manifesto: cada palavra vira um span; as de <em> ficam azuis ao acender
const manifesto = document.querySelector('.manifesto');
const manifestoTexto = document.querySelector('.manifesto-texto');
const embrulhar = (texto, azul) => texto.split(/(\s+)/).map((p) => (p.trim() ? `<span class="p${azul ? ' azul' : ''}">${escapar(p)}</span>` : p)).join('');
manifestoTexto.innerHTML = [...manifestoTexto.childNodes]
  .map((n) => (n.nodeType === 3 ? embrulhar(n.textContent, false) : embrulhar(n.textContent, true))).join('');
const palavrasManifesto = manifestoTexto.querySelectorAll('.p');

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
    palavrasManifesto.forEach((p) => p.classList.add('acesa'));
    trajetoria.style.setProperty('--progresso', 1);
    return;
  }

  // Topo some devagar ao descer
  const h = limitar(y / innerHeight);
  heroConteudo.style.transform = `translateY(${h * 120}px)`;
  heroConteudo.style.opacity = 1 - h * 1.1;

  // Manifesto: acende palavra por palavra
  const m = limitar((y - manifesto.offsetTop) / (manifesto.offsetHeight - innerHeight) * 1.15);
  const acesas = Math.round(m * palavrasManifesto.length);
  palavrasManifesto.forEach((p, i) => p.classList.toggle('acesa', i < acesas));

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
