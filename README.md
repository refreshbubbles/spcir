# SPCir — Website e Backoffice

Novo website da **Sociedade Portuguesa de Cirurgia** com backoffice de gestão.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · Prisma 7 · MySQL/MariaDB

> **Fase 1 (actual):** mockup do template e arquitectura base. Os conteúdos são dados de exemplo em `src/lib/mock`.
> **Fase 2:** schema da BD, ligação Prisma, autenticação (sócios e backoffice), formulários com Server Actions.

## Arrancar

```bash
pnpm install          # também corre `prisma generate`
cp .env.example .env  # ajustar credenciais MySQL (só necessárias na fase 2)
pnpm dev              # http://localhost:3000  ·  backoffice em /admin
```

| Script | Descrição |
| --- | --- |
| `pnpm build` / `pnpm start` | Build e servidor de produção |
| `pnpm lint` · `pnpm typecheck` · `pnpm format` | Qualidade de código |
| `pnpm db:migrate` · `pnpm db:studio` | Prisma (fase 2) |

## Estrutura

```
prisma/schema.prisma            Schema da BD (modelos na fase 2)
prisma.config.ts                Configuração do Prisma CLI (DATABASE_URL)
public/brand/                   Logótipo SPCir (SVG limpo)
public/mock/                    Imagens de exemplo (do site actual)
src/
├─ app/
│  ├─ (site)/                   Website público (header, footer, barra mobile)
│  │  ├─ page.tsx               Homepage
│  │  ├─ spcir/ eventos/ noticias/ publicacoes/ capitulos/ nucleos/ formacao/ contactos/
│  │  ├─ quero-ser-socio/  area-reservada/  pedido-de-patrocinio/ …
│  │  └─ [...rest]/             404 dentro do layout do site
│  └─ admin/                    Backoffice (dashboard, notícias, restantes módulos em placeholder)
├─ components/
│  ├─ brand/                    Logo e símbolo (SVG inline, herdam a cor)
│  ├─ layout/                   Header, footer, page header, navegação de secção, templates
│  ├─ home/                     Secções da homepage (hero, acessos rápidos, destaques, …)
│  ├─ cards/                    Notícia, evento, curso, pessoa, ícones de capítulo
│  ├─ forms/                    Campos de formulário e MockForm
│  ├─ admin/                    Sidebar e componentes do backoffice
│  └─ ui/                       Botões, badges, links, media
├─ config/
│  ├─ site.ts                   Contactos, redes sociais, congresso em destaque
│  ├─ navigation.ts             Menu principal, acessos em destaque, footer
│  └─ admin-navigation.ts       Menu do backoffice
├─ lib/
│  ├─ data/                     Camada de acesso a dados (única fonte para as páginas)
│  ├─ mock/content.ts           Dados de exemplo (a substituir por Prisma)
│  ├─ types.ts                  Tipos de domínio → base para o schema Prisma
│  ├─ db.ts                     Cliente Prisma (adapter MariaDB)
│  └─ utils.ts                  cn(), formatação de datas pt-PT
└─ generated/prisma/            Cliente Prisma gerado (ignorado no git)
```

## Decisões de arquitectura

- **Camada de dados isolada.** As páginas só chamam funções de `src/lib/data/*`. Na fase 2 basta trocar o corpo
  dessas funções por queries Prisma (há um comentário `fase 2:` como guia) — páginas e componentes não mudam.
- **Cache Components.** As funções de dados usam `"use cache"` + `cacheLife` + `cacheTag`. O backoffice, após gravar,
  chama `revalidateTag(tags.news)` (ver `src/lib/data/cache.ts`) e o site actualiza sem rebuild.
- **Rotas dinâmicas** (`[slug]`) usam `generateStaticParams` e leem `params` dentro de `<Suspense>`, como exige o
  Partial Prefetching do Next 16. Não existe `dynamicParams` com Cache Components.
- **Menu e definições em `src/config`.** Estrutura igual ao site actual; poderá passar a ser editável no backoffice.
- **Design tokens** em `src/app/globals.css` (`@theme`): azul `#003b71`, tinta `#072435` e areia `#d2a98e` da
  identidade actual, numa paleta clara e minimalista. Tipografia Manrope (títulos) + Inter (texto).
- **Acessos em destaque** (Quero ser Sócio, Área Reservada, Congresso Anual) definidos uma vez em
  `primaryActions` e usados no header, barra do congresso, menu mobile, barra fixa mobile e homepage.
