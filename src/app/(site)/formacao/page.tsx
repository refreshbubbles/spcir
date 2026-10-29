import type { Metadata } from "next";
import { SectionIndex } from "@/components/layout/section-index";
import { navSection } from "@/config/navigation";

export const metadata: Metadata = { title: "Formação" };

export default function FormacaoPage() {
  return (
    <SectionIndex
      item={navSection("/formacao")}
      eyebrow="Formação"
      intro="Formação estruturada para internos de Cirurgia Geral e actualização contínua para especialistas."
    />
  );
}
