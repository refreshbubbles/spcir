"use client";

import { ArrowUp, MessageCircle, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Symbol } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { chatLimits, type ChatEvent, type ChatMessage } from "@/lib/chat/protocol";
import { cn } from "@/lib/utils";
import { ChatMarkdown } from "./chat-markdown";

type Message = ChatMessage & { error?: boolean };

const suggestions = [
  "Que cursos do Programa Formativo têm inscrições abertas?",
  "Quais são os próximos eventos?",
  "Quando e onde é o Congresso Nacional?",
  "Como posso tornar-me sócio?",
];

/** O que o assistente está a fazer, conforme a ferramenta que chamou (ver src/lib/chat/tools.ts). */
const toolActivity: Record<string, string> = {
  pesquisar_eventos: "A consultar a agenda de eventos…",
  pesquisar_cursos: "A consultar os cursos…",
  pesquisar_noticias: "A consultar as notícias…",
  listar_capitulos_e_nucleos: "A consultar os Capítulos e Núcleos…",
  obter_capitulo_ou_nucleo: "A consultar os Capítulos e Núcleos…",
  obter_orgaos_sociais: "A consultar os Órgãos Sociais…",
  pesquisar_publicacoes: "A consultar as publicações…",
  obter_pagina: "A consultar o site…",
};

/** Histórico a enviar: sem mensagens de erro e dentro do limite, a começar no utilizador. */
function historyFor(messages: Message[]): ChatMessage[] {
  const history = messages.filter((m) => !m.error).slice(-chatLimits.messages);
  while (history[0]?.role === "assistant") history.shift();
  return history.map(({ role, content }) => ({ role, content }));
}

/** Assistente virtual (protótipo): botão flutuante e painel de conversa em todas as páginas do site. */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [activity, setActivity] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streaming, activity]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setPending(true);
    setActivity(null);

    const controller = new AbortController();
    abortRef.current = controller;
    let answer = "";
    let failure: string | null = null;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyFor(next) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        failure = ((await res.json().catch(() => null)) as { error?: string } | null)?.error ?? null;
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines.filter(Boolean)) {
          const event = JSON.parse(line) as ChatEvent;
          if (event.type === "text") {
            answer += event.text;
            setStreaming(answer);
            setActivity(null);
          } else if (event.type === "tool") {
            setActivity(toolActivity[event.name] ?? "A consultar o site…");
          } else if (event.type === "error") {
            failure = event.message;
          }
        }
      }
    } catch {
      if (controller.signal.aborted) return;
      failure ??= "Não foi possível contactar o assistente. Por favor, tente novamente.";
    } finally {
      if (abortRef.current === controller) {
        setMessages((prev) => [
          ...prev,
          ...(answer ? [{ role: "assistant" as const, content: answer }] : []),
          ...(failure ? [{ role: "assistant" as const, content: failure, error: true }] : []),
        ]);
        setStreaming("");
        setActivity(null);
        setPending(false);
        abortRef.current = null;
      }
    }
  }

  function reset() {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStreaming("");
    setActivity(null);
    setPending(false);
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void ask(input);
    }
  }

  const empty = messages.length === 0 && !pending;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir o assistente virtual"
        aria-expanded={open}
        aria-controls="assistente-spcir"
        className={cn(
          "fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 inline-flex size-13 items-center justify-center gap-2 rounded-full bg-brand-700 font-semibold text-white shadow-lift transition hover:bg-brand-800 sm:right-6 sm:bottom-6 sm:w-auto sm:pr-5 sm:pl-4",
          open && "pointer-events-none scale-90 opacity-0",
        )}
      >
        <MessageCircle className="size-5" />
        <span className="hidden text-[0.9375rem] sm:inline">Assistente</span>
      </button>

      <section
        id="assistente-spcir"
        role="dialog"
        aria-label="Assistente virtual da SPCir"
        hidden={!open}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(42rem,calc(100dvh-3rem))] sm:w-[25rem] sm:overflow-hidden sm:rounded-card sm:border sm:border-line sm:shadow-lift"
      >
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Symbol className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-display font-bold text-ink">
              Assistente SPCir <Badge tone="sand">Beta</Badge>
            </p>
            <p className="truncate text-xs text-muted">Eventos, formação, notícias e mais</p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"
              aria-label="Nova conversa"
              title="Nova conversa"
            >
              <RotateCcw className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"
            aria-label="Fechar o assistente"
          >
            <X className="size-5" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-surface/60 px-4 py-5" aria-live="polite">
          <Bubble role="assistant">
            <p>
              Olá! Sou o assistente virtual da Sociedade Portuguesa de Cirurgia. Posso ajudar a encontrar eventos,
              cursos, notícias, Capítulos e outras informações do site.
            </p>
          </Bubble>

          {empty && (
            <div className="space-y-2 pt-1">
              <p className="flex items-center gap-1.5 px-1 text-xs font-semibold tracking-wide text-muted uppercase">
                <Sparkles className="size-3.5" /> Sugestões
              </p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void ask(s)}
                  className="block w-full rounded-2xl border border-line bg-white px-4 py-2.5 text-left text-sm text-ink transition hover:border-brand-300 hover:text-brand-700"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} error={m.error}>
              {m.role === "assistant" && !m.error ? <ChatMarkdown text={m.content} /> : <p>{m.content}</p>}
            </Bubble>
          ))}

          {streaming && (
            <Bubble role="assistant">
              <ChatMarkdown text={streaming} />
            </Bubble>
          )}

          {pending && (!streaming || activity) && (
            <p className="flex items-center gap-2 px-1 text-sm text-muted" role="status">
              <span className="flex gap-1" aria-hidden>
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 animate-bounce rounded-full bg-brand-400"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
              {activity ?? "A pensar…"}
            </p>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t border-line bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-line bg-white p-1.5 pl-3.5 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100">
            <label htmlFor="assistente-pergunta" className="sr-only">
              Escreva a sua pergunta
            </label>
            <textarea
              ref={inputRef}
              id="assistente-pergunta"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={chatLimits.messageLength}
              placeholder="Escreva a sua pergunta…"
              className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[0.9375rem] text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-700 text-white transition hover:bg-brand-800 disabled:opacity-40"
              aria-label="Enviar pergunta"
            >
              <ArrowUp className="size-4.5" />
            </button>
          </div>
          <p className="mt-2 px-1 text-center text-[0.6875rem] leading-snug text-muted">
            Respostas geradas por inteligência artificial; podem conter erros. Não presta aconselhamento médico.
          </p>
        </form>
      </section>
    </>
  );
}

function Bubble({ role, error, children }: { role: ChatMessage["role"]; error?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed",
        role === "user"
          ? "ml-auto rounded-br-md bg-brand-700 text-white"
          : "rounded-bl-md border border-line bg-white text-ink/90",
        error && "border-rose-100 bg-rose-50 text-rose-700",
      )}
    >
      {children}
    </div>
  );
}
