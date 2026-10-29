import { Mail } from "lucide-react";
import { FacebookIcon, XIcon } from "@/components/ui/social-icons";
import { site } from "@/config/site";

export function ShareLinks({ title, path }: { title: string; path: string }) {
  const url = encodeURIComponent(`${site.url}${path}`);
  const text = encodeURIComponent(title);
  const links = [
    { label: "Partilhar no Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: FacebookIcon },
    { label: "Partilhar no X", href: `https://x.com/intent/post?url=${url}&text=${text}`, icon: XIcon },
    { label: "Enviar por email", href: `mailto:?subject=${text}&body=${url}`, icon: Mail },
  ];
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Partilhar</span>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid size-9 place-items-center rounded-full text-ink ring-1 ring-line hover:bg-brand-50 hover:text-brand-700"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
