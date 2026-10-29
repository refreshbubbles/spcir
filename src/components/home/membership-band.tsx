import { ArrowRight, Check } from "lucide-react";
import { Symbol } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryActions } from "@/config/navigation";

const benefits = [
  "Inscrição nos cursos do Programa Formativo para o Internato",
  "Condições especiais no Congresso Nacional de Cirurgia",
  "Participação nos Capítulos e Núcleos",
  "Acesso a documentos e conteúdos exclusivos",
];

export function MembershipBand() {
  const { member, reserved } = primaryActions;
  return (
    <section className="container-page py-20 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-700 px-6 py-12 text-white md:px-14 md:py-16">
        <Symbol className="absolute -top-16 -right-10 size-[26rem] text-white/[0.06]" />
        <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-brand-500/40 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-sand-300 uppercase">Sócios SPCir</p>
            <h2 className="mt-3 text-3xl font-bold md:text-[2.75rem] md:leading-tight">
              Faça parte da comunidade cirúrgica portuguesa
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/75">
              Seja especialista ou interno, a SPCir acompanha o seu percurso profissional com formação, actualização
              científica e representação.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={member.href} variant="white" size="lg">
                {member.label}
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={reserved.href} variant="outlineWhite" size="lg">
                Já sou sócio
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sand-400 text-ink">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-[0.9375rem]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
