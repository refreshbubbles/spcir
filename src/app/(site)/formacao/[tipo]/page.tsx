import { Info } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CourseCard } from "@/components/cards/course-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { SectionNav } from "@/components/layout/section-nav";
import { MemberCtaCard } from "@/components/layout/member-cta-card";
import { navSection } from "@/config/navigation";
import { getCourses } from "@/lib/data/training";
import type { Course } from "@/lib/types";

const types: Record<string, { kind: Course["kind"]; title: string; intro: string; note?: string }> = {
  "programa-formativo": {
    kind: "programa",
    title: "Programa Formativo para o Internato",
    intro:
      "Cursos teórico-práticos organizados por ano de internato, exclusivos para sócios da SPCir. Programa 2026/2027.",
    note: "As vagas são limitadas e a selecção é feita por ordem de inscrição. A inscrição é feita na Área Reservada.",
  },
  "outras-formacoes": {
    kind: "outra",
    title: "Outras Formações/Cursos",
    intro: "Cursos certificados, workshops e reuniões de actualização com o apoio da SPCir.",
  },
  "estagios-formativos": {
    kind: "estagio",
    title: "Estágios Formativos",
    intro: "Estágios em centros nacionais de referência para internos dos últimos anos de formação.",
    note: "As candidaturas são avaliadas pela Comissão de Formação. Consulte o regulamento antes de se candidatar.",
  },
};

export function generateStaticParams() {
  return Object.keys(types).map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: PageProps<"/formacao/[tipo]">): Promise<Metadata> {
  const type = types[(await params).tipo];
  return type ? { title: type.title, description: type.intro } : {};
}

export default function Page({ params }: PageProps<"/formacao/[tipo]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <TrainingView params={params} />
    </Suspense>
  );
}

async function TrainingView({ params }: { params: PageProps<"/formacao/[tipo]">["params"] }) {
  const type = types[(await params).tipo];
  if (!type) notFound();
  const courses = await getCourses(type.kind);

  return (
    <>
      <PageHeader
        eyebrow="Formação"
        title={type.title}
        intro={type.intro}
        crumbs={[{ label: "Formação", href: "/formacao" }, { label: type.title }]}
      />
      <ContentLayout
        aside={
          <>
            <SectionNav title="Formação" links={navSection("/formacao").children!} />
            <MemberCtaCard />
          </>
        }
      >
        {type.note && (
          <div className="mb-8 flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>{type.note}</p>
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
