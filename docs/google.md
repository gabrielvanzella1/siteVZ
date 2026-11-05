# Como colocar a VZ no Google

Guia para o site **vztecnologia.com.br** aparecer no Google e ter as visitas medidas. Faça na ordem: cada etapa depende da anterior.

O que já está pronto no site:

- títulos e descrições pensados para busca, com "Jundiaí" e os serviços;
- `robots.txt` e `sitemap.xml` (a lista de páginas que o Google deve ler);
- dados da empresa no formato que o Google entende (nome, telefone, e-mail, cidade, CNPJ, Instagram);
- imagem de compartilhamento (aparece no WhatsApp, LinkedIn e Facebook);
- blog com 3 artigos;
- Google Analytics pronto para ligar, com aviso de cookies (LGPD).

---

## 0. Publicar o site atualizado

O Google só vê o que está no ar. Antes de tudo, publique na Hostinger a versão nova, com a pasta `blog/` e os arquivos `robots.txt` e `sitemap.xml`. O passo a passo está em "Publicar" no `CLAUDE.md`.

Para conferir, abra no navegador:

- https://vztecnologia.com.br/sitemap.xml (tem que mostrar a lista de páginas)
- https://vztecnologia.com.br/blog/

---

## 1. Google Analytics 4 (medir as visitas)

1. Acesse https://analytics.google.com com a conta Google da empresa.
2. **Administrador › Criar › Conta**. Nome: `VZ Soluções em Tecnologia`.
3. Crie a **propriedade**: nome `vztecnologia.com.br`, fuso horário **Brasil (São Paulo)**, moeda **Real (BRL)**.
4. Responda o questionário do negócio (pode marcar "Gerar leads").
5. Em **Coleta de dados**, escolha **Web**, digite `https://vztecnologia.com.br` e o nome `Site VZ`. Deixe a **Medição otimizada** ligada.
6. Copie o **ID da métrica**, que começa com `G-` (por exemplo, `G-AB12CD34EF`).
7. **Mande esse ID para o Claude**. Ele coloca no arquivo `assets/analytics.js` (linha `GA_ID`) e publica. Sem o ID, o Analytics fica desligado.
8. Depois de publicado, em **Administrador › Coleta e retenção de dados › Retenção de dados**, mude para **14 meses**.

### Marcar os contatos como conversão

O site já envia um evento chamado `contact_click` quando alguém clica no WhatsApp ou no e-mail. Ele informa:

- o meio: `whatsapp` ou `email`;
- de onde veio o clique: topo, cases, blog, rodapé etc.

Para o Google contar esses cliques como contatos:

1. Espere um dia depois de publicar (o evento precisa aparecer pelo menos uma vez).
2. **Administrador › Exibição de dados › Eventos**.
3. Ache `contact_click` e ligue a estrela **Marcar como evento-chave**.

Assim, em **Relatórios › Aquisição** dá para ver de onde vêm as pessoas que chamam no WhatsApp.

### Sobre o aviso de cookies

Na primeira visita aparece um aviso no canto da tela com "Aceitar" e "Recusar".

- Quem aceita é medido normalmente.
- Quem recusa não recebe cookies; o Google ainda recebe sinais anônimos e estima esses números.

É o padrão recomendado pelo próprio Google e atende a LGPD.

---

## 2. Google Search Console (aparecer na busca)

O Search Console avisa o Google que o site existe e mostra por quais buscas as pessoas o encontram.

1. Acesse https://search.google.com/search-console com a mesma conta Google.
2. Clique em **Adicionar propriedade** e escolha **Domínio** (a opção da esquerda). Digite `vztecnologia.com.br`.
3. O Google mostra um registro **TXT** (começa com `google-site-verification=`). Copie.
4. O DNS do domínio está no **Cloudflare**. Lá:
   1. entre em https://dash.cloudflare.com e escolha `vztecnologia.com.br`;
   2. abra **DNS › Registros › Adicionar registro**;
   3. preencha: tipo **TXT**, nome **@**, conteúdo **o código copiado** e TTL **Auto**;
   4. salve.
5. Volte ao Search Console e clique em **Verificar**. Se der erro, espere uns 15 minutos e tente de novo.
6. No menu da esquerda, abra **Sitemaps**, digite `sitemap.xml` e clique em **Enviar**.
7. Em **Inspeção de URL** (a barra no topo), cole `https://vztecnologia.com.br/` e clique em **Solicitar indexação**. Repita para `https://vztecnologia.com.br/consultoria/` e `https://vztecnologia.com.br/blog/`.
8. Ligue o Search Console ao Analytics: no Analytics, abra **Administrador › Links de produtos › Links do Search Console**. Assim as buscas aparecem junto com as visitas.

**Quanto tempo leva:** a página inicial costuma aparecer quando alguém busca o nome da empresa em alguns dias. Para buscas como "desenvolvimento de sistemas Jundiaí", leva de semanas a meses, e é aí que o blog e o Perfil da Empresa ajudam.

---

## 3. Perfil da Empresa no Google (o mais importante para Jundiaí)

É o cartão que aparece no Google Maps e do lado direito da busca. Para uma empresa local, é o que mais traz contatos.

1. Acesse https://business.google.com e clique em **Gerenciar agora**.
2. Nome da empresa: `VZ Soluções em Tecnologia`. Use exatamente o mesmo nome do site.
3. **Categoria principal:** `Desenvolvedor de software`. Depois de criado, acrescente categorias secundárias, como `Consultor de informática` e `Serviço de desenvolvimento de aplicativos` (ou parecidas, conforme o Google sugerir).
4. **Local que os clientes podem visitar?** Se você não atende num escritório aberto ao público, responda **Não**. A empresa vira "empresa de área de serviço" e o endereço não aparece.
5. **Área atendida:** Jundiaí, Várzea Paulista, Campo Limpo Paulista, Itupeva, Louveira, Cabreúva e região.
6. **Telefone:** (11) 96498-1181. **Site:** `https://vztecnologia.com.br`.
7. Faça a **verificação** que o Google pedir (hoje costuma ser um vídeo curto mostrando o local de trabalho e algo que prove a empresa, como o cartão CNPJ ou o equipamento).
8. Depois de verificado, complete:
   - **logo e capa:** use `assets/marca/og-vz.jpg` como capa;
   - **descrição:** "Software house em Jundiaí - SP. Desenvolvemos sistemas sob medida, apps, SaaS e integrações com ERP para empresas, além de consultoria em tecnologia.";
   - **serviços:** um por item (Sistemas sob medida, Desenvolvimento de apps, SaaS, Integrações com ERP, Automação de processos, Sites, Consultoria em tecnologia);
   - **horário de atendimento**;
   - **fotos:** prints dos sistemas e apps (sem dados de clientes).
9. **Peça avaliações** aos clientes (Auticode, Conthax, AprovIA…). No painel do perfil, a opção **Pedir avaliações** gera um link para mandar no WhatsApp. Avaliações são o que mais sobe a empresa no Maps.
10. A cada artigo novo no blog, faça uma **postagem** no perfil com o link.

---

## 4. Bing (5 minutos)

O Bing também alimenta o ChatGPT e o Copilot.

1. Acesse https://www.bing.com/webmasters.
2. Escolha **Importar do Google Search Console**. Ele copia o site e o sitemap sozinho.

---

## 5. Ajuste no Cloudflare: www

Hoje `www.vztecnologia.com.br` abre o site, mas não redireciona para o endereço sem www. O site já indica ao Google qual é o endereço oficial (a tag canonical), então não é urgente, mas o ideal é redirecionar:

1. No Cloudflare, abra **Regras › Regras de redirecionamento › Criar regra**. Também dá para usar o modelo pronto "Redirect from WWW to root".
2. Configure:
   - **quando** o nome do host for igual a `www.vztecnologia.com.br`;
   - **redirecionar** para `https://vztecnologia.com.br` mantendo o caminho;
   - tipo **301**.

---

## 6. Para subir nas buscas com o tempo

- **Publique no blog com frequência:** um ou dois artigos por mês, respondendo dúvidas reais dos clientes. Cada artigo é uma porta de entrada no Google. Ideias:
  - quanto custa um sistema e do que depende o preço;
  - como funciona a manutenção de um SaaS;
  - coletor de dados na logística;
  - automação no WhatsApp para empresas;
  - LGPD em sistemas.
- **Consiga links para o site:**
  - peça aos clientes um "Desenvolvido por VZ Soluções em Tecnologia" com link no rodapé dos sites e sistemas que você fez;
  - crie a página da empresa no LinkedIn com o link.
- **Use os mesmos dados em todo lugar:** nome, telefone e site iguais no site, no Instagram, no LinkedIn e no Perfil da Empresa.
- **Atualize o Instagram:** troque o @ quando migrar e coloque o link do site na bio.
- **Acompanhe uma vez por mês no Search Console:**
  - em **Desempenho**, veja as buscas que já trazem visitas e escreva mais sobre elas;
  - em **Páginas**, veja se alguma página não foi indexada.

---

## Como publicar um artigo novo no blog

1. Copie um artigo existente em `blog/` (por exemplo, `blog/integracao-com-erp.html`) e renomeie com o assunto, em minúsculas e com hífens. Exemplo: `blog/quanto-custa-um-sistema.html`.
2. No arquivo novo, troque:
   - o `<title>`;
   - a `description`;
   - o `canonical`, o `og:url` e o `og:title`/`og:description`;
   - o bloco `ld+json` (título, descrição, datas e endereço);
   - o `<h1>`, a data e o texto.
3. Em `blog/index.html`, acrescente um item na lista. O mais novo vai primeiro.
4. Em `sitemap.xml`, acrescente a linha do artigo novo.
5. Publique e, no Search Console, peça a indexação do endereço novo.

Ou é só mandar o assunto para o Claude, que ele faz tudo isso.
