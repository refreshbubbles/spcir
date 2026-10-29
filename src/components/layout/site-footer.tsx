import { ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FacebookIcon, XIcon } from "@/components/ui/social-icons";
import { SmartLink } from "@/components/ui/smart-link";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";

export function SiteFooter() {
  const { contacts, social } = site;
  return (
    <footer className="border-t border-line bg-surface pb-20 sm:pb-0">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Página inicial" className="inline-block text-ink">
            <Logo className="h-20 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>

          <ul className="mt-6 space-y-2.5 text-sm text-ink/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>
                Secretariado / Sede
                <br />
                {contacts.address.join(", ")}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a href={`mailto:${contacts.email}`} className="hover:text-brand-700">
                {contacts.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">
                {contacts.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Printer className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>{contacts.fax} (tel./fax)</span>
            </li>
          </ul>

          <div className="mt-6 flex gap-2">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-full bg-white text-ink ring-1 ring-line hover:text-brand-700"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="grid size-9 place-items-center rounded-full bg-white text-ink ring-1 ring-line hover:text-brand-700"
            >
              <XIcon className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-bold tracking-[0.14em] text-ink uppercase">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-brand-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-xs font-bold tracking-[0.14em] text-ink uppercase">Links úteis</h2>
            <ul className="mt-4 space-y-2.5">
              {site.usefulLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted hover:text-brand-700"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ArrowUpRight className="size-3 opacity-50 group-hover:opacity-100" />
                    )}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> SPCir — {site.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/politica-de-privacidade" className="hover:text-brand-700">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-utilizacao" className="hover:text-brand-700">
              Termos de Utilização
            </Link>
            <a href="https://www.rbb.pt/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
              Desenvolvido por RBB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
