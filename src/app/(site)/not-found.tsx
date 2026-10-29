import { ArrowLeft } from "lucide-react";
import { Symbol } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-28 text-center">
      <Symbol className="size-20 text-brand-200" />
      <p className="mt-8 font-display text-sm font-bold tracking-[0.14em] text-sand-600 uppercase">Erro 404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-muted">A página que procura pode ter sido movida ou já não existir.</p>
      <ButtonLink href="/" className="mt-8">
        <ArrowLeft className="size-4" /> Voltar ao início
      </ButtonLink>
    </section>
  );
}
