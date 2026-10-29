import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";

export const metadata: Metadata = { title: "Comissão de Internos" };

export default function Page() {
  return <ContentPageView slug="comissao-de-internos" />;
}
