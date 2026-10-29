import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";

export const metadata: Metadata = { title: "Club dos Doutorandos" };

export default function Page() {
  return <ContentPageView slug="club-dos-doutorandos" />;
}
