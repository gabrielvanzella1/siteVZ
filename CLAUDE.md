# Site da VZ Soluções em Tecnologia

Site institucional da **VZ Soluções em Tecnologia** (nome correto desde 2026-10-07; antes "VZ Tech · Automação com IA"), empresa do Gabriel Vanzella (desenvolvimento de sistemas, SaaS, automação e integrações).

**Logo (novo em 2026-10-13):** o Gabriel mandou duas versões em `web kit vz/` (banners com fundo): **Azul Gradiente** (fundo claro, V azul-marinho) e **Futurista** (fundo escuro, V prateado). No site são esses arquivos recortados com o fundo tirado ("cor para transparência"), sem redesenhar: `assets/marca/logo-vz-claro.webp` no topo branco (a placa azul-marinho e o SVG `#logo-vz` saíram) e `assets/marca/logo-vz-escuro.webp` no rodapé azul. Ele rejeita adaptar cores ou recompor o logo: tem que seguir o original. `assets/marca/logo-vz.webp` é o logo antigo (2026-10-07). `assets/logo.svg` (só o círculo) segue como favicon.

## Por que existe

O cadastro de parceiro integrador da Domínio (Thomson Reuters) pede o **site institucional** da empresa que desenvolve o sistema:
https://www.dominiosistemas.com.br/solucoes/integracao-com-erp/#Parceiro

O site precisa passar a credibilidade de uma empresa de software. Fica pronto antes de enviar esse cadastro.

## Decisões (2026-10-06)

- **Conteúdo:** serviços sob medida, portfólio de projetos e contato.
- **Não citar a Conthax** nem clientes pelo nome sem autorização. (Atualização 2026-10-07: o Gabriel autorizou a logo da Conthax na lista de clientes.)
- **Identidade visual:** a mesma do orçamento do ContabiA (`C:\xampp\htdocs\ContabIA\orcamento\orcamento.html`):
  - nome: era "VZ Tech · Automação com IA"; **trocado em 2026-10-07 por "VZ Soluções em Tecnologia"** (ver Logo, no topo);
  - azul `#0B40CE` (variações `#1157EA` e `#0A2D89`), fundo claro `#EAF0FD`, texto `#111827` e `#4A5468`.
- **Site estático:** HTML, CSS e um pouco de JS, sem etapa de build. Publicado na Hostinger.
- **Domínio:** ainda não existe. O Gabriel compra até 2026-10-07. Até lá, o site é desenvolvido localmente (http://localhost/vztech/ pelo XAMPP, ou abrindo o `index.html`).

## Nova direção (2026-10-06, Gabriel)

- A VZ Tech está deixando de ser **assistência técnica** e virando **software house e consultoria**. O Instagram (@vztech.assistencia) vai mudar, mas o **logo continua** (ícone de servidor + "VZTECH", recriado em `assets/logo.svg`).
- O site é **tecnológico**: tema escuro, animações, cena 3D (Three.js) no topo.
- Seções: serviços (apps, sistemas, integrações, automação, sites e IA). **A IA é só mais um serviço**, sem destaque: nada de "Desenvolvimento com IA" nem de IA no topo, no processo ou na consultoria, apps de exemplo, **sistemas prontos**, como trabalhamos, **consultoria**, sobre e contato.
- **Não incluir** o sistema de oficina.
- WhatsApp: (11) 96498-1181 (trocado em 2026-10-13; antes 99683-5864). Região: Várzea Paulista / Jundiaí.

- **Visual (2026-10-06, 2ª rodada):** fundo branco brincando com azul brilhante; navegação como "descobrir aos poucos": manifesto que acende com a rolagem, trajetória com linha que se desenha, rolagem suave (Lenis), parallax, logos coloridos de tecnologias (`assets/tech/`, da Devicon), ícones de redes, e apps em blocos com celular 3D que gira com o mouse.
- Logos de **parceiros/clientes** só com autorização; por enquanto são logos de tecnologias.
- **Quem somos (2026-10-07, Gabriel):** o manifesto saiu (texto grande demais). No lugar, um editor de código digita o HTML da seção (a preview aparece crua) e depois um CSS que é aplicado ao vivo na preview, "pra pessoa sentir que nós codamos tecnologia". O texto fica em `.ide-site` no `index.html`; o CSS digitado, em `cssQuemSomos` no `main.js`. Localização: **Jundiaí - SP**.
- Título do topo um pouco menor (2026-10-07).
- **Cases (seção #apps, 2026-10-07):** um palco só, um case por vez. Um dock embaixo (gerado dos `<article class="app">`) troca o case; o aparelho vira coletor (ScanTE, relay) ou celular (estudos, chatbot). A barrinha do dock é o relógio (6 s); pausa com o mouse sobre a seção. **Não mostrar se o Gabriel é dono ou sócio**: são cases para outras empresas verem. A plataforma de estudos é o caso de **desenvolvimento com IA** (exceção pedida por ele à regra de não destacar IA). O "Coletores" antigo era o próprio ScanTE (emulador Telnet/SSH, não leitura por câmera).
- **Cases (lista atual):** ScanTE (coletor), ScanTE Browser (coletor), Relay de conexões (notebook, nome do produto a confirmar), AprovIA (aproviaedu.com.br, iPhone, tela recriada do print do app), IA de atendimento para contabilidade (notebook), Chatbot com IA no WhatsApp (iPhone), Delivery com cardápio digital (iPhone). A troca é por uma **lista numerada** ao lado do aparelho (o dock foi rejeitado); sem balões de destaque.
- **Coletor:** o Gabriel quer a **foto real do Urovo** que ele mandou, com a tela da ScanTE por cima. Falta ele salvar a imagem em `assets/apps/coletor.png`; até lá fica o coletor desenhado em CSS (que ele não gostou).
- **Clientes (2026-10-07, Gabriel):** seção #clientes com logos em `assets/clientes/`: Auticode, Conthax (sem link: site em desenvolvimento; ele autorizou citar), ScanTE e AprovIA (ícone do site + texto em Poppins).
- **SaaS (2026-10-07):** destacar que desenvolvemos e damos manutenção em SaaS: card largo no topo dos serviços, palavra "SaaS" no título do topo e nos selos.
- **Revisão de design (2026-10-13, Gabriel escolheu):** passada com as skills design-taste-frontend e web-design-guidelines. Etiquetas (`.kicker`) só no topo, Quem somos, Cases e Consultoria (as outras seções se explicam pelo título); a **faixa azul inclinada saiu** (repetia as tecnologias do carrossel de logos); serviços em **mosaico** no computador (Apps alto e azul, Sistemas web e Sites largos). Ele **manteve a Inter** e o ícone de rolar no topo. Os selos do topo ficam (pedido dele, por causa do SaaS).
- **Consultoria (2026-10-13, Gabriel):** a trajetória "Da bancada de conserto ao código" (assistência técnica → software house) **saiu**; a linha que se desenha agora mostra as 5 etapas da consultoria, logo depois de Serviços e antes das Tecnologias. O card azul de consultoria saiu (repetia). Menu na ordem da página: Sobre (→ Quem somos), Serviços, Consultoria, Cases, Sistemas prontos. Título dos clientes: "Alguns de nossos clientes".

- **IA para empresas (2026-10-15, Gabriel):** produto próprio, **exceção pedida por ele** à regra de não destacar IA. O **Ayran** é a IA da VZ (vitrine); o que se vende é a **IA da sua empresa**, em que cada cliente tem a sua, com o nome dela. Fonte: o doc "Ayran: Visão do Projeto e Protótipo" no Claude Docs (https://claude.ai/artifact/G8WrR16tRwXSLgVQXeLXp2). CTA: **"Agende uma demonstração"** (WhatsApp com mensagem própria). Inspiração de tom: ateliware.com/pt-br.
  - Página inicial: bloco escuro `#ia` logo depois de Serviços + item "IA para empresas" no menu (o menu vira botão abaixo de 1100 px por causa dos 6 itens).
  - Página **`ia/index.html`** (vztecnologia.com.br/ia/): é a **página dos anúncios** (Instagram/Facebook). Topo enxuto (logo + CTA, sem menu), sem Three.js nem Lenis, CTA visível sem rolar no celular, prévia de link (`assets/ayran/og.jpg`). Painel de personalização no estilo da imagem de referência dele (núcleo com o nome da IA trocando, 6 módulos ligados por linhas, indicadores e alertas), com legenda de que é ilustração.
  - **Não mostrar no site:** hardware (GPU, notebook), rede de terceiros, nomes da equipe, ferramentas internas, logos de ERPs não integrados. **Nada de "Em teste" ou "Em desenvolvimento" no site (2026-10-15, Gabriel):** como cada IA é montada sob medida, tudo aparece como o que a VZ oferece e constrói para o cliente (seção "Montada sob medida para a sua empresa"). Escrever como oferta ("pode ter", "montamos"), sem afirmar que já roda em clientes.
  - **Foco da página (2026-10-15, Gabriel):** passar **exclusividade e segurança**, e a IA **centralizando todas as informações da empresa** (título do painel e texto do topo). Quatro compromissos logo depois do topo: **exclusiva** (ambiente separado, nome e marca da empresa), **aprende com o negócio** (documentos, decisões, vocabulário e retorno da equipe; o aprendizado fica só com o cliente, nada treina modelos de terceiros), **ajuda a tomar decisões** (apoio, com a empresa no comando) e **segura e sob o seu controle**. Ordem: topo, compromissos, painel, vitrine, aprende, segurança, Ayran em uso, sob medida, como começa, CTA.
  - **Vitrine de telas (referência de app que ele mandou):** 6 celulares (boas-vindas, início, chat, agenda, painel, equipe) que mudam por segmento. **Segmentos escolhidos pelo Gabriel (2026-10-15):** Contabilidade (Max, Ribeiro Contabilidade), Advocacia (Clara, Andrade & Lopes), Clínicas em geral (Nina, Clínica Vitta), Logística (Leo, TransLima) e Varejo e atacado (Bia, Casa Prado); muda cor, nome da IA, empresa e conteúdo. Empresas fictícias, com legenda. Textos no JSON `#vitrine-dados` do `ia/index.html`; gira sozinha a cada 5 s até a pessoa clicar.
  - Medição: `data-placement` nos blocos (`ia_home`, `lp_topo`, `lp_hero`, `lp_final`, `lp_rodape`, `lp_flutuante`) alimenta o `contact_click`. **Pixel da Meta** pronto em `assets/main.js` (`META_PIXEL_ID`, vazio = desligado): PageView e Contact.

## Próximos passos

- [x] **Prints do Ayran** (2026-10-15, enviados pelo Gabriel): `assets/ayran/ayran-escuro.webp` (Ayran, tema futurista: home #ia e seção "em uso") e `assets/ayran/lia-claro.webp` ("Lia by Ayran": a mesma IA com a marca da empresa, no topo da /ia/ e na seção "em uso"). Cortados 40 px à direita (barra de rolagem). O `og.jpg` foi refeito com a tela da Lia. O escudo anti-golpe do print entrou na segurança
- [ ] **ID do Pixel da Meta** em `META_PIXEL_ID` (`assets/main.js`) antes de ligar os anúncios. Avaliar aviso de cookies/privacidade (LGPD) antes de ativar o Pixel
- [ ] Ao publicar: o zip precisa levar também `ia/index.html` e `assets/ayran/` (o empacotamento antigo só lia o `index.html` da raiz)

- [x] História do Gabriel no Quem somos (2026-10-07): condensada de ~300 para ~145 palavras em 3 `<p>` em `.ide-site`; etiquetas = trajetória (agências, setor público, fábricas de software, área fiscal). O editor acompanha a altura e o texto é digitado palavra por palavra (máx. ~2,5 s)
- [ ] A história original cita a **Ambev** (cliente de uma fábrica de software onde ele trabalhou). Ficou de fora ("clientes de expressão nacional") pela regra de não citar clientes sem autorização: confirmar com o Gabriel
- [x] Trajetória da seção Sobre (assistência técnica) e "Várzea Paulista": a seção virou a Consultoria (2026-10-13)
- [x] Rolagem horizontal de 33px: era a faixa inclinada, que saiu (2026-10-13)
- [ ] O Windows deste PC está com "reduzir movimento" ligado: o site respeita isso e mostra tudo parado. Para ver as animações, ligar "Efeitos de animação" no Windows (ou testar no celular)
- [x] Revisão do site com animações ligadas e no celular concluída (2026-10-13, Gabriel)
- [ ] Trocar as telas desenhadas em CSS pelos prints reais dos apps
- [x] Repositório: https://github.com/gabrielvanzella1/siteVZ (branch main)

## Pendências (perguntar ao Gabriel)

- [x] Domínio: **https://vztecnologia.com.br** (no ar desde 2026-10-13), em hospedagem própria do Gabriel, separada da sociedade com o Jorge; ver "Publicar" abaixo
- [x] CNPJ no rodapé (2026-10-13): 61.274.889/0001-90. O Gabriel pediu para **não mostrar a razão social** (tem o nome dele)
- [ ] Quais projetos entram no portfólio e o que pode ser mostrado (prints, nomes). Há projetos em `C:\xampp\htdocs` (hortifrut/delivery, oficina, estuda-concursos…)
- [x] E-mail de contato (2026-10-13): contato@vztecnologia.com.br (no lugar do Gmail). WhatsApp (11) 96498-1181
- [x] Textos finais dos serviços revisados (2026-10-13, Gabriel)
- [x] Caminho de contato reforçado (2026-10-13): CTAs principais abrem WhatsApp com mensagem contextual; links WhatsApp/e-mail geram evento `contact_click` no `dataLayer`, com método e posição do CTA.
- [x] Sinais de confiança revisados (2026-10-13): contato exibe a marca, localização em Jundiaí - SP e CNPJ; logos publicados seguem autorizações já registradas. A promessa vaga de resposta rápida foi substituída por uma explicação do próximo passo.
- [ ] **Google Analytics 4** (2026-10-13): direto pelo gtag, sem Tag Manager, em `assets/analytics.js` (site e blog). Falta o Gabriel criar a propriedade e mandar o ID `G-...` para trocar em `GA_ID`; enquanto for o marcador, nada do Google carrega. Tem aviso de cookies (LGPD) com modo de consentimento do Google. O evento `contact_click` (WhatsApp/e-mail, com meio e posição) saiu do `main.js` e foi para o `analytics.js`.
- [ ] **Google (2026-10-13):** guia completo em `docs/google.md` (Analytics, Search Console via TXT no Cloudflare, Perfil da Empresa, Bing, redirecionamento do www). O Gabriel segue os passos; o site já tem canonical, Open Graph (`assets/marca/og-vz.jpg`), JSON-LD da empresa, `robots.txt` (bloqueia `/active/`) e `sitemap.xml`.
- [ ] Atualizar o link do Instagram quando o perfil migrar de @vztech.assistencia para a marca VZ Soluções em Tecnologia.

## Publicar (Hostinger)

- O site usa a hospedagem própria do Gabriel: `ssh hostinger-scante` (alias no `~/.ssh/config`), pasta `~/domains/vztecnologia.com.br/public_html`. Na frente fica o Cloudflare (o e-mail aparece como `email-protection` no HTML: é a proteção dele, o navegador mostra normal).
- **O `public_html` é dividido**: tem o sistema PHP `active/` (gestão de ativos, responde 403 na raiz), um backup `active.bak_*`, o `default.php` da Hostinger e um `.htaccess` com regra de IP do hPanel. **Nunca** usar o deploy de site estático da Hostinger (`hosting_deployStaticSiteArchiveV1`): ele apaga a pasta inteira.
- Como publicar: zip só com `index.html`, `robots.txt`, `sitemap.xml`, as pastas `blog/` e `consultoria/` e os `assets/` citados (nunca `docs/`, `web kit vz/` nem `CLAUDE.md`) → `scp` para `~/` → `unzip -o` dentro do `public_html` → `chmod 644` nos arquivos e `755` nas pastas (o zip do Windows traz 666) → conferir com `curl` **a partir do servidor**.
- **Cache do Cloudflare:** CSS e JS ficam 7 dias em cache. Por isso as páginas chamam `style.css`, `main.js` e `analytics.js` com `?v=AAAAMMDD`: **a cada publicação que mexer em CSS/JS, trocar a data em todas as páginas** (`index.html`, `blog/*.html`, `consultoria/index.html`). Neste PC (casa) o alias SSH é `active-hostinger` (mesma conta u508103998). Backup antes de publicar: `~/backup_vz_AAAAMMDD.tar.gz` no servidor.
- Nesta rede da empresa, o firewall (Fortinet) intercepta o HTTPS do `auth.hostinger.com` e do próprio vztecnologia.com.br. Por isso o MCP da Hostinger não loga e o site não abre direto daqui. O SSH (porta 65002) passa.

## Estrutura

- `index.html`: página única: Início, Quem somos, Serviços, Consultoria, Tecnologias, Cases, Clientes, Sistemas prontos, Como trabalhamos e Contato
- `blog/`: `index.html` (lista) e um `.html` por artigo, com caminhos relativos (`../assets/`). Artigo novo: copiar um existente, trocar título, description, canonical, og, JSON-LD e texto; acrescentar na lista do `blog/index.html` (mais novo primeiro) e no `sitemap.xml`. Os 3 primeiros (2026-10-13) foram escritos pelo Claude e precisam da revisão do Gabriel
- `consultoria/index.html` (2026-10-13, pedido do Gabriel: página própria "com mais informações"): para quem é, as 5 frentes detalhadas, como funciona (linha fixa, sem JS), entregáveis, formatos (diagnóstico pontual e acompanhamento contínuo), perguntas frequentes (com JSON-LD FAQPage) e chamada final. O menu "Consultoria" da página inicial leva para ela; a seção da página inicial ficou como resumo com o botão "Conheça a consultoria". Textos escritos pelo Claude, a revisar com o Gabriel: os formatos e a frase "o plano é seu: dá para executar com outro fornecedor" são promessas comerciais
- Páginas internas (blog e consultoria) usam o cabeçalho `.topo-interno` e não carregam o `main.js` (ele é só da página inicial)
- `robots.txt` e `sitemap.xml` na raiz (o Cloudflare acrescenta comentários próprios no começo do robots.txt; é normal)
- `docs/`: guias internos, não vão para a hospedagem
- `assets/`: estilos, scripts e imagens
