import type { Metadata } from "next";
import { SectionIndex } from "@/components/layout/section-index";
import { navSection } from "@/config/navigation";

export const metadata: Metadata = { title: "Núcleos" };

export default function NucleosPage() {
  return (
    <SectionIndex
      item={navSection("/nucleos")}
      eyebrow="Núcleos"
      intro="Os Núcleos da SPCir dedicam-se a temas transversais à prática cirúrgica."
    />
  );
}
