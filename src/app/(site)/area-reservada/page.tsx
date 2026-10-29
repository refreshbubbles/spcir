import { CalendarCheck, FileText, KeyRound, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Symbol } from "@/components/brand/logo";
import { Field, Input } from "@/components/forms/fields";
import { MockForm } from "@/components/forms/mock-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Área Reservada" };

const features = [
  { icon: Wallet, text: "Pagamento e histórico de quotas" },
  { icon: CalendarCheck, text: "Inscrições em cursos e eventos" },
  { icon: FileText, text: "Documentos e certificados" },
];

export default function AreaReservadaPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="relative container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="max-w-lg">
          <span className="grid size-14 place-items-center rounded-2xl bg-brand-700 text-white shadow-lift">
            <KeyRound className="size-6" />
          </span>
          <h1 className="mt-6 text-4xl font-bold text-ink md:text-5xl">Área Reservada</h1>
          <p className="mt-4 text-lg text-muted">Espaço exclusivo para sócios da Sociedade Portuguesa de Cirurgia.</p>
          <ul className="mt-8 space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-ink">
                <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-700 ring-1 ring-line">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Symbol className="absolute -top-10 -right-10 size-40 text-brand-100" />
          <div className="relative rounded-[1.75rem] border border-line bg-white p-8 shadow-lift">
            <h2 className="text-2xl font-bold text-ink">Iniciar sessão</h2>
            <p className="mt-1 text-sm text-muted">Utilize o email ou o n.º de sócio.</p>
            <MockForm success="Sessão iniciada (demonstração)" className="mt-8 space-y-5">
              <Field label="Email ou n.º de sócio">
                <Input name="login" required autoComplete="username" />
              </Field>
              <Field label="Palavra-passe">
                <Input type="password" name="password" required autoComplete="current-password" />
              </Field>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-ink/80">
                  <input type="checkbox" className="size-4 accent-brand-700" /> Manter sessão
                </label>
                <a href="#" className="font-semibold text-brand-700 hover:underline">
                  Recuperar palavra-passe
                </a>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Entrar
              </Button>
            </MockForm>
            <p className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
              Ainda não é sócio?{" "}
              <Link href="/quero-ser-socio" className="font-semibold text-brand-700 hover:underline">
                Peça a sua adesão
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
