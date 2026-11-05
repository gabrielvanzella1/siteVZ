// Google Analytics 4 e Pixel da Meta com aviso de cookies (LGPD), usado no site, no blog, na consultoria e na página da IA.
// Para ligar: GA_ID = "ID da métrica" do GA4 (começa com G-); META_PIXEL_ID = ID do Pixel (Gerenciador de Eventos da Meta).
// Enquanto estiverem no marcador/vazios, nada é carregado e o aviso não aparece. O Pixel só carrega depois do "Aceitar".
const GA_ID = 'G-XXXXXXXXXX';
const META_PIXEL_ID = '';
const gaLigado = GA_ID !== 'G-XXXXXXXXXX';
const ligado = gaLigado || Boolean(META_PIXEL_ID);

// Pixel da Meta (anúncios no Instagram/Facebook): registra a visita (PageView) e cada clique de contato (Contact)
function carregarPixel() {
  if (!META_PIXEL_ID || window.fbq) return;
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };

let escolha = null;
try { escolha = localStorage.getItem('vz-cookies'); } catch { /* navegação privada */ }

if (gaLigado) {
  // Modo de consentimento do Google: sem "aceitar", o GA4 não grava cookies (só sinais anônimos)
  gtag('consent', 'default', {
    analytics_storage: escolha === 'sim' ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}
if (escolha === 'sim') carregarPixel();

if (ligado && !escolha) {
  const aviso = document.createElement('div');
  aviso.className = 'cookies';
  aviso.setAttribute('role', 'region');
  aviso.setAttribute('aria-label', 'Aviso de cookies');
  aviso.innerHTML = (META_PIXEL_ID
    ? '<p>Usamos cookies do Google Analytics e da Meta para medir as visitas e os resultados dos nossos anúncios.</p>'
    : '<p>Usamos cookies do Google Analytics para entender como o site é usado e melhorá-lo. Nenhum dado é usado para anúncios.</p>')
    + '<div><button type="button" class="btn btn-sm" data-cookies="sim">Aceitar</button>'
    + '<button type="button" class="btn btn-sm btn-fantasma" data-cookies="nao">Recusar</button></div>';
  aviso.addEventListener('click', (e) => {
    const v = e.target.dataset.cookies;
    if (!v) return;
    try { localStorage.setItem('vz-cookies', v); } catch { /* sem armazenamento, pergunta de novo na próxima visita */ }
    gtag('consent', 'update', { analytics_storage: v === 'sim' ? 'granted' : 'denied' });
    if (v === 'sim') carregarPixel();
    aviso.remove();
  });
  document.body.appendChild(aviso);
}

// Cliques em WhatsApp e e-mail viram o evento "contact_click" (marcar como evento-chave no GA4)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="https://wa.me/"], a[href^="mailto:"]');
  if (!link) return;
  // A posição vem do data-placement mais próximo (blocos da IA) ou da seção onde o link está
  const lugar = link.closest('[data-placement]')?.dataset.placement || (link.closest('#menu') ? 'menu'
    : link.closest('.hero') ? 'hero'
    : link.closest('#consultoria') ? 'consultoria'
    : link.closest('#apps') ? 'cases'
    : link.closest('#prontos') ? 'sistemas_prontos'
    : link.closest('#contato') ? 'contato'
    : link.closest('.rodape') ? 'rodape'
    : link.closest('.whats-flutuante') ? 'whatsapp_flutuante'
    : link.closest('.consultoria-pagina') ? 'pagina_consultoria'
    : link.closest('.post, .blog') ? 'blog'
    : link.closest('.topo-interno') ? 'topo_pagina_interna'
    : 'conteudo');
  gtag('event', 'contact_click', {
    contact_method: link.getAttribute('href').startsWith('mailto:') ? 'email' : 'whatsapp',
    contact_placement: lugar,
  });
  if (window.fbq) fbq('track', 'Contact', { contact_placement: lugar });
});
