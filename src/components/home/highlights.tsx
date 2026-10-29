import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getHighlights } from "@/lib/data/home";

export async function Highlights() {
  const items = await getHighlights();
  return (
    <section className="container-page py-20 md:py-24">
      <SectionHeading
        eyebrow="Em destaque"
        title="Uma Sociedade ao serviço dos cirurgiões"
        description="Iniciativas dirigidas a internos, investigadores e a toda a comunidade cirúrgica."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
          >
            <div className="relative aspect-[8/3] overflow-hidden bg-brand-50">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                {item.linkLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
