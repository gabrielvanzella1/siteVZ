# Site da VZ Tech

Site institucional da **VZ Tech · Automação com IA**, empresa do Gabriel Vanzella (desenvolvimento de sistemas, automação com IA e integrações).

## Por que existe

O cadastro de parceiro integrador da Domínio (Thomson Reuters) pede o **site institucional** da empresa que desenvolve o sistema:
https://www.dominiosistemas.com.br/solucoes/integracao-com-erp/#Parceiro

O site precisa passar a credibilidade de uma empresa de software. Fica pronto antes de enviar esse cadastro.

## Decisões (2026-10-06)

- **Conteúdo:** serviços sob medida, portfólio de projetos e contato.
- **Não citar a Conthax** nem clientes pelo nome sem autorização.
- **Identidade visual:** a mesma do orçamento do ContabiA (`C:\xampp\htdocs\ContabIA\orcamento\orcamento.html`):
  - nome **"VZ Tech · Automação com IA"**;
  - azul `#0B40CE` (variações `#1157EA` e `#0A2D89`), fundo claro `#EAF0FD`, texto `#111827` e `#4A5468`.
- **Site estático:** HTML, CSS e um pouco de JS, sem etapa de build. Publicado na Hostinger.
- **Domínio:** ainda não existe. O Gabriel compra até 2026-10-07. Até lá, o site é desenvolvido localmente (http://localhost/vztech/ pelo XAMPP, ou abrindo o `index.html`).

## Nova direção (2026-10-06, Gabriel)

- A VZ Tech está deixando de ser **assistência técnica** e virando **software house e consultoria**. O Instagram (@vztech.assistencia) vai mudar, mas o **logo continua** (ícone de servidor + "VZTECH", recriado em `assets/logo.svg`).
- O site é **tecnológico**: tema escuro, animações, cena 3D (Three.js) no topo.
- Seções: serviços (apps, sistemas, integrações, automação, sites e IA). **A IA é só mais um serviço**, sem destaque: nada de "Desenvolvimento com IA" nem de IA no topo, no processo ou na consultoria, apps de exemplo, **sistemas prontos**, como trabalhamos, **consultoria**, sobre e contato.
- **Não incluir** o sistema de oficina.
- WhatsApp: (11) 99683-5864. Região: Várzea Paulista / Jundiaí.

- **Visual (2026-10-06, 2ª rodada):** fundo branco brincando com azul brilhante; navegação como "descobrir aos poucos": manifesto que acende com a rolagem, trajetória com linha que se desenha, rolagem suave (Lenis), parallax, logos coloridos de tecnologias (`assets/tech/`, da Devicon), ícones de redes, e apps em blocos com celular 3D que gira com o mouse.
- Logos de **parceiros/clientes** só com autorização; por enquanto são logos de tecnologias.

## Próximos passos (retomar em 2026-10-07)

- [ ] Conferir a rolagem horizontal de ~18px no computador (a faixa inclinada; `overflow-x: clip` no body pode não bastar)
- [ ] O Windows deste PC está com "reduzir movimento" ligado: o site respeita isso e mostra tudo parado. Para ver as animações, ligar "Efeitos de animação" no Windows (ou testar no celular)
- [ ] Revisar o site inteiro com as animações ligadas (manifesto, trajetória, celulares 3D) e no celular
- [ ] Trocar as telas desenhadas em CSS pelos prints reais dos apps
- [ ] Repositório remoto: o Gabriel vai criar o projeto e mandar o link

## Pendências (perguntar ao Gabriel)

- [ ] Domínio e onde publicar (conta Hostinger)
- [ ] CNPJ e razão social da VZ Tech, para o rodapé
- [ ] Quais projetos entram no portfólio e o que pode ser mostrado (prints, nomes). Há projetos em `C:\xampp\htdocs` (hortifrut/delivery, oficina, estuda-concursos…)
- [ ] WhatsApp e e-mail de contato. Hoje é gabrielvanzella1@gmail.com; um e-mail do domínio passa mais credibilidade
- [ ] Logo, se existir; senão, criar a partir do nome
- [ ] Textos finais dos serviços

## Estrutura

- `index.html`: página única com as seções Início, Serviços, Portfólio, Sobre e Contato
- `assets/`: estilos, scripts e imagens
