import "server-only";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { getPastEvents, getUpcomingEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";
import { getChapter, getChapters, getGoverningBodies, getNuclei, getNucleus } from "@/lib/data/organization";
import { getPage } from "@/lib/data/pages";
import { getJournalIssues, getPublicationCategories, getPublications } from "@/lib/data/publications";
import { getCourses } from "@/lib/data/training";
import type { Course, EventType, NewsCategory, PublicationCategory } from "@/lib/types";

/*
 * Ferramentas do assistente virtual. Cada uma chama a camada de dados (src/lib/data) e devolve JSON compacto,
 * com o URL da página respectiva para o assistente poder ligar para o site.
 * Fase 1: os corpos (HTML) dos conteúdos de exemplo são lorem ipsum, por isso só se devolvem resumos.
 * Fase 2: acrescentar o corpo convertido em texto onde for útil (notícias, páginas, capítulos).
 */

const json = (data: unknown) => JSON.stringify(data);

/** Pesquisa simples sem acentos nem maiúsculas. */
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
const matches = (term: string | undefined, ...fields: (string | undefined)[]) =>
  !term || fields.some((f) => f && normalize(f).includes(normalize(term)));

const eventTypes = ["Congresso", "Curso", "Reunião", "Webinar", "Conferência"] as const satisfies EventType[];
const newsCategories = [
  "Sociedade",
  "Formação",
  "Publicações",
  "Congresso",
  "Investigação",
  "Capítulos",
] as const satisfies NewsCategory[];
const publicationSlugs = [
  "revista",
  "publicacoes-spcir",
  "guias-clinicos",
  "publicacoes-internacionais",
] as const satisfies PublicationCategory["slug"][];

const courseKinds = {
  programa: { label: "Programa Formativo para o Internato", url: "/formacao/programa-formativo" },
  outra: { label: "Outras Formações/Cursos", url: "/formacao/outras-formacoes" },
  estagio: { label: "Estágios Formativos", url: "/formacao/estagios-formativos" },
} satisfies Record<Course["kind"], { label: string; url: string }>;

const courseStatus: Record<Course["status"], string> = {
  open: "Inscrições abertas",
  soon: "Brevemente",
  full: "Esgotado",
  closed: "Encerrado",
};

/** Páginas institucionais e o respectivo URL no site. */
const pageUrls = {
  "mensagem-do-presidente": "/spcir/mensagem-do-presidente",
  "regulamento-eleitoral": "/spcir/regulamento-eleitoral",
  "comissao-de-internos": "/comissao-de-internos",
  "club-dos-doutorandos": "/club-dos-doutorandos",
  "pedido-de-patrocinio": "/pedido-de-patrocinio",
  "registo-nacional-cancro-recto": "/registo-nacional-cancro-recto",
  "politica-de-privacidade": "/politica-de-privacidade",
  "termos-de-utilizacao": "/termos-de-utilizacao",
} as const;
type PageSlug = keyof typeof pageUrls;

const searchEvents = betaZodTool({
  name: "pesquisar_eventos",
  description:
    "Pesquisa eventos da agenda da SPCir e de parceiros (congressos, cursos, reuniões, webinars, conferências). " +
    "Devolve título, tipo, datas, local, organizador e URL. Usar para perguntas sobre agenda, datas e locais.",
  inputSchema: z.object({
    periodo: z.enum(["proximos", "passados"]).describe("Eventos futuros (por omissão) ou já realizados.").optional(),
    tipo: z.enum(eventTypes).optional(),
    capitulo: z.string().describe("Slug de um Capítulo, para filtrar os eventos desse Capítulo.").optional(),
    termo: z.string().describe("Palavra a procurar no título, descrição ou local (ex.: 'Porto', 'hérnia').").optional(),
  }),
  run: async ({ periodo = "proximos", tipo, capitulo, termo }) => {
    const events = periodo === "passados" ? await getPastEvents() : await getUpcomingEvents();
    const results = events
      .filter((e) => (!tipo || e.type === tipo) && (!capitulo || e.chapterSlug === capitulo))
      .filter((e) => matches(termo, e.title, e.excerpt, e.location, e.city, e.organizer))
      .slice(0, 10)
      .map((e) => ({
        titulo: e.title,
        tipo: e.type,
        inicio: e.startsAt,
        fim: e.endsAt,
        local: [e.location, e.city].filter((v, i, a) => v && a.indexOf(v) === i).join(", "),
        organizador: e.organizer ?? (e.spcirOrganized ? "SPCir" : undefined),
        resumo: e.excerpt,
        capitulo: e.chapterSlug,
        url: `/eventos/${e.slug}`,
        site_externo: e.externalUrl,
      }));
    return json({ total: results.length, eventos: results });
  },
});

const searchCourses = betaZodTool({
  name: "pesquisar_cursos",
  description:
    "Pesquisa cursos de formação: Programa Formativo para o Internato (internos de Cirurgia Geral), " +
    "outras formações/cursos e estágios formativos. Devolve datas, local, destinatários, vagas, estado das inscrições e preço.",
  inputSchema: z.object({
    tipo: z.enum(["programa", "outra", "estagio"]).optional(),
    apenas_inscricoes_abertas: z.boolean().optional(),
    termo: z
      .string()
      .describe("Palavra a procurar no título, resumo, local ou destinatários (ex.: '1.º ano').")
      .optional(),
  }),
  run: async ({ tipo, apenas_inscricoes_abertas, termo }) => {
    const courses = await getCourses(tipo);
    const results = courses
      .filter((c) => !apenas_inscricoes_abertas || c.status === "open")
      .filter((c) => matches(termo, c.title, c.summary, c.location, c.audience))
      .map((c) => ({
        titulo: c.title,
        tipo: courseKinds[c.kind].label,
        resumo: c.summary,
        inicio: c.startsAt,
        fim: c.endsAt,
        local: c.location,
        destinatarios: c.audience,
        vagas: c.seats,
        vagas_disponiveis: c.status === "open" ? c.seatsLeft : undefined,
        estado: courseStatus[c.status],
        exclusivo_socios: c.membersOnly ?? false,
        preco_socio: c.priceMember,
        url: courseKinds[c.kind].url,
      }));
    return json({
      total: results.length,
      cursos: results,
      nota: "A inscrição nos cursos com inscrições abertas é feita na Área Reservada (/area-reservada).",
    });
  },
});

const searchNews = betaZodTool({
  name: "pesquisar_noticias",
  description: "Pesquisa as notícias publicadas no site, da mais recente para a mais antiga.",
  inputSchema: z.object({
    categoria: z.enum(newsCategories).optional(),
    termo: z.string().describe("Palavra a procurar no título ou resumo.").optional(),
    limite: z.number().int().min(1).max(10).describe("Número máximo de resultados (por omissão 5).").optional(),
  }),
  run: async ({ categoria, termo, limite = 5 }) => {
    const news = await getNews();
    const results = news
      .filter((n) => (!categoria || n.category === categoria) && matches(termo, n.title, n.excerpt))
      .slice(0, limite)
      .map((n) => ({
        titulo: n.title,
        categoria: n.category,
        data: n.publishedAt,
        resumo: n.excerpt,
        url: `/noticias/${n.slug}`,
      }));
    return json({ total: results.length, noticias: results });
  },
});

const listChapters = betaZodTool({
  name: "listar_capitulos_e_nucleos",
  description:
    "Lista os Capítulos (áreas de diferenciação da Cirurgia Geral) e os Núcleos da SPCir, com slug, resumo e URL.",
  inputSchema: z.object({}),
  run: async () => {
    const [chapters, nuclei] = await Promise.all([getChapters(), getNuclei()]);
    return json({
      capitulos: chapters.map((c) => ({ slug: c.slug, nome: c.name, resumo: c.summary, url: `/capitulos/${c.slug}` })),
      nucleos: nuclei.map((n) => ({ slug: n.slug, nome: n.name, resumo: n.summary, url: `/nucleos/${n.slug}` })),
    });
  },
});

const getChapterOrNucleus = betaZodTool({
  name: "obter_capitulo_ou_nucleo",
  description:
    "Detalhe de um Capítulo ou Núcleo: coordenação e próximos eventos. Obter o slug com listar_capitulos_e_nucleos.",
  inputSchema: z.object({ slug: z.string() }),
  run: async ({ slug }) => {
    const chapter = await getChapter(slug);
    if (chapter) {
      const events = await getUpcomingEvents({ chapter: slug, limit: 5 });
      return json({
        tipo: "Capítulo",
        nome: chapter.name,
        resumo: chapter.summary,
        coordenacao: chapter.coordination.map((p) => ({ nome: p.name, cargo: p.role, instituicao: p.institution })),
        proximos_eventos: events.map((e) => ({ titulo: e.title, inicio: e.startsAt, url: `/eventos/${e.slug}` })),
        url: `/capitulos/${chapter.slug}`,
      });
    }
    const nucleus = await getNucleus(slug);
    if (nucleus) {
      return json({
        tipo: "Núcleo",
        nome: nucleus.name,
        resumo: nucleus.summary,
        coordenacao: nucleus.coordination.map((p) => ({ nome: p.name, cargo: p.role, instituicao: p.institution })),
        url: `/nucleos/${nucleus.slug}`,
      });
    }
    return json({ erro: `Não existe nenhum Capítulo ou Núcleo com o slug "${slug}".` });
  },
});

const governingBodies = betaZodTool({
  name: "obter_orgaos_sociais",
  description: "Composição dos Órgãos Sociais da SPCir: Direcção, Assembleia Geral e Conselho Fiscal.",
  inputSchema: z.object({}),
  run: async () => {
    const bodies = await getGoverningBodies();
    return json({
      orgaos: bodies.map((b) => ({
        orgao: b.title,
        membros: b.members.map((m) => ({ nome: m.name, cargo: m.role, instituicao: m.institution })),
      })),
      url: "/spcir/orgaos-sociais",
    });
  },
});

const searchPublications = betaZodTool({
  name: "pesquisar_publicacoes",
  description:
    "Pesquisa publicações: Revista Portuguesa de Cirurgia (números publicados), Publicações SPCir, " +
    "Guias Clínicos e Publicações Internacionais. Indica se o documento é exclusivo para sócios.",
  inputSchema: z.object({
    categoria: z.enum(publicationSlugs).optional(),
    termo: z.string().describe("Palavra a procurar no título, descrição ou autores.").optional(),
  }),
  run: async ({ categoria, termo }) => {
    const categories = (await getPublicationCategories()).filter((c) => !categoria || c.slug === categoria);
    const result = await Promise.all(
      categories.map(async (c) => ({
        categoria: c.title,
        url: `/publicacoes/${c.slug}`,
        publicacoes: (await getPublications(c.slug))
          .filter((p) => matches(termo, p.title, p.description, p.authors))
          .slice(0, 8)
          .map((p) => ({
            titulo: p.title,
            ano: p.year,
            autores: p.authors,
            descricao: p.description,
            exclusivo_socios: p.membersOnly ?? false,
            link: p.membersOnly ? "/area-reservada" : (p.externalUrl ?? p.fileUrl),
          })),
      })),
    );
    const issues = !categoria || categoria === "revista" ? (await getJournalIssues()).slice(0, 4) : [];
    return json({
      categorias: result,
      revista_ultimos_numeros: issues.map((i) => ({
        numero: `Vol. ${i.volume}, n.º ${i.number}`,
        data: `${i.month} ${i.year}`,
        url: i.url,
      })),
    });
  },
});

const getContentPage = betaZodTool({
  name: "obter_pagina",
  description:
    "Resumo e anexos de uma página institucional (Mensagem do Presidente, Regulamento Eleitoral, Comissão de Internos, " +
    "Club dos Doutorandos, Pedido de Patrocínio Científico, Registo Nacional Cancro do Recto, Política de Privacidade, Termos).",
  inputSchema: z.object({ slug: z.enum(Object.keys(pageUrls) as [PageSlug, ...PageSlug[]]) }),
  run: async ({ slug }) => {
    const page = await getPage(slug);
    return json({
      titulo: page.title,
      resumo: page.intro,
      actualizado_em: page.updatedAt,
      anexos: page.attachments?.map((a) => ({ nome: a.label, link: a.href === "#" ? undefined : a.href })),
      url: pageUrls[slug],
    });
  },
});

export const chatTools = [
  searchEvents,
  searchCourses,
  searchNews,
  listChapters,
  getChapterOrNucleus,
  governingBodies,
  searchPublications,
  getContentPage,
];
