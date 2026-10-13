// Google Analytics 4 com aviso de cookies (LGPD), usado no site e no blog.
// Para ligar: troque o GA_ID pelo "ID da métrica" da propriedade GA4 (começa com G-).
// Enquanto for o marcador, nada do Google é carregado e o aviso não aparece.
const GA_ID = 'G-XXXXXXXXXX';
const ligado = GA_ID !== 'G-XXXXXXXXXX';

window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };

let escolha = null;
try { escolha = localStorage.getItem('vz-cookies'); } catch { /* navegação privada */ }

if (ligado) {
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

  if (!escolha) {
    const aviso = document.createElement('div');
    aviso.className = 'cookies';
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML = '<p>Usamos cookies do Google Analytics para entender como o site é usado e melhorá-lo. Nenhum dado é usado para anúncios.</p>'
      + '<div><button type="button" class="btn btn-sm" data-cookies="sim">Aceitar</button>'
      + '<button type="button" class="btn btn-sm btn-fantasma" data-cookies="nao">Recusar</button></div>';
    aviso.addEventListener('click', (e) => {
      const v = e.target.dataset.cookies;
      if (!v) return;
      try { localStorage.setItem('vz-cookies', v); } catch { /* sem armazenamento, pergunta de novo na próxima visita */ }
      gtag('consent', 'update', { analytics_storage: v === 'sim' ? 'granted' : 'denied' });
      aviso.remove();
    });
    document.body.appendChild(aviso);
  }
}

// Cliques em WhatsApp e e-mail viram o evento "contact_click" (marcar como evento-chave no GA4)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="https://wa.me/"], a[href^="mailto:"]');
  if (!link) return;
  const lugar = link.closest('#menu') ? 'menu'
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
    : 'conteudo';
  gtag('event', 'contact_click', {
    contact_method: link.getAttribute('href').startsWith('mailto:') ? 'email' : 'whatsapp',
    contact_placement: lugar,
  });
});
