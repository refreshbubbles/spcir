import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { systemPrompt } from "@/lib/chat/prompt";
import { chatLimits, type ChatEvent } from "@/lib/chat/protocol";
import { allowRequest } from "@/lib/chat/rate-limit";
import { chatTools } from "@/lib/chat/tools";

const model = process.env.CHAT_MODEL ?? "claude-opus-5-5";

const requestSchema = z.object({
  messages: z
    .array(
      // O limite de tamanho é para as perguntas; as respostas anteriores do assistente podem ser mais longas.
      z.discriminatedUnion("role", [
        z.object({ role: z.literal("user"), content: z.string().trim().min(1).max(chatLimits.messageLength) }),
        z.object({ role: z.literal("assistant"), content: z.string().trim().min(1).max(chatLimits.answerLength) }),
      ]),
    )
    .min(1)
    .max(chatLimits.messages)
    .refine((m) => m[0].role === "user" && m.at(-1)!.role === "user"),
});

const replies = {
  unavailable: "O assistente ainda não está disponível. Por favor, contacte o secretariado.",
  tooMany: "Fez muitas perguntas seguidas. Por favor, tente novamente dentro de alguns minutos.",
  invalid: "Não foi possível processar a pergunta.",
  busy: "O assistente está com muitos pedidos neste momento. Por favor, tente novamente dentro de instantes.",
  failed: "Ocorreu um erro ao obter a resposta. Por favor, tente novamente.",
  refused: "Não posso ajudar com este pedido. Para outras questões, contacte o secretariado da SPCir.",
  empty: "Não consegui encontrar uma resposta. Experimente reformular a pergunta ou contacte o secretariado.",
};

/** Assistente virtual: corre o ciclo de ferramentas e devolve a resposta em streaming (NDJSON, ver ChatEvent). */
export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: replies.unavailable }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!allowRequest(ip)) return Response.json({ error: replies.tooMany }, { status: 429 });

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: replies.invalid }, { status: 400 });

  const client = new Anthropic();
  const runner = client.beta.messages.toolRunner(
    {
      model,
      max_tokens: 8000, // tecto de custo por resposta (inclui o raciocínio); as respostas são curtas
      output_config: { effort: "low" },
      system: systemPrompt,
      tools: chatTools,
      messages: parsed.data.messages,
      cache_control: { type: "ephemeral" },
      // Se o modelo recusar por política de segurança, a API repete o pedido noutro modelo.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      max_iterations: 6,
      thread: false,
      stream: true,
    },
    { signal: request.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      let hasText = false;
      let newTurn = false;
      try {
        for await (const turn of runner) {
          for await (const event of turn) {
            if (event.type === "content_block_start" && event.content_block.type === "tool_use") {
              send({ type: "tool", name: event.content_block.name });
            } else if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              // Separa o texto de voltas diferentes do ciclo (ex.: "Vou procurar…" e a resposta final).
              send({ type: "text", text: newTurn && hasText ? `\n\n${event.delta.text}` : event.delta.text });
              hasText = true;
              newTurn = false;
            }
          }
          const message = await turn.finalMessage();
          if (message.stop_reason === "refusal") {
            send({ type: "error", message: replies.refused });
            return;
          }
          if (message.stop_reason === "max_tokens") break;
          newTurn = true;
        }
        if (!hasText) send({ type: "error", message: replies.empty });
        send({ type: "done" });
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("[chat]", error);
          send({ type: "error", message: error instanceof Anthropic.RateLimitError ? replies.busy : replies.failed });
        }
      } finally {
        try {
          controller.close();
        } catch {
          // o cliente já fechou a ligação
        }
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}
