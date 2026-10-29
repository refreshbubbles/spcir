import { Download, FileText } from "lucide-react";
import type { ContentPage } from "@/lib/types";

export function Attachments({ items }: { items: NonNullable<ContentPage["attachments"]> }) {
  return (
    <div className="rounded-card border border-line bg-white p-5">
      <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Documentos</p>
      <ul className="mt-3 divide-y divide-line">
        {items.map((file) => (
          <li key={file.label}>
            <a href={file.href} className="group flex items-center gap-3 py-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink group-hover:text-brand-700">{file.label}</span>
                {file.size && <span className="text-xs text-muted">{file.size}</span>}
              </span>
              <Download className="size-4 text-muted group-hover:text-brand-700" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
