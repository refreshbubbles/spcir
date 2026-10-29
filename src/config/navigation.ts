import { KeyRound, Mic2, UserPlus, type LucideIcon } from "lucide-react";
import { site } from "./site";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  children?: NavLink[];
  /** Apresenta os filhos em colunas (ex.: Capítulos). */
  columns?: 1 | 2;
};

/** Menu principal — mesma estrutura do website actual. */
export const mainNav: NavItem[] = [
  {
    label: "SPCir",
    href: "/spcir",
    children: [
      {
        label: "Mensagem do Presidente",
        href: "/spcir/mensagem-do-presidente",
        description: "Palavras do Presidente da Direcção",
      },
      {
        label: "Regulamento Eleitoral",
        href: "/spcir/regulamento-eleitoral",
        description: "Normas do processo eleitoral",
      },
      {
        label: "Órgãos Sociais",
        href: "/spcir/orgaos-sociais",
        description: "Direcção, Assembleia Geral e Conselho Fiscal",
      },
    ],
  },
  { label: "Eventos", href: "/eventos" },
  { label: "Notícias", href: "/noticias" },
  {
    label: "Publicações",
    href: "/publicacoes",
    children: [
      { label: "Revista", href: "/publicacoes/revista", description: "Revista Portuguesa de Cirurgia" },
      {
        label: "Publicações SPCir",
        href: "/publicacoes/publicacoes-spcir",
        description: "Edições e documentos da Sociedade",
      },
      {
        label: "Guias Clínicos",
        href: "/publicacoes/guias-clinicos",
        description: "Recomendações para a prática clínica",
      },
      {
        label: "Publicações Internacionais",
        href: "/publicacoes/publicacoes-internacionais",
        description: "Referências e consensos internacionais",
      },
    ],
  },
  {
    label: "Capítulos",
    href: "/capitulos",
    columns: 2,
    children: [
      { label: "Cirurgia Bariátrica (Obesidade)", href: "/capitulos/cirurgia-bariatrica" },
      { label: "Cirurgia da Parede Abdominal", href: "/capitulos/cirurgia-parede-abdominal" },
      { label: "Cirurgia do Ambulatório", href: "/capitulos/cirurgia-ambulatorio" },
      { label: "Cirurgia Endócrina e da Cabeça e Pescoço", href: "/capitulos/cirurgia-endocrina-cabeca-pescoco" },
      { label: "Cirurgia Esófago-Gástrica", href: "/capitulos/cirurgia-esofago-gastrica" },
      { label: "Cirurgia Hepato-Bilio-Pancreática", href: "/capitulos/cirurgia-hepato-bilio-pancreatica" },
      { label: "Cirurgia Mamária", href: "/capitulos/cirurgia-mamaria" },
      { label: "Cirurgia Robótica", href: "/capitulos/cirurgia-robotica" },
      { label: "Cirurgia Vascular", href: "/capitulos/cirurgia-vascular" },
      { label: "Coloproctologia", href: "/capitulos/coloproctologia" },
      {
        label: "Cuidados Intensivos, Trauma e Cirurgia de Urgência",
        href: "/capitulos/cuidados-intensivos-trauma-urgencia",
      },
    ],
  },
  {
    label: "Núcleos",
    href: "/nucleos",
    children: [
      { label: "História da Cirurgia", href: "/nucleos/historia-da-cirurgia" },
      { label: "Sustentabilidade em Cirurgia", href: "/nucleos/sustentabilidade-em-cirurgia" },
    ],
  },
  {
    label: "Formação",
    href: "/formacao",
    children: [
      {
        label: "Programa Formativo para o Internato",
        href: "/formacao/programa-formativo",
        description: "Cursos para internos de Cirurgia Geral",
      },
      {
        label: "Outras Formações/Cursos",
        href: "/formacao/outras-formacoes",
        description: "Cursos, workshops e reuniões científicas",
      },
      {
        label: "Estágios Formativos",
        href: "/formacao/estagios-formativos",
        description: "Estágios em centros de referência",
      },
    ],
  },
  { label: "Contactos", href: "/contactos" },
];

/** Item do menu principal pelo href (ex.: navSection("/capitulos")). */
export function navSection(href: string) {
  const item = mainNav.find((i) => i.href === href);
  if (!item) throw new Error(`Secção "${href}" não existe no menu`);
  return item;
}

export type ActionLink = NavLink & { icon: LucideIcon; short: string };

/** Acessos sempre presentes e em destaque (header, mobile, homepage). */
export const primaryActions = {
  member: {
    label: "Quero ser Sócio",
    short: "Ser Sócio",
    href: "/quero-ser-socio",
    icon: UserPlus,
    description: "Adira à SPCir e aceda a benefícios exclusivos.",
  },
  reserved: {
    label: "Área Reservada",
    short: "Área Sócio",
    href: "/area-reservada",
    icon: KeyRound,
    description: "Quotas, inscrições, documentos e dados pessoais.",
  },
  congress: {
    label: "Congresso Anual",
    short: "Congresso",
    href: site.congress.url,
    external: true,
    icon: Mic2,
    description: `${site.congress.title} · ${site.congress.dates}`,
  },
} satisfies Record<string, ActionLink>;

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "SPCir",
    links: [
      ...navSection("/spcir").children!,
      { label: "Comissão de Internos", href: "/comissao-de-internos" },
      { label: "Club dos Doutorandos", href: "/club-dos-doutorandos" },
    ],
  },
  {
    title: "Actividade",
    links: [
      { label: "Eventos", href: "/eventos" },
      { label: "Notícias", href: "/noticias" },
      { label: "Capítulos", href: "/capitulos" },
      { label: "Núcleos", href: "/nucleos" },
      { label: "Pedido de Patrocínio Científico", href: "/pedido-de-patrocinio" },
    ],
  },
  {
    title: "Formação",
    links: [...navSection("/formacao").children!, { label: "Publicações", href: "/publicacoes" }],
  },
];
