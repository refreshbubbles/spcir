import { BadgePercent, BookOpen, GraduationCap, Users } from "lucide-react";
import type { Metadata } from "next";
import { Checkbox, Field, FormSection, Input, Select } from "@/components/forms/fields";
import { MockForm } from "@/components/forms/mock-form";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Quero ser Sócio" };

const benefits = [
  { icon: GraduationCap, title: "Programa Formativo", text: "Acesso aos cursos para o Internato de Cirurgia Geral." },
  { icon: BadgePercent, title: "Condições especiais", text: "Inscrição com desconto no Congresso Nacional e eventos." },
  { icon: Users, title: "Capítulos e Núcleos", text: "Participação activa nas áreas de diferenciação." },
  { icon: BookOpen, title: "Conteúdos exclusivos", text: "Documentos, gravações e publicações reservadas." },
];

const steps = [
  "Preencha o pedido de adesão",
  "Validação pela Direcção",
  "Pagamento da quota",
  "Acesso à Área Reservada",
];

export default function QueroSerSocioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Adesão"
        title="Quero ser Sócio"
        intro="Junte-se à Sociedade Portuguesa de Cirurgia. A adesão está aberta a especialistas e internos de Cirurgia Geral e áreas afins."
        crumbs={[{ label: "Quero ser Sócio" }]}
      />
      <ContentLayout>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-card border border-line bg-white p-6">
              <Icon className="size-7 text-brand-600" strokeWidth={1.5} />
              <p className="mt-5 font-display text-lg font-bold text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>

        <ol className="mt-10 grid gap-3 rounded-card bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-2xl bg-white p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-ink">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-card border border-line bg-white p-6 md:p-10">
          <h2 className="text-2xl font-bold text-ink">Pedido de adesão</h2>
          <p className="mt-2 text-muted">Os campos assinalados com * são obrigatórios.</p>
          <MockForm success="Pedido de adesão recebido!" className="mt-10 space-y-10">
            <FormSection title="Dados pessoais" description="Identificação do candidato a sócio.">
              <Field label="Nome completo" required className="sm:col-span-2">
                <Input name="name" required autoComplete="name" />
              </Field>
              <Field label="Email" required>
                <Input type="email" name="email" required autoComplete="email" />
              </Field>
              <Field label="Telemóvel" required>
                <Input type="tel" name="phone" required autoComplete="tel" />
              </Field>
              <Field label="Data de nascimento">
                <Input type="date" name="birthdate" />
              </Field>
              <Field label="NIF" hint="Para emissão de recibos de quota.">
                <Input name="nif" inputMode="numeric" />
              </Field>
            </FormSection>

            <FormSection title="Dados profissionais" description="Informação sobre a sua actividade clínica.">
              <Field label="N.º de cédula profissional (OM)" required>
                <Input name="cedula" required inputMode="numeric" />
              </Field>
              <Field label="Situação profissional" required>
                <Select name="status" required defaultValue="">
                  <option value="" disabled>
                    Seleccione…
                  </option>
                  <option>Interno de Formação Específica</option>
                  <option>Especialista</option>
                  <option>Outra especialidade</option>
                </Select>
              </Field>
              <Field label="Instituição / Hospital" required className="sm:col-span-2">
                <Input name="institution" required />
              </Field>
              <Field label="Ano de internato" hint="Apenas para internos.">
                <Select name="year" defaultValue="">
                  <option value="">—</option>
                  {[1, 2, 3, 4, 5, 6].map((y) => (
                    <option key={y}>{y}.º ano</option>
                  ))}
                </Select>
              </Field>
              <Field label="Capítulo de interesse">
                <Select name="chapter" defaultValue="">
                  <option value="">—</option>
                  <option>Coloproctologia</option>
                  <option>Cirurgia Hepato-Bilio-Pancreática</option>
                  <option>Outro</option>
                </Select>
              </Field>
            </FormSection>

            <FormSection title="Proposta" description="Indique dois sócios proponentes, se aplicável.">
              <Field label="Sócio proponente 1">
                <Input name="proposer1" placeholder="Nome ou n.º de sócio" />
              </Field>
              <Field label="Sócio proponente 2">
                <Input name="proposer2" placeholder="Nome ou n.º de sócio" />
              </Field>
              <div className="space-y-3 sm:col-span-2">
                <Checkbox required name="statutes">
                  Declaro que li e aceito os Estatutos da Sociedade Portuguesa de Cirurgia.
                </Checkbox>
                <Checkbox required name="privacy">
                  Autorizo o tratamento dos meus dados pessoais nos termos da Política de Privacidade.
                </Checkbox>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg">
                  Submeter pedido de adesão
                </Button>
              </div>
            </FormSection>
          </MockForm>
        </div>
      </ContentLayout>
    </>
  );
}
