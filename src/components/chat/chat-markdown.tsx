import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/smart-link";

/*
 * Markdown mínimo das respostas do assistente: parágrafos, listas, **negrito** e [links](url).
 * Gera elementos React (nunca HTML), por isso o texto do modelo não injecta markup.
 */

const inlinePattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const safeHref = (href: string) => /^(\/|https?:\/\/|mailto:)/.test(href);

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    nodes.push(text.slice(last, match.index));
    const [whole, bold, label, href] = match;
    if (bold) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-ink">
          {bold}
        </strong>,
      );
    } else if (safeHref(href)) {
      nodes.push(
        <SmartLink
          key={match.index}
          href={href}
          className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-700"
        >
          {label}
        </SmartLink>,
      );
    } else {
      nodes.push(whole);
    }
    last = match.index + whole.length;
  }
  nodes.push(text.slice(last));
  return nodes;
}

const bullet = /^\s*[-*•]\s+/;
const numbered = /^\s*\d+[.)]\s+/;

export function ChatMarkdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.length && lines.every((l) => bullet.test(l) || numbered.test(l))) {
          const List = numbered.test(lines[0]) ? "ol" : "ul";
          return (
            <List key={i} className={List === "ol" ? "list-decimal space-y-1 pl-5" : "list-disc space-y-1 pl-5"}>
              {lines.map((l, j) => (
                <li key={j} className="marker:text-brand-400">
                  {inline(l.replace(bullet, "").replace(numbered, ""))}
                </li>
              ))}
            </List>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
