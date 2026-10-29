import { CalendarDays, Lock, MapPin, Users } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import type { Course, CourseStatus } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

export const courseStatus: Record<CourseStatus, { label: string; tone: BadgeTone }> = {
  open: { label: "Inscrições abertas", tone: "green" },
  soon: { label: "Brevemente", tone: "amber" },
  full: { label: "Esgotado", tone: "red" },
  closed: { label: "Encerrado", tone: "gray" },
};

export function CourseCard({ course }: { course: Course }) {
  const status = courseStatus[course.status];
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={status.tone}>{status.label}</Badge>
        {course.membersOnly && (
          <Badge tone="brand">
            <Lock className="size-3" /> Sócios
          </Badge>
        )}
      </div>
      <h3 className="mt-4 text-lg leading-snug font-bold text-ink">{course.title}</h3>
      <p className="mt-2 text-sm text-muted">{course.summary}</p>
      <dl className="mt-5 grid gap-2 text-sm text-ink/80">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-brand-600" />
          <dt className="sr-only">Data</dt>
          <dd>{formatDateRange(course.startsAt, course.endsAt)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-brand-600" />
          <dt className="sr-only">Local</dt>
          <dd>{course.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-brand-600" />
          <dt className="sr-only">Destinatários</dt>
          <dd>
            {course.audience}
            {course.seats && <span className="text-muted"> · {course.seats} vagas</span>}
          </dd>
        </div>
      </dl>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        {course.seatsLeft !== undefined && course.status === "open" ? (
          <span className="text-xs font-semibold text-emerald-700">{course.seatsLeft} vagas disponíveis</span>
        ) : (
          <span className="text-xs text-muted">{course.priceMember}</span>
        )}
        <ButtonLink
          href={course.status === "open" ? "/area-reservada" : "#"}
          size="sm"
          variant={course.status === "open" ? "primary" : "soft"}
          aria-disabled={course.status !== "open"}
          className={course.status !== "open" ? "pointer-events-none opacity-60" : undefined}
        >
          {course.status === "open" ? "Inscrever" : "Mais informação"}
        </ButtonLink>
      </div>
    </article>
  );
}
