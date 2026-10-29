/**
 * Definições globais do website.
 * Na fase 2 estes valores passam a ser editáveis no backoffice (tabela de definições).
 */
export const site = {
  name: "Sociedade Portuguesa de Cirurgia",
  shortName: "SPCir",
  description:
    "A Sociedade Portuguesa de Cirurgia promove a formação, a investigação e a excelência da prática cirúrgica em Portugal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contacts: {
    address: ["Rua Xavier Cordeiro, nº 30", "1000-296 Lisboa"],
    email: "spc@spcir.com",
    phone: "+351 218 479 225",
    fax: "+351 218 479 227",
    hours: "Dias úteis, 9h30 – 17h30",
  },

  social: {
    facebook: "https://www.facebook.com/spcirurgia",
    x: "https://www.x.com/spcir",
  },

  /** Congresso Nacional em destaque (barra superior, CTA e homepage). */
  congress: {
    edition: "XLVII",
    title: "XLVII Congresso Nacional de Cirurgia",
    dates: "11 e 12 de Março, 2027",
    location: "Centro de Congressos de Lagoa, Algarve",
    status: "Inscrições abertas",
    url: "https://congresso.spcir.com/2027",
  },

  usefulLinks: [
    { label: "Ordem dos Médicos", href: "https://www.ordemdosmedicos.pt/" },
    { label: "ALTEC-LATES", href: "https://altec-lates.pt/" },
    { label: "ATLS Portugal", href: "https://www.atlsportugal.org/" },
    { label: "Revista Portuguesa de Cirurgia", href: "https://revista.spcir.com" },
    { label: "Registo Nacional Cancro do Recto", href: "/registo-nacional-cancro-recto" },
  ],
} as const;
