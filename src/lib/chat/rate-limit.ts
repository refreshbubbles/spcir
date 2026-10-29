import "server-only";

const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 20;

const hits = new Map<string, number[]>();

/**
 * Limite simples de pedidos por IP, em memória (20 perguntas em 10 minutos).
 * Serve para o protótipo, com um único processo. Fase 2: usar um store partilhado (BD/Redis) e um captcha.
 */
export function allowRequest(key: string) {
  const now = Date.now();
  if (hits.size > 10_000) hits.clear();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const allowed = recent.length < MAX_REQUESTS;
  if (allowed) recent.push(now);
  hits.set(key, recent);
  return allowed;
}
