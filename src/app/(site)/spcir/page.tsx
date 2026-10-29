import type { Metadata } from "next";
import { SectionIndex } from "@/components/layout/section-index";
import { navSection } from "@/config/navigation";

export const metadata: Metadata = { title: "A Sociedade" };

export default function SpcirPage() {
  return (
    <SectionIndex
      item={navSection("/spcir")}
      eyebrow="A Sociedade"
      intro="A Sociedade Portuguesa de Cirurgia promove a formação, a investigação e a excelência da prática cirúrgica em Portugal."
    />
  );
}
