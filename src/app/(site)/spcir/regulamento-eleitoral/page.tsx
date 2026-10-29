import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";
import { spcirCrumbs, spcirSection } from "../section";

export const metadata: Metadata = { title: "Regulamento Eleitoral" };

export default function Page() {
  return <ContentPageView slug="regulamento-eleitoral" crumbs={spcirCrumbs} section={spcirSection} />;
}
