import { cacheLife, cacheTag } from "next/cache";
import { courses } from "@/lib/mock/content";
import type { Course } from "@/lib/types";
import { tags } from "./cache";

const statusOrder: Record<Course["status"], number> = { open: 0, soon: 1, full: 2, closed: 3 };

export async function getCourses(kind?: Course["kind"]) {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.courses);
  return courses
    .filter((c) => !kind || c.kind === kind)
    .sort((a, b) =>
      (a.status === "closed") === (b.status === "closed")
        ? a.startsAt.localeCompare(b.startsAt)
        : statusOrder[a.status] - statusOrder[b.status],
    );
}
