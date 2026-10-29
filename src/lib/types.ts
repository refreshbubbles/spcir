/**
 * Tipos de domínio partilhados entre a camada de dados e a UI.
 * Servem de base para o schema Prisma (fase 2).
 */

export type ImageRef = { src: string; alt: string; width?: number; height?: number };

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageRef;
  cta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

export type Highlight = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: ImageRef;
  linkLabel: string;
};

export type NewsCategory = "Sociedade" | "Formação" | "Publicações" | "Congresso" | "Investigação" | "Capítulos";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string; // ISO
  image?: ImageRef;
  body: string; // HTML do editor
  featured?: boolean;
};

export type EventType = "Congresso" | "Curso" | "Reunião" | "Webinar" | "Conferência";

export type EventItem = {
  slug: string;
  title: string;
  excerpt: string;
  type: EventType;
  startsAt: string; // ISO
  endsAt?: string;
  location: string;
  city?: string;
  organizer?: string;
  externalUrl?: string;
  image?: ImageRef;
  body: string;
  spcirOrganized?: boolean;
  chapterSlug?: string;
};

export type Person = {
  name: string;
  role: string;
  institution?: string;
  photo?: ImageRef;
};

export type GoverningBody = { title: string; members: Person[] };

export type Chapter = {
  slug: string;
  name: string;
  shortName: string;
  icon: string; // nome lucide (resolvido no componente)
  summary: string;
  body: string;
  coordination: Person[];
};

export type Nucleus = {
  slug: string;
  name: string;
  summary: string;
  body: string;
  coordination: Person[];
};

export type PublicationCategory = {
  slug: "revista" | "publicacoes-spcir" | "guias-clinicos" | "publicacoes-internacionais";
  title: string;
  description: string;
};

export type PublicationItem = {
  id: string;
  category: PublicationCategory["slug"];
  title: string;
  description?: string;
  year: number;
  authors?: string;
  fileUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  membersOnly?: boolean;
};

export type JournalIssue = {
  id: string;
  volume: number;
  number: number;
  year: number;
  month: string;
  url: string;
  cover?: ImageRef;
};

export type CourseStatus = "open" | "soon" | "full" | "closed";

export type Course = {
  slug: string;
  title: string;
  kind: "programa" | "outra" | "estagio";
  summary: string;
  startsAt: string;
  endsAt?: string;
  location: string;
  audience: string; // ex.: "Internos 1.º–2.º ano"
  seats?: number;
  seatsLeft?: number;
  status: CourseStatus;
  membersOnly?: boolean;
  priceMember?: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  body: string;
  updatedAt: string;
  attachments?: { label: string; href: string; size?: string }[];
};
