import { ArrowRight, BookOpen, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";
import { courseStatus } from "@/components/cards/course-card";
import { DateBadge } from "@/components/cards/event-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { getCourses } from "@/lib/data/training";

const tracks = [
  {
    href: "/formacao/programa-formativo",
    icon: GraduationCap,
    title: "Programa Formativo para o Internato",
    text: "Cursos estruturados por ano de internato.",
  },
  {
    href: "/formacao/outras-formacoes",
    icon: BookOpen,
    title: "Outras Formações/Cursos",
    text: "ATLS, workshops e cursos de actualização.",
  },
  {
    href: "/formacao/estagios-formativos",
    icon: Stethoscope,
    title: "Estágios Formativos",
    text: "Estágios em centros de referência.",
  },
];

export async function TrainingSection() {
  const courses = (await getCourses("programa")).filter((c) => c.status !== "closed").slice(0, 4);

  return (
    <section className="container-page py-20 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Formação</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">Formação para Internos de Cirurgia Geral</h2>
          <p className="mt-4 text-lg text-muted">
            Um programa formativo completo, pensado para cada fase do internato — com vagas limitadas e inscrição
            exclusiva para sócios.
          </p>

          <ul className="mt-8 space-y-3">
            {tracks.map((track) => (
              <li key={track.href}>
                <Link
                  href={track.href}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all hover:border-brand-200 hover:shadow-soft"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <track.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{track.title}</span>
                    <span className="block text-sm text-muted">{track.text}</span>
                  </span>
                  <ArrowRight className="size-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand-700" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-50 to-sand-50 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-700">Programa Formativo 2026/2027</p>
                <p className="font-display text-xl font-bold text-ink">Próximos cursos</p>
              </div>
              <ButtonLink href="/formacao/programa-formativo" size="sm" variant="secondary">
                Ver programa completo
              </ButtonLink>
            </div>
            <ul className="mt-6 space-y-3">
              {courses.map((course) => {
                const status = courseStatus[course.status];
                return (
                  <li key={course.slug} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
                    <DateBadge iso={course.startsAt} className="ring-brand-100" />
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-bold text-ink">{course.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {course.location} · {course.audience}
                      </p>
                    </div>
                    <Badge tone={status.tone} className="hidden shrink-0 sm:inline-flex">
                      {status.label}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
