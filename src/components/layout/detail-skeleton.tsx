/** Fallback de carregamento para páginas de detalhe (params dinâmicos). */
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="A carregar" className="animate-pulse">
      <div className="border-b border-line bg-brand-50/50">
        <div className="container-page space-y-4 py-14">
          <div className="h-3 w-40 rounded-full bg-brand-100" />
          <div className="h-10 w-2/3 rounded-xl bg-brand-100" />
          <div className="h-5 w-1/2 rounded-full bg-brand-100/70" />
        </div>
      </div>
      <div className="container-page space-y-3 py-14">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-4 rounded-full bg-surface" style={{ width: `${90 - i * 7}%` }} />
        ))}
      </div>
    </div>
  );
}
