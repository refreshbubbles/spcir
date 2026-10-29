import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import { FacebookIcon, XIcon } from "@/components/ui/social-icons";

/** Barra superior: Congresso Anual sempre visível + contactos rápidos. */
export function AnnouncementBar() {
  const { congress, contacts, social } = site;
  return (
    <div className="bg-ink text-white">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
        <a
          href={congress.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 items-center gap-2.5 font-medium"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sand-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-sand-400" />
          </span>
          <span className="truncate">
            <span className="font-semibold">{congress.title}</span>
            <span className="hidden text-white/70 md:inline"> · {congress.dates}</span>
            <span className="hidden text-white/70 2xl:inline"> · {congress.location}</span>
          </span>
          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-sand-300 transition-colors group-hover:bg-white/20 sm:inline-flex">
            {congress.status}
            <ArrowUpRight className="size-3.5" />
          </span>
        </a>

        <div className="hidden items-center gap-5 whitespace-nowrap text-white/70 lg:flex">
          <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5" />
            {contacts.phone}
          </a>
          <a href={`mailto:${contacts.email}`} className="flex items-center gap-1.5 hover:text-white">
            <Mail className="size-3.5" />
            {contacts.email}
          </a>
          <span className="h-4 w-px bg-white/20" aria-hidden />
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white"
          >
            <FacebookIcon className="size-4" />
          </a>
          <a
            href={social.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-white"
          >
            <XIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
