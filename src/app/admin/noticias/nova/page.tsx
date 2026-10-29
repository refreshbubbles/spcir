import { Bold, Heading2, ImagePlus, Italic, Link2, List, Quote } from "lucide-react";
import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/admin-ui";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/forms/fields";
import { Button, ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Nova notícia" };

export default function NovaNoticiaPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nova notícia"
        description="Os campos marcados com * são obrigatórios."
        actions={
          <>
            <ButtonLink href="/admin/noticias" variant="secondary" size="sm">
              Cancelar
            </ButtonLink>
            <Button size="sm">Publicar</Button>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel>
            <div className="space-y-5 p-5">
              <Field label="Título" required>
                <Input placeholder="Título da notícia" />
              </Field>
              <Field label="Slug (URL)" hint="Gerado automaticamente a partir do título.">
                <Input placeholder="/noticias/titulo-da-noticia" />
              </Field>
              <Field label="Resumo" required>
                <Textarea rows={3} className="min-h-0" placeholder="Texto curto apresentado nas listagens" />
              </Field>
              <div>
                <span className="mb-1.5 block text-sm font-semibold text-ink">Conteúdo *</span>
                <div className="overflow-hidden rounded-xl border border-line">
                  <div className="flex gap-1 border-b border-line bg-surface p-1.5 text-ink/70">
                    {[Heading2, Bold, Italic, List, Quote, Link2, ImagePlus].map((Icon, i) => (
                      <button
                        key={i}
                        type="button"
                        className="grid size-8 place-items-center rounded-md hover:bg-white hover:text-ink"
                      >
                        <Icon className="size-4" />
                      </button>
                    ))}
                  </div>
                  <div className="min-h-72 p-4 text-sm text-muted">
                    Editor de texto rico (fase 2: TipTap / Lexical)…
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Publicação">
            <div className="space-y-4 p-5">
              <Field label="Estado">
                <Select defaultValue="draft">
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicada</option>
                  <option value="scheduled">Agendada</option>
                </Select>
              </Field>
              <Field label="Data de publicação">
                <Input type="date" defaultValue="2026-10-26" />
              </Field>
              <Checkbox>Destacar na homepage</Checkbox>
            </div>
          </Panel>
          <Panel title="Classificação">
            <div className="space-y-4 p-5">
              <Field label="Categoria" required>
                <Select defaultValue="">
                  <option value="" disabled>
                    Seleccione…
                  </option>
                  {["Sociedade", "Formação", "Congresso", "Publicações", "Investigação", "Capítulos"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Capítulo associado">
                <Select defaultValue="">
                  <option value="">—</option>
                  <option>Coloproctologia</option>
                </Select>
              </Field>
            </div>
          </Panel>
          <Panel title="Imagem de destaque">
            <div className="p-5">
              <div className="grid place-items-center rounded-xl border-2 border-dashed border-line bg-surface px-4 py-10 text-center">
                <ImagePlus className="size-8 text-muted" />
                <p className="mt-2 text-sm font-semibold text-ink">Arraste uma imagem</p>
                <p className="text-xs text-muted">JPG ou PNG · mín. 1600×1000</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
