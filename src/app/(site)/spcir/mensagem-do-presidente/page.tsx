import type { Metadata } from "next";
import { ContentPageView } from "@/components/layout/content-page";
import { spcirCrumbs, spcirSection } from "../section";

export const metadata: Metadata = { title: "Mensagem do Presidente" };

export default function Page() {
  return (
    <ContentPageView slug="mensagem-do-presidente" crumbs={spcirCrumbs} section={spcirSection}>
      <div className="mt-10 flex items-center gap-4 rounded-card bg-surface p-5">
        <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-brand-100 to-sand-100 font-display text-xl font-bold text-brand-700">
          NA
        </span>
        <div>
          <p className="font-display text-lg font-bold text-ink">Nome Apelido</p>
          <p className="text-sm text-muted">Presidente da Direcção da Sociedade Portuguesa de Cirurgia</p>
        </div>
      </div>
    </ContentPageView>
  );
}
