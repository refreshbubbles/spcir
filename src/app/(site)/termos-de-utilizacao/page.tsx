import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";

export const metadata: Metadata = { title: "Termos de Utilização" };

export default function Page() {
  return <ContentPageView slug="termos-de-utilizacao" />;
}
