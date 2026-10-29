import type { Metadata } from "next";
import { Checkbox, Field, Input, Textarea } from "@/components/forms/fields";
import { MockForm } from "@/components/forms/mock-form";
import { ContentPageView } from "@/components/layout/content-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Pedido de Patrocínio Científico" };

export default function PedidoPatrocinioPage() {
  return (
    <ContentPageView slug="pedido-de-patrocinio">
      <div className="mt-12 rounded-card border border-line bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-ink">Formulário de pedido</h2>
        <p className="mt-2 text-muted">O pedido deve ser submetido com pelo menos 60 dias de antecedência.</p>
        <MockForm success="Pedido de patrocínio submetido!" className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Nome do evento" required className="sm:col-span-2">
            <Input name="event" required />
          </Field>
          <Field label="Data(s)" required>
            <Input name="dates" required placeholder="ex.: 12 e 13 de Maio de 2027" />
          </Field>
          <Field label="Local" required>
            <Input name="location" required />
          </Field>
          <Field label="Entidade organizadora" required>
            <Input name="organizer" required />
          </Field>
          <Field label="Responsável / Email" required>
            <Input type="email" name="email" required />
          </Field>
          <Field label="Descrição e objectivos" required className="sm:col-span-2">
            <Textarea name="description" required />
          </Field>
          <Field label="Programa provisório (PDF)" className="sm:col-span-2">
            <Input
              type="file"
              name="program"
              accept="application/pdf"
              className="file:mr-4 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-brand-700"
            />
          </Field>
          <div className="sm:col-span-2">
            <Checkbox required name="rules">
              Declaro que li e aceito o Regulamento de Patrocínio Científico da SPCir.
            </Checkbox>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg">
              Submeter pedido
            </Button>
          </div>
        </MockForm>
      </div>
    </ContentPageView>
  );
}
