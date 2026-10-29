import { ArrowRight, BookMarked, FileText, Globe2, Newspaper } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  { href: "/publicacoes/revista", icon: Newspaper, title: "Revista", text: "Revista Portuguesa de Cirurgia" },
  {
    href: "/publicacoes/publicacoes-spcir",
    icon: BookMarked,
    title: "Publicações SPCir",
    text: "Edições da Sociedade",
  },
  { href: "/publicacoes/guias-clinicos", icon: FileText, title: "Guias Clínicos", text: "Recomendações e normas" },
  {
    href: "/publicacoes/publicacoes-internacionais",
    icon: Globe2,
    title: "Publicações Internacionais",
    text: "Consensos e guidelines",
  },
];

export function PublicationsStrip() {
  return (
    <section className="container-page pt-20 md:pt-24">
      <SectionHeading
        eyebrow="Publicações"
        title="Conhecimento científico"
        link={{ label: "Todas as publicações", href: "/publicacoes" }}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
          >
            <item.icon className="size-7 text-brand-600" strokeWidth={1.5} />
            <span className="mt-6 font-display text-lg font-bold text-ink">{item.title}</span>
            <span className="mt-1 text-sm text-muted">{item.text}</span>
            <ArrowRight className="mt-4 size-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-brand-700" />
          </Link>
        ))}
      </div>
    </section>
  );
}
