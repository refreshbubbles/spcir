"use client";

import { CircleCheck } from "lucide-react";
import { useState, type ComponentProps } from "react";

/**
 * Formulário de demonstração: valida no browser e mostra a mensagem de sucesso,
 * sem enviar dados. Na fase 2 é substituído por uma Server Action.
 */
export function MockForm({ success, children, ...props }: ComponentProps<"form"> & { success: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-card border border-emerald-100 bg-emerald-50/60 px-6 py-12 text-center"
      >
        <CircleCheck className="size-10 text-emerald-600" />
        <p className="mt-4 font-display text-xl font-bold text-ink">{success}</p>
        <p className="mt-2 text-sm text-muted">Mockup — nenhum dado foi enviado.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-brand-700 hover:underline"
        >
          Voltar ao formulário
        </button>
      </div>
    );
  }

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {children}
    </form>
  );
}
