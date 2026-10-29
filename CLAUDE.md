@AGENTS.md

# SPCir — Website e Backoffice

Novo website da **Sociedade Portuguesa de Cirurgia** (substitui https://www.spcir.com) com backoffice de gestão.
O website é feito a pensar sobretudo nos **sócios** e na **promoção das formações para os internos de Cirurgia Geral**.
Cliente: SPCir · Desenvolvimento: RBB (rbb.pt). Toda a interface está em **português europeu**.

## Estado actual

- **Fase 1 — Prova de conceito (CONCLUÍDA, 2026-10-26):** mockup do template e arquitectura base.
  Os conteúdos vêm de dados de exemplo em `src/lib/mock/content.ts`. Os formulários não enviam nada (`MockForm`).
  **Vai ser apresentada ao cliente. Aguarda aprovação antes de avançar.**
- **Assistente virtual (protótipo, 2026-10-29):** pedido pelo cliente na apresentação. Chatbot de IA (Claude API) que responde
  sobre eventos, cursos, notícias, Capítulos, etc., usando as funções de `src/lib/data/*` como ferramentas. Ver [Assistente virtual](#assistente-virtual).
- **Fase 2 — A seguir, depois da aprovação:** schema da BD, ligação Prisma, autenticação, backoffice funcional e formulários reais.
  Antes de começar, rever a secção [Dúvidas em aberto](#dúvidas-em-aberto) e registar o feedback do cliente.

## Stack

- Next.js 16.4 (App Router, **Cache Components** + **Partial Prefetching** activos), React 19, TypeScript
- Tailwind CSS 4 (tokens em `@theme` no `src/app/globals.css`), `lucide-react`, `clsx` + `tailwind-merge`
- Prisma 7 (`prisma-client` generator → `src/generated/prisma`) com o driver adapter `@prisma/adapter-mariadb`; BD MySQL/MariaDB
- `@anthropic-ai/sdk` + `zod` (assistente virtual)
- pnpm. Os builds nativos autorizados estão em `pnpm-workspace.yaml`.

## Comandos

```bash
pnpm dev          # desenvolvimento (http://localhost:3000, backoffice em /admin)
pnpm build        # build de produção: valida o prerendering de todas as rotas
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm format       # prettier + ordenação de classes Tailwind
pnpm db:generate | db:migrate | db:studio   # Prisma
```

Antes de dar uma tarefa por concluída, correr `pnpm typecheck && pnpm lint` e, se mexeu em rotas, `pnpm build`.

## Arquitectura

```
src/app/(site)/        Website público (layout: barra do congresso, header, footer, barra fixa mobile)
src/app/admin/         Backoffice (dashboard, notícias; restantes módulos = placeholder em [section])
src/app/api/chat/      Assistente virtual: POST com o histórico, resposta em streaming (NDJSON)
src/components/        brand · layout · home · cards · forms · admin · chat · ui
src/config/            site.ts (contactos, congresso) · navigation.ts (menu, acessos em destaque) · admin-navigation.ts
src/lib/data/          Camada de acesso a dados — ÚNICO ponto de onde as páginas obtêm dados
src/lib/mock/          Dados de exemplo da fase 1 (a remover na fase 2)
src/lib/types.ts       Tipos de domínio — ponto de partida para o schema Prisma
src/lib/db.ts          Cliente Prisma (singleton, adapter MariaDB, server-only)
src/lib/chat/          Assistente: ferramentas (tools.ts), instruções de sistema (prompt.ts), contrato com o widget, rate limit
prisma/schema.prisma   Ainda sem modelos
```

### Regras e convenções

- **As páginas nunca acedem ao Prisma directamente.** Usam sempre funções de `src/lib/data/*`. Na fase 2 troca-se o corpo
  dessas funções (há comentários `fase 2:` como guia) e as páginas mantêm-se.
- **Cache:** as funções de dados usam `"use cache"` + `cacheLife(...)` + `cacheTag(tags.x)`, com as tags em `src/lib/data/cache.ts`.
  Depois de gravar algo, o backoffice deve chamar `revalidateTag`/`updateTag` com a tag respectiva.
- **Rotas dinâmicas** (`[slug]`, `[categoria]`, `[tipo]`) seguem este padrão:
  - `generateStaticParams`;
  - a página é síncrona e devolve `<Suspense fallback={<DetailSkeleton />}>`;
  - um componente async interno faz `await params` e chama `notFound()` se o conteúdo não existir.

  Com Cache Components **não existem** `dynamicParams`, `dynamic` nem `revalidate`.
- **Hora actual:** não usar `new Date()` em Server Components fora de `"use cache"`, porque o build falha (ver `CurrentYear` no footer).
  A data de referência dos eventos está fixa em `src/lib/data/events.ts` (`TODAY`). Na fase 2 a filtragem passa para a query.
- **Componentes cliente que usam `usePathname`** (header, sidebar do admin) ficam dentro de `<Suspense>` no layout.
- **Menu:** a fonte é `mainNav` em `src/config/navigation.ts`. Para obter uma secção usar `navSection("/capitulos")`, nunca índices.
- **Acessos em destaque** (Quero ser Sócio, Área Reservada, Congresso Anual): estão definidos uma única vez em `primaryActions` e são
  usados no header, no menu mobile, na barra fixa mobile e na homepage. Devem estar **sempre visíveis**: é um requisito do cliente.
- **Estilos:**
  - Usar `cn()` de `src/lib/utils.ts`, que inclui o tailwind-merge com os tokens `rounded-card`, `shadow-soft`/`shadow-lift` e `font-display`.
  - Cores da marca: `brand-*` (azul `#003b71` = `brand-700`), `ink` (`#072435`), `sand-*` (acento `#d2a98e` = `sand-400`), `surface`, `line`, `muted`.
  - Tipografia: Manrope (títulos, `font-display`) e Inter (texto).
  - O site é **claro e minimalista**. Não há modo escuro.
- **Logótipo:** `<Logo />` e `<Symbol />` em `src/components/brand/logo.tsx` (SVG inline com `currentColor`). Não o substituir por PNG.
- **HTML do editor** é mostrado com a classe `.prose-spcir`.
- **Links:** `SmartLink`/`ButtonLink` tratam sozinhos os links externos (abrem em nova janela).
- **Ortografia:** o site actual usa a grafia anterior ao Acordo Ortográfico ("actividade", "Direcção", "selecção"). Manter essa grafia.
  Usar "Órgãos Sociais" (com acento) e "Hepato-Bilio-Pancreática".

### Assistente virtual

- Widget `ChatWidget` (botão flutuante + painel) no layout do site; chama `POST /api/chat`.
- O endpoint corre o *tool runner* do SDK (`client.beta.messages.toolRunner`) com as ferramentas de `src/lib/chat/tools.ts`.
  Cada ferramenta chama a camada de dados e devolve JSON com o URL da página, para o assistente poder pôr links.
  **Ao criar um conteúdo novo no site, acrescentar a ferramenta respectiva** (e a etiqueta em `toolActivity` no widget).
- Modelo: `claude-opus-5-5` com `effort: "low"` (configurável em `CHAT_MODEL`). Tem *prompt caching* e `fallbacks: "default"`
  (se o modelo recusar por política de segurança, a API repete noutro modelo). Precisa de `ANTHROPIC_API_KEY` no `.env`.
- O prompt de sistema tem de ser estável entre pedidos (sem horas nem ids), senão a cache não funciona.
- Regras do prompt: só responde sobre a SPCir, **não dá aconselhamento médico**, não inventa dados, PT-PT com a grafia antiga.
- Limites: 20 mensagens × 1500 caracteres por conversa, 20 perguntas por IP em 10 minutos (em memória), `max_iterations: 6`.
- Fase 1: os corpos dos conteúdos são lorem ipsum, por isso as ferramentas só devolvem resumos (ver comentário em `tools.ts`).

### Ver o resultado no browser

O Chromium headless do Playwright está em `~/.cache/ms-playwright/chromium_headless_shell-1243/`.
O binário é `chrome-headless-shell-linux64/chrome-headless-shell`. Para screenshots usar `--screenshot --window-size=W,H`.
Para testar interacções usar CDP via `--remote-debugging-port`, **contra `pnpm build && pnpm start`**: com o `pnpm dev`,
o HMR recarrega a página em ciclo no browser headless e os componentes cliente nunca ficam interactivos.

## Requisitos do cliente

- **Menu principal (estrutura igual à actual):**
  - SPCir: Mensagem do Presidente, Regulamento Eleitoral, Órgãos Sociais
  - Eventos
  - Notícias
  - Publicações: Revista, Publicações SPCir, Guias Clínicos, Publicações Internacionais
  - Capítulos (11)
  - Núcleos: História da Cirurgia, Sustentabilidade em Cirurgia
  - Formação: Programa Formativo para o Internato, Outras Formações/Cursos, Estágios Formativos
  - Contactos
- **Sempre visíveis e em destaque:** Quero ser Sócio · Área Reservada · Congresso Anual.
- **Homepage:**
  - hero com vários banners rotativos;
  - blocos de destaque: Comissão de Internos, Club dos Doutorandos, Revista Portuguesa de Cirurgia, Pedido de Patrocínio Científico.
- **Design:** moderno e apelativo, em tons claros e minimalistas, com o logótipo actual.

## Dúvidas em aberto

Para responder com o cliente antes ou durante a fase 2. Registar aqui a resposta e a data.

### Feedback da apresentação da prova de conceito
- [ ] Aprovação geral do design (cores, tipografia, densidade, homepage).
- [ ] Alterações pedidas: _(registar)_

### Funcionalidade
1. **Área Reservada:**
   - É só para sócios (quotas, inscrições em cursos, documentos, dados pessoais)?
   - Os utilizadores do backoffice (secretariado, direcção) usam o mesmo login ou um acesso separado?
   - Há perfis/permissões diferentes no backoffice (ex.: só editar notícias)?
   _Resposta:_
2. **Congresso:** continua num site à parte (`congresso.spcir.com/<ano>`) ou passa para dentro deste site, incluindo o arquivo de congressos anteriores (2017–2027) que o site actual tem?
   _Resposta:_
3. **Pagamento de quotas:**
   - Há algum meio de pagamento a integrar (Multibanco, MB WAY, Easypay, ifthenpay…)?
   - Ou a área reservada só mostra o estado das quotas?
   - Há emissão de recibos ou facturas?
   _Resposta:_
4. **Inscrição nos cursos do Programa Formativo:**
   - Basta a ordem de chegada ou há validação manual, lista de espera, limite por ano de internato, ou preço/pagamento?
   - Os cursos emitem certificados?
   _Resposta:_
5. **Adesão de sócios:**
   - Que campos são obrigatórios?
   - São precisos sócios proponentes?
   - Que categorias de sócio existem e quais os valores de quota?
   - Quem aprova os pedidos?
   _Resposta:_

### Conteúdos e migração
6. **Migração do site actual:** que conteúdos se migram (notícias desde que ano, eventos, publicações, documentos PDF, sócios)?
   Há acesso à BD actual (`panel.spcir.com`)?
   _Resposta:_
7. **Secções do site actual que não estão no menu pedido:**
   - "Direcções" e "Presidentes da Direcção" (histórico)
   - "Recomendações e Normas" (`/normas`)
   - "Registo Nacional Cancro do Recto" (`/rncr`)
   - "Advanced Trauma Life Support"
   - patrocinador em destaque no footer (Medtronic)

   Mantêm-se? Onde ficam?
   _Resposta:_
8. **URLs antigos:** confirmar a criação de redireccionamentos 301 (ex.: `/capitulo/10` → `/capitulos/coloproctologia`, `/noticia/351` → `/noticias/<slug>`).
   _Resposta:_
9. **Conteúdos reais em falta:** Órgãos Sociais (nomes e fotos), coordenação de cada Capítulo e Núcleo, Mensagem do Presidente,
   regulamentos em PDF e a lista real de cursos 2026/2027.
   _Resposta:_
10. **Newsletter:** é para ter? Com que ferramenta (Mailchimp, Brevo…)?
    _Resposta:_
11. **Idiomas:** só português, ou também inglês (ex.: para a Revista e o Congresso)?
    _Resposta:_

### Técnico
12. **Alojamento e deploy:** servidor próprio (Node + MariaDB) ou cloud? Versão de MySQL/MariaDB em produção? Como é feito o deploy?
    _Resposta:_
13. **Email transaccional** (confirmações de adesão, inscrições, recuperação de password): SMTP próprio ou outro serviço?
    _Resposta:_
14. **RGPD:** quanto tempo se guardam os dados, consentimentos e cookies de analytics (que ferramenta?).
    _Resposta:_

### Assistente virtual
15. **Assistente virtual:**
    - Que modelo usar? O custo por pergunta vai de cerca de $0,001 (Haiku 5.5) a $0,02–0,03 (Opus 5.5). Testar com perguntas reais antes de decidir.
    - Quem paga a conta da API (SPCir ou RBB)? Há um tecto mensal?
    - Guardam-se as conversas (para melhorar conteúdos)? Que aviso de RGPD aparece no widget?
    - Na fase 2, deve aceder aos dados do sócio na Área Reservada (quotas, inscrições)?
    _Resposta:_

## Plano da fase 2 (depois da aprovação)

1. Registar o feedback do cliente e as respostas acima.
2. Definir o schema Prisma a partir de `src/lib/types.ts`: Banner, Destaque, Notícia, Evento, Capítulo, Núcleo, Pessoa/Órgão,
   Categoria de publicação/Publicação, Número da revista, Curso, Inscrição, Página, Sócio, Quota, Pedido de adesão, Pedido de patrocínio,
   Mensagem de contacto, Utilizador/Perfil e Definições. Fazer a primeira migração.
3. Trocar `src/lib/mock` por queries Prisma em `src/lib/data/*` e apagar os mocks.
4. Autenticação (sócios e backoffice), proteger `/admin` e a Área Reservada (`proxy.ts` em vez do antigo `middleware.ts`;
   ver `node_modules/next/dist/docs/01-app/02-guides/authentication*.md`).
5. Módulos CRUD do backoffice, com upload de imagens/PDF e um editor rico (TipTap ou Lexical).
6. Formulários com Server Actions (contactos, adesão, patrocínio, inscrições) e envio de emails.
7. Filtros e paginação reais (notícias, eventos), pesquisa, SEO (sitemap, metadados OG) e redireccionamentos 301.
8. Migração de conteúdos e deploy.
