import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";

export const metadata: Metadata = { title: "Registo Nacional de Cancro do Recto" };

export default function Page() {
  return <ContentPageView slug="registo-nacional-cancro-recto" />;
}
