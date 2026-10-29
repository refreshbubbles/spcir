/**
 * Conteúdos de EXEMPLO para o mockup (fase 1).
 * Serão substituídos por consultas Prisma — ver src/lib/data/*.
 */
import type {
  Chapter,
  ContentPage,
  Course,
  EventItem,
  GoverningBody,
  HeroSlide,
  Highlight,
  JournalIssue,
  NewsArticle,
  Nucleus,
  PublicationCategory,
  PublicationItem,
} from "@/lib/types";
import { site } from "@/config/site";

const img = (name: string, alt: string) => ({ src: `/mock/${name}`, alt });

const loremBody = `
<p>A Sociedade Portuguesa de Cirurgia mantém o compromisso de promover a formação contínua, a partilha de conhecimento e a excelência da prática cirúrgica em Portugal, aproximando especialistas, internos e investigadores.</p>
<p>Esta iniciativa insere-se no plano de actividades da SPCir e conta com a participação de cirurgiões de vários centros hospitalares do país, num formato que privilegia a discussão de casos clínicos e a componente prática.</p>
<h2>Programa e objectivos</h2>
<ul>
  <li>Actualização das recomendações e da evidência científica mais recente;</li>
  <li>Discussão de casos clínicos em pequenos grupos;</li>
  <li>Sessões práticas com simuladores e modelos;</li>
  <li>Espaço de networking entre especialistas e internos.</li>
</ul>
<blockquote>A formação dos internos é uma prioridade estratégica para o futuro da cirurgia em Portugal.</blockquote>
<p>Para mais informações, contacte o secretariado através de <a href="mailto:${site.contacts.email}">${site.contacts.email}</a>.</p>
`;

export const heroSlides: HeroSlide[] = [
  {
    id: "congresso-2027",
    eyebrow: "Congresso Nacional · 11 e 12 Março 2027",
    title: "XLVII Congresso Nacional de Cirurgia",
    description:
      "Centro de Congressos de Lagoa, Algarve. Submissão de trabalhos até 15 de Novembro de 2026 — inscrições abertas.",
    image: img("hero-congresso-2027.png", "Cartaz do XLVII Congresso Nacional de Cirurgia"),
    cta: { label: "Inscrever-me", href: site.congress.url, external: true },
    secondaryCta: { label: "Submeter trabalho", href: site.congress.url, external: true },
  },
  {
    id: "cursos-internato",
    eyebrow: "Programa Formativo 2026/2027",
    title: "Cursos de formação para o Internato de Cirurgia Geral",
    description: "Inscrições abertas para sócios. As vagas são limitadas e a selecção é feita por ordem de inscrição.",
    image: img("hero-cursos-2026.png", "Cursos de formação para o Internato de Cirurgia Geral 2026"),
    cta: { label: "Ver cursos", href: "/formacao/programa-formativo" },
    secondaryCta: { label: "Tornar-me sócio", href: "/quero-ser-socio" },
  },
  {
    id: "revista",
    eyebrow: "Revista Portuguesa de Cirurgia",
    title: "Portuguese Journal of Surgery — Vol. 59, N.º 3",
    description: "Já está disponível o novo número, com acesso aberto a todos os artigos.",
    image: img("public.jpg", "Publicações científicas"),
    cta: { label: "Ler o novo número", href: "https://revista.spcir.com", external: true },
    secondaryCta: { label: "Submeter artigo", href: "/publicacoes/revista" },
  },
  {
    id: "socios",
    eyebrow: "Sócios SPCir",
    title: "Faça parte da comunidade cirúrgica portuguesa",
    description:
      "Condições especiais em cursos e congressos, acesso a conteúdos exclusivos e participação activa nos Capítulos.",
    image: img("aulas.jpg", "Sessão de formação"),
    cta: { label: "Quero ser Sócio", href: "/quero-ser-socio" },
    secondaryCta: { label: "Área Reservada", href: "/area-reservada" },
  },
];

export const highlights: Highlight[] = [
  {
    id: "internos",
    title: "Comissão de Internos",
    description: "Representa e apoia os internos de formação específica em Cirurgia Geral.",
    href: "/comissao-de-internos",
    image: img("comiss.jpg", "Comissão de Internos em Formação Específica da SPCir"),
    linkLabel: "Conhecer a Comissão",
  },
  {
    id: "doutorandos",
    title: "Club dos Doutorandos",
    description: "Espaço de partilha e apoio para cirurgiões em programas doutorais.",
    href: "/club-dos-doutorandos",
    image: img("clubdoutorandos.jpg", "Club dos Doutorandos"),
    linkLabel: "Saber mais",
  },
  {
    id: "revista",
    title: "Revista Portuguesa de Cirurgia",
    description: "Publicação científica oficial da SPCir, em acesso aberto.",
    href: "/publicacoes/revista",
    image: img("revista.jpg", "Revista Portuguesa de Cirurgia"),
    linkLabel: "Ler a Revista",
  },
  {
    id: "patrocinio",
    title: "Pedido de Patrocínio Científico",
    description: "Solicite o patrocínio científico da SPCir para o seu evento.",
    href: "/pedido-de-patrocinio",
    image: img("patroc.jpg", "Pedido de Patrocínio Científico SPCir"),
    linkLabel: "Fazer pedido",
  },
];

export const news: NewsArticle[] = [
  {
    slug: "xlvii-congresso-nacional-de-cirurgia-2027",
    title: "XLVII Congresso Nacional de Cirurgia 2027",
    excerpt:
      "É com enorme satisfação que vos convidamos a participar no XLVII Congresso Nacional de Cirurgia, nos dias 11 e 12 de Março de 2027, no Algarve.",
    category: "Congresso",
    publishedAt: "2026-10-20",
    image: img("hero-congresso-2027.png", "XLVII Congresso Nacional de Cirurgia"),
    body: loremBody,
    featured: true,
  },
  {
    slug: "bolsas-investigacao-oncologia-2027",
    title: "Bolsas de Investigação em Oncologia 2027 — candidaturas abertas",
    excerpt:
      "O Núcleo Regional do Sul da Liga Portuguesa Contra o Cancro anunciou a abertura de candidaturas às Bolsas de Investigação em Oncologia.",
    category: "Investigação",
    publishedAt: "2026-10-14",
    image: img("normas.jpg", "Bolsas de investigação"),
    body: loremBody,
  },
  {
    slug: "portuguese-journal-of-surgery-vol-59-n-3",
    title: "Portuguese Journal of Surgery (Vol. 59, N.º 3)",
    excerpt: "Já está disponível o novo número da Portuguese Journal of Surgery. Volume 59, Número 3.",
    category: "Publicações",
    publishedAt: "2026-10-06",
    image: img("public.jpg", "Portuguese Journal of Surgery"),
    body: loremBody,
  },
  {
    slug: "curso-de-investigacao-clinica",
    title: "Curso de Investigação Clínica",
    excerpt:
      "19 de Outubro de 2026, na Ordem dos Médicos do Porto. Uma iniciativa dirigida a internos e jovens especialistas.",
    category: "Formação",
    publishedAt: "2026-09-29",
    image: img("aulas.jpg", "Curso de Investigação Clínica"),
    body: loremBody,
  },
  {
    slug: "inscricoes-programa-formativo-2026-2027",
    title: "Inscrições abertas no Programa Formativo 2026/2027",
    excerpt:
      "Estão abertas as inscrições nos Cursos do Programa Formativo para o Internato de Cirurgia Geral, exclusivas para sócios.",
    category: "Formação",
    publishedAt: "2026-09-15",
    image: img("hero-cursos-2026.png", "Programa Formativo 2026/2027"),
    body: loremBody,
  },
  {
    slug: "reuniao-capitulo-coloproctologia",
    title: "Reunião anual do Capítulo de Coloproctologia",
    excerpt: "O Capítulo de Coloproctologia reuniu em Coimbra para discutir o Registo Nacional de Cancro do Recto.",
    category: "Capítulos",
    publishedAt: "2026-09-02",
    body: loremBody,
  },
  {
    slug: "eleicoes-orgaos-sociais",
    title: "Eleições para os Órgãos Sociais — calendário eleitoral",
    excerpt: "Consulte o calendário e o regulamento do próximo acto eleitoral da Sociedade Portuguesa de Cirurgia.",
    category: "Sociedade",
    publishedAt: "2026-08-21",
    body: loremBody,
  },
];

export const events: EventItem[] = [
  {
    slug: "iv-colorectal-talks-2026",
    title: "IV Colorectal Talks 2026",
    excerpt: "Três dias dedicados à cirurgia colorrectal, com sessões científicas e casos clínicos.",
    type: "Conferência",
    startsAt: "2026-10-28",
    endsAt: "2026-10-30",
    location: "Braga",
    city: "Braga",
    externalUrl: "https://www.instagram.com/colorectaltalks",
    body: loremBody,
    chapterSlug: "coloproctologia",
  },
  {
    slug: "evento-cientifico-cirurgia-cabeca-pescoco",
    title: "Evento científico — Cirurgia de Cabeça e Pescoço",
    excerpt:
      "O cancro da cabeça e do pescoço é o 7.º mais comum do mundo e tem um impacto particular na qualidade de vida.",
    type: "Reunião",
    startsAt: "2026-10-30",
    location: "Lisboa",
    city: "Lisboa",
    body: loremBody,
    spcirOrganized: true,
    chapterSlug: "cirurgia-endocrina-cabeca-pescoco",
  },
  {
    slug: "14-conferencia-british-hernia-society",
    title: "14.ª Conferência da British Hernia Society",
    excerpt:
      "A British Hernia Society convida todos os profissionais interessados a participar na sua conferência anual.",
    type: "Conferência",
    startsAt: "2026-11-30",
    endsAt: "2026-12-01",
    location: "Reino Unido",
    body: loremBody,
    chapterSlug: "cirurgia-parede-abdominal",
  },
  {
    slug: "curso-cirurgia-urgencia-2026",
    title: "Curso de Cirurgia de Urgência",
    excerpt: "Curso teórico-prático integrado no Programa Formativo para o Internato.",
    type: "Curso",
    startsAt: "2026-12-04",
    endsAt: "2026-12-05",
    location: "Hospital de Santa Maria, Lisboa",
    city: "Lisboa",
    body: loremBody,
    spcirOrganized: true,
  },
  {
    slug: "ehc26-european-headache-congress",
    title: "EHC26 — 20th European Headache Congress",
    excerpt: "Nos dias 9 a 12 de Dezembro de 2026 irá realizar-se o 20.º European Headache Congress.",
    type: "Congresso",
    startsAt: "2026-12-09",
    endsAt: "2026-12-12",
    location: "Lisboa",
    city: "Lisboa",
    body: loremBody,
  },
  {
    slug: "xlvii-congresso-nacional-de-cirurgia",
    title: "XLVII Congresso Nacional de Cirurgia",
    excerpt: "O principal encontro anual da cirurgia portuguesa regressa ao Algarve.",
    type: "Congresso",
    startsAt: "2027-03-11",
    endsAt: "2027-03-12",
    location: "Centro de Congressos de Lagoa",
    city: "Algarve",
    externalUrl: site.congress.url,
    image: img("hero-congresso-2027.png", "XLVII Congresso Nacional de Cirurgia"),
    body: loremBody,
    spcirOrganized: true,
  },
  {
    slug: "curso-investigacao-clinica-porto",
    title: "Curso de Investigação Clínica",
    excerpt: "Curso dirigido a internos e jovens especialistas.",
    type: "Curso",
    startsAt: "2026-10-19",
    location: "Ordem dos Médicos, Porto",
    city: "Porto",
    body: loremBody,
    spcirOrganized: true,
  },
  {
    slug: "webinar-cirurgia-robotica",
    title: "Webinar — Cirurgia Robótica em Portugal",
    excerpt: "Estado da arte, formação e acesso à cirurgia robótica no SNS.",
    type: "Webinar",
    startsAt: "2026-09-24",
    location: "Online",
    body: loremBody,
    spcirOrganized: true,
    chapterSlug: "cirurgia-robotica",
  },
];

const coordinators = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    name: "Nome Apelido",
    role: i === 0 ? "Coordenador" : "Secretário",
    institution: "Centro Hospitalar (exemplo)",
  }));

const chapterBody = `
<p>O Capítulo reúne os sócios da SPCir com especial interesse nesta área, promovendo a formação, a investigação e a uniformização de boas práticas a nível nacional.</p>
<h2>Missão</h2>
<ul>
  <li>Promover reuniões científicas e cursos de actualização;</li>
  <li>Elaborar recomendações e consensos nacionais;</li>
  <li>Fomentar registos e estudos multicêntricos;</li>
  <li>Colaborar com sociedades congéneres nacionais e internacionais.</li>
</ul>
`;

const chapterDefs: [slug: string, name: string, shortName: string, icon: string, summary: string][] = [
  [
    "cirurgia-bariatrica",
    "Cirurgia Bariátrica (Obesidade)",
    "Bariátrica",
    "Scale",
    "Tratamento cirúrgico da obesidade e da doença metabólica.",
  ],
  [
    "cirurgia-parede-abdominal",
    "Cirurgia da Parede Abdominal",
    "Parede Abdominal",
    "Layers",
    "Hérnias e reconstrução complexa da parede abdominal.",
  ],
  [
    "cirurgia-ambulatorio",
    "Cirurgia do Ambulatório",
    "Ambulatório",
    "Clock",
    "Organização, segurança e qualidade em regime de ambulatório.",
  ],
  [
    "cirurgia-endocrina-cabeca-pescoco",
    "Cirurgia Endócrina e da Cabeça e Pescoço",
    "Endócrina e Cabeça e Pescoço",
    "Activity",
    "Tiróide, paratiróides, supra-renais e patologia cervical.",
  ],
  [
    "cirurgia-esofago-gastrica",
    "Cirurgia Esófago-Gástrica",
    "Esófago-Gástrica",
    "Workflow",
    "Patologia benigna e oncológica do esófago e estômago.",
  ],
  [
    "cirurgia-hepato-bilio-pancreatica",
    "Cirurgia Hepato-Bilio-Pancreática",
    "HBP",
    "Droplets",
    "Cirurgia do fígado, vias biliares e pâncreas.",
  ],
  ["cirurgia-mamaria", "Cirurgia Mamária", "Mamária", "Ribbon", "Patologia mamária, oncoplastia e reconstrução."],
  ["cirurgia-robotica", "Cirurgia Robótica", "Robótica", "Bot", "Formação, acesso e inovação em cirurgia robótica."],
  ["cirurgia-vascular", "Cirurgia Vascular", "Vascular", "HeartPulse", "Abordagem cirúrgica da patologia vascular."],
  [
    "coloproctologia",
    "Coloproctologia",
    "Coloproctologia",
    "Waypoints",
    "Cólon, recto e ânus — da patologia benigna à oncológica.",
  ],
  [
    "cuidados-intensivos-trauma-urgencia",
    "Cuidados Intensivos, Trauma e Cirurgia de Urgência",
    "Trauma e Urgência",
    "Siren",
    "O doente crítico, o politraumatizado e a urgência cirúrgica.",
  ],
];

export const chapters: Chapter[] = chapterDefs.map(([slug, name, shortName, icon, summary]) => ({
  slug,
  name,
  shortName,
  icon,
  summary,
  body: chapterBody,
  coordination: coordinators(3),
}));

export const nuclei: Nucleus[] = [
  {
    slug: "historia-da-cirurgia",
    name: "História da Cirurgia",
    summary: "Preservar e divulgar a memória e o património da cirurgia portuguesa.",
    body: chapterBody,
    coordination: coordinators(2),
  },
  {
    slug: "sustentabilidade-em-cirurgia",
    name: "Sustentabilidade em Cirurgia",
    summary: "Promover práticas cirúrgicas ambientalmente responsáveis e eficientes.",
    body: chapterBody,
    coordination: coordinators(2),
  },
];

export const governingBodies: GoverningBody[] = [
  {
    title: "Direcção",
    members: [
      { name: "Nome Apelido", role: "Presidente" },
      { name: "Nome Apelido", role: "Vice-Presidente" },
      { name: "Nome Apelido", role: "Secretário-Geral" },
      { name: "Nome Apelido", role: "Tesoureiro" },
      { name: "Nome Apelido", role: "Vogal" },
      { name: "Nome Apelido", role: "Vogal" },
    ],
  },
  {
    title: "Assembleia Geral",
    members: [
      { name: "Nome Apelido", role: "Presidente" },
      { name: "Nome Apelido", role: "Vice-Presidente" },
      { name: "Nome Apelido", role: "Secretário" },
    ],
  },
  {
    title: "Conselho Fiscal",
    members: [
      { name: "Nome Apelido", role: "Presidente" },
      { name: "Nome Apelido", role: "Vogal" },
      { name: "Nome Apelido", role: "Vogal" },
    ],
  },
];

export const publicationCategories: PublicationCategory[] = [
  {
    slug: "revista",
    title: "Revista",
    description:
      "A Revista Portuguesa de Cirurgia (Portuguese Journal of Surgery) é a publicação científica oficial da SPCir.",
  },
  {
    slug: "publicacoes-spcir",
    title: "Publicações SPCir",
    description: "Livros, monografias e documentos editados pela Sociedade Portuguesa de Cirurgia.",
  },
  {
    slug: "guias-clinicos",
    title: "Guias Clínicos",
    description: "Recomendações e normas de orientação clínica elaboradas pelos Capítulos da SPCir.",
  },
  {
    slug: "publicacoes-internacionais",
    title: "Publicações Internacionais",
    description: "Consensos, guidelines e publicações de referência de sociedades internacionais.",
  },
];

export const journalIssues: JournalIssue[] = [
  { id: "59-3", volume: 59, number: 3, year: 2026, month: "Setembro", url: "https://revista.spcir.com" },
  { id: "59-2", volume: 59, number: 2, year: 2026, month: "Junho", url: "https://revista.spcir.com" },
  { id: "59-1", volume: 59, number: 1, year: 2026, month: "Março", url: "https://revista.spcir.com" },
  { id: "58-4", volume: 58, number: 4, year: 2025, month: "Dezembro", url: "https://revista.spcir.com" },
];

export const publications: PublicationItem[] = [
  {
    id: "p1",
    category: "publicacoes-spcir",
    title: "Manual de Boas Práticas em Cirurgia Geral",
    year: 2025,
    authors: "SPCir",
    fileUrl: "#",
    fileSize: "4,2 MB",
  },
  {
    id: "p2",
    category: "publicacoes-spcir",
    title: "Livro de Resumos — XLVI Congresso Nacional de Cirurgia",
    year: 2026,
    authors: "SPCir",
    fileUrl: "#",
    fileSize: "8,7 MB",
  },
  {
    id: "p3",
    category: "publicacoes-spcir",
    title: "Currículo do Internato de Cirurgia Geral — Documento de apoio",
    year: 2024,
    fileUrl: "#",
    fileSize: "1,1 MB",
    membersOnly: true,
  },
  {
    id: "g1",
    category: "guias-clinicos",
    title: "Recomendações para o tratamento da hérnia inguinal",
    year: 2025,
    authors: "Capítulo de Parede Abdominal",
    fileUrl: "#",
    fileSize: "2,3 MB",
  },
  {
    id: "g2",
    category: "guias-clinicos",
    title: "Abordagem da apendicite aguda no adulto",
    year: 2024,
    authors: "Capítulo de Trauma e Urgência",
    fileUrl: "#",
    fileSize: "1,8 MB",
  },
  {
    id: "g3",
    category: "guias-clinicos",
    title: "Consenso nacional sobre cirurgia bariátrica e metabólica",
    year: 2023,
    authors: "Capítulo de Cirurgia Bariátrica",
    fileUrl: "#",
    fileSize: "3,0 MB",
  },
  {
    id: "g4",
    category: "guias-clinicos",
    title: "Normas de Orientação Clínica — DGS",
    year: 2026,
    externalUrl: "https://www.dgs.pt",
  },
  {
    id: "i1",
    category: "publicacoes-internacionais",
    title: "WSES Guidelines — Acute Calculous Cholecystitis",
    year: 2025,
    authors: "World Society of Emergency Surgery",
    externalUrl: "#",
  },
  {
    id: "i2",
    category: "publicacoes-internacionais",
    title: "ERAS® Society Guidelines — Colorectal Surgery",
    year: 2024,
    authors: "ERAS® Society",
    externalUrl: "#",
  },
  {
    id: "i3",
    category: "publicacoes-internacionais",
    title: "European Hernia Society — International Guidelines",
    year: 2023,
    authors: "EHS",
    externalUrl: "#",
  },
];

export const courses: Course[] = [
  {
    slug: "cirurgia-laparoscopica-basica",
    title: "Curso de Cirurgia Laparoscópica Básica",
    kind: "programa",
    summary: "Fundamentos técnicos e treino em simulador.",
    startsAt: "2026-11-13",
    endsAt: "2026-11-14",
    location: "Lisboa",
    audience: "Internos 1.º–2.º ano",
    seats: 24,
    seatsLeft: 6,
    status: "open",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "suturas-e-anastomoses",
    title: "Curso de Suturas e Anastomoses",
    kind: "programa",
    summary: "Técnicas de sutura manual e mecânica em modelo animal.",
    startsAt: "2026-11-27",
    location: "Porto",
    audience: "Internos 1.º–3.º ano",
    seats: 20,
    seatsLeft: 0,
    status: "full",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "cirurgia-de-urgencia",
    title: "Curso de Cirurgia de Urgência",
    kind: "programa",
    summary: "Decisão clínica e técnica no doente urgente.",
    startsAt: "2026-12-04",
    endsAt: "2026-12-05",
    location: "Lisboa",
    audience: "Internos 3.º–6.º ano",
    seats: 30,
    seatsLeft: 12,
    status: "open",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "parede-abdominal",
    title: "Curso de Parede Abdominal",
    kind: "programa",
    summary: "Anatomia, técnicas abertas e laparoscópicas.",
    startsAt: "2027-01-22",
    location: "Coimbra",
    audience: "Internos 3.º–6.º ano",
    seats: 24,
    status: "soon",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "cirurgia-colorrectal",
    title: "Curso de Cirurgia Colorrectal",
    kind: "programa",
    summary: "Abordagem multidisciplinar do cancro colorrectal.",
    startsAt: "2027-02-12",
    location: "Braga",
    audience: "Internos 4.º–6.º ano",
    seats: 24,
    status: "soon",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "investigacao-clinica",
    title: "Curso de Investigação Clínica",
    kind: "programa",
    summary: "Desenho de estudos, estatística e escrita científica.",
    startsAt: "2026-10-19",
    location: "Porto",
    audience: "Todos os anos",
    seats: 40,
    status: "closed",
    membersOnly: true,
    priceMember: "Gratuito",
  },
  {
    slug: "atls",
    title: "Advanced Trauma Life Support (ATLS®)",
    kind: "outra",
    summary: "Curso certificado de abordagem inicial ao doente politraumatizado.",
    startsAt: "2026-11-20",
    endsAt: "2026-11-22",
    location: "Lisboa",
    audience: "Médicos",
    status: "open",
    priceMember: "Desconto sócio",
  },
  {
    slug: "workshop-ecografia",
    title: "Workshop de Ecografia para Cirurgiões",
    kind: "outra",
    summary: "Ecografia point-of-care no contexto cirúrgico.",
    startsAt: "2027-01-15",
    location: "Lisboa",
    audience: "Especialistas e internos",
    status: "soon",
  },
  {
    slug: "estagio-hbp",
    title: "Estágio em Cirurgia Hepato-Bilio-Pancreática",
    kind: "estagio",
    summary: "Estágio de 4 semanas em centro de referência nacional.",
    startsAt: "2027-02-01",
    location: "Centro de referência (a definir)",
    audience: "Internos 5.º–6.º ano",
    seats: 2,
    status: "open",
    membersOnly: true,
  },
  {
    slug: "estagio-robotica",
    title: "Estágio em Cirurgia Robótica",
    kind: "estagio",
    summary: "Observação e treino em consola de simulação.",
    startsAt: "2027-03-01",
    location: "Centro de referência (a definir)",
    audience: "Internos 5.º–6.º ano",
    seats: 2,
    status: "soon",
    membersOnly: true,
  },
];

const pageBody = `
<p>A Sociedade Portuguesa de Cirurgia (SPCir) é uma associação científica sem fins lucrativos que reúne cirurgiões de todo o país, com o objectivo de promover o desenvolvimento da cirurgia, a formação dos seus membros e a qualidade dos cuidados prestados aos doentes.</p>
<p>Ao longo da sua história, a SPCir tem sido uma referência na formação pós-graduada, na organização do Congresso Nacional de Cirurgia e na publicação da Revista Portuguesa de Cirurgia.</p>
<h2>Áreas de actuação</h2>
<ul>
  <li>Formação contínua de especialistas e internos;</li>
  <li>Investigação clínica e registos nacionais;</li>
  <li>Elaboração de recomendações e guias clínicos;</li>
  <li>Representação da cirurgia portuguesa a nível internacional.</li>
</ul>
<blockquote>Uma Sociedade ao serviço dos cirurgiões e dos doentes.</blockquote>
<p>Este texto é um conteúdo de exemplo e será gerido a partir do backoffice.</p>
`;

export const pages: ContentPage[] = [
  {
    slug: "mensagem-do-presidente",
    eyebrow: "SPCir",
    title: "Mensagem do Presidente",
    intro:
      "Caros colegas e amigos, é com enorme honra que me dirijo a todos os sócios da Sociedade Portuguesa de Cirurgia.",
    body: pageBody,
    updatedAt: "2026-01-15",
  },
  {
    slug: "regulamento-eleitoral",
    eyebrow: "SPCir",
    title: "Regulamento Eleitoral",
    intro: "Normas que regem o processo eleitoral para os Órgãos Sociais da Sociedade Portuguesa de Cirurgia.",
    body: pageBody,
    updatedAt: "2025-11-03",
    attachments: [
      { label: "Regulamento Eleitoral (PDF)", href: "#", size: "320 KB" },
      { label: "Estatutos da SPCir (PDF)", href: "#", size: "540 KB" },
    ],
  },
  {
    slug: "comissao-de-internos",
    eyebrow: "Internato",
    title: "Comissão de Internos",
    intro: "A Comissão de Internos em Formação Específica representa os internos de Cirurgia Geral junto da SPCir.",
    body: pageBody,
    updatedAt: "2026-09-10",
  },
  {
    slug: "club-dos-doutorandos",
    eyebrow: "Investigação",
    title: "Club dos Doutorandos",
    intro:
      "Uma rede de apoio para cirurgiões que desenvolvem o seu doutoramento, promovendo a partilha e a colaboração.",
    body: pageBody,
    updatedAt: "2026-06-02",
  },
  {
    slug: "pedido-de-patrocinio",
    eyebrow: "Eventos",
    title: "Pedido de Patrocínio Científico",
    intro:
      "A SPCir concede patrocínio científico a eventos que contribuam para a formação e actualização na área da cirurgia.",
    body: pageBody,
    updatedAt: "2026-02-20",
    attachments: [{ label: "Regulamento de Patrocínio Científico (PDF)", href: "#", size: "210 KB" }],
  },
  {
    slug: "registo-nacional-cancro-recto",
    eyebrow: "Investigação",
    title: "Registo Nacional de Cancro do Recto",
    intro: "Plataforma nacional de registo prospectivo de doentes com cancro do recto.",
    body: pageBody,
    updatedAt: "2026-03-01",
  },
  {
    slug: "politica-de-privacidade",
    title: "Política de Privacidade",
    intro: "Como a SPCir recolhe, utiliza e protege os dados pessoais dos sócios e utilizadores do website.",
    body: pageBody,
    updatedAt: "2026-01-01",
  },
  {
    slug: "termos-de-utilizacao",
    title: "Termos de Utilização",
    intro: "Condições gerais de utilização do website da Sociedade Portuguesa de Cirurgia.",
    body: pageBody,
    updatedAt: "2026-01-01",
  },
];
