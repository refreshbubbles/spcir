import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Field, Input, Select, Textarea, Checkbox } from "@/components/forms/fields";
import { MockForm } from "@/components/forms/mock-form";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contactos" };

export default function ContactosPage() {
  const { contacts } = site;
  const cards = [
    { icon: MapPin, title: "Sede / Secretariado", lines: contacts.address },
    { icon: Phone, title: "Telefone", lines: [contacts.phone, `${contacts.fax} (tel./fax)`] },
    { icon: Mail, title: "Email", lines: [contacts.email] },
    { icon: Clock, title: "Horário", lines: [contacts.hours] },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Fale connosco"
        title="Contactos"
        intro="O secretariado da SPCir está disponível para esclarecer questões sobre quotas, inscrições, eventos e formação."
        crumbs={[{ label: "Contactos" }]}
      />
      <ContentLayout>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="rounded-card border border-line bg-white p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-sm font-semibold text-muted">{title}</p>
              {lines.map((l) => (
                <p key={l} className="font-semibold text-ink">
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="rounded-card border border-line bg-white p-6 md:p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold text-ink">Envie-nos uma mensagem</h2>
            <p className="mt-2 text-muted">Respondemos habitualmente em 2 dias úteis.</p>
            <MockForm success="Mensagem enviada. Obrigado pelo contacto!" className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Nome" required>
                <Input name="name" required autoComplete="name" />
              </Field>
              <Field label="Email" required>
                <Input type="email" name="email" required autoComplete="email" />
              </Field>
              <Field label="Telefone">
                <Input type="tel" name="phone" autoComplete="tel" />
              </Field>
              <Field label="Assunto" required>
                <Select name="subject" required defaultValue="">
                  <option value="" disabled>
                    Seleccione…
                  </option>
                  <option>Quotas e adesão</option>
                  <option>Formação e cursos</option>
                  <option>Eventos e congresso</option>
                  <option>Revista</option>
                  <option>Outro</option>
                </Select>
              </Field>
              <Field label="Mensagem" required className="sm:col-span-2">
                <Textarea name="message" required rows={5} />
              </Field>
              <div className="sm:col-span-2">
                <Checkbox required name="consent">
                  Autorizo o tratamento dos meus dados para resposta a este contacto, nos termos da Política de
                  Privacidade.
                </Checkbox>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg">
                  Enviar mensagem
                </Button>
              </div>
            </MockForm>
          </div>
          <div className="overflow-hidden rounded-card border border-line bg-surface lg:col-span-2">
            <iframe
              title="Mapa — Sede da SPCir"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(contacts.address.join(", "))}&z=16&output=embed`}
              className="h-full min-h-96 w-full grayscale-[0.4]"
              loading="lazy"
            />
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
