import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function Page() {
  return <ContentPageView slug="politica-de-privacidade" />;
}
