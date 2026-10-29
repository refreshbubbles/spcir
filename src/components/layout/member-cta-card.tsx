import { ArrowRight } from "lucide-react";
import { Symbol } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryActions } from "@/config/navigation";

/** Cartão lateral de adesão — repetido nas páginas interiores. */
export function MemberCtaCard() {
  const { member, reserved } = primaryActions;
  return (
    <div className="relative overflow-hidden rounded-card bg-brand-700 p-6 text-white">
      <Symbol className="absolute -right-8 -bottom-10 size-44 text-white/[0.07]" />
      <p className="text-xs font-bold tracking-[0.14em] text-sand-300 uppercase">Sócios SPCir</p>
      <p className="mt-2 font-display text-xl font-bold">Ainda não é sócio?</p>
      <p className="mt-2 text-sm text-white/75">
        Condições especiais em cursos e congressos e acesso a conteúdos exclusivos.
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        <ButtonLink href={member.href} variant="white" size="sm">
          {member.label}
          <ArrowRight className="size-4" />
        </ButtonLink>
        <ButtonLink href={reserved.href} variant="outlineWhite" size="sm">
          {reserved.label}
        </ButtonLink>
      </div>
    </div>
  );
}
