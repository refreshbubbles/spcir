/** Contrato entre o widget do assistente e o POST /api/chat (sem dependências, para o bundle do cliente). */

/** Limites da conversa (protegem o custo e o endpoint público). */
export const chatLimits = { messages: 20, messageLength: 1500 } as const;

/** Histórico enviado no pedido: só texto, a começar e a acabar numa mensagem do utilizador. */
export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Eventos da resposta em streaming (uma linha JSON por evento). */
export type ChatEvent =
  | { type: "text"; text: string }
  | { type: "tool"; name: string }
  | { type: "error"; message: string }
  | { type: "done" };
