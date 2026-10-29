"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // A rotação automática é conduzida pelo fim da animação da barra de progresso,
  // para que pausar (hover/foco/botão) fique sincronizado com o indicador.
  const autoplay = count > 1 && !reducedMotion;
  const running = autoplay && !paused && !hovered;
  const progress = () =>
    autoplay && (
      <span
        key={index}
        onAnimationEnd={() => go(index + 1)}
        className="absolute inset-0 origin-left animate-progress bg-brand-700"
        style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused" }}
      />
    );

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        aria-hidden
      />
      <div className="absolute top-1/3 -left-40 size-[28rem] rounded-full bg-sand-100/70 blur-3xl" aria-hidden />

      <div className="relative container-page pt-10 pb-28 md:pt-14 lg:pt-16 lg:pb-32">
        <div className="grid">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${count}: ${slide.title}`}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-10 transition-all duration-700 ease-out lg:grid-cols-12 lg:gap-14",
                  active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <div
                  className={cn(
                    "order-2 transition-transform duration-700 ease-out lg:order-1 lg:col-span-6",
                    active ? "translate-y-0" : "translate-y-4",
                  )}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-line">
                    <span className="size-1.5 rounded-full bg-sand-400" />
                    {slide.eyebrow}
                  </span>
                  <h2 className="mt-5 text-4xl leading-[1.08] font-extrabold text-ink sm:text-5xl lg:text-[3.5rem]">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{slide.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink
                      href={slide.cta.href}
                      external={slide.cta.external}
                      size="lg"
                      tabIndex={active ? 0 : -1}
                    >
                      {slide.cta.label}
                      <ArrowRight className="size-4" />
                    </ButtonLink>
                    {slide.secondaryCta && (
                      <ButtonLink
                        href={slide.secondaryCta.href}
                        external={slide.secondaryCta.external}
                        variant="secondary"
                        size="lg"
                        tabIndex={active ? 0 : -1}
                      >
                        {slide.secondaryCta.label}
                      </ButtonLink>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "order-1 transition-all duration-700 ease-out lg:order-2 lg:col-span-6",
                    active ? "scale-100" : "scale-[0.97]",
                  )}
                >
                  <div className="relative mx-auto max-w-xl lg:max-w-none">
                    <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-sand-100/70" aria-hidden />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-black/5">
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controlos */}
        <div className="mt-10 flex items-center gap-4 lg:mt-14">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line hover:text-brand-700"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line hover:text-brand-700"
              aria-label="Seguinte"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              hidden={!autoplay}
              className="grid size-10 place-items-center rounded-full text-muted hover:text-brand-700"
              aria-label={paused ? "Retomar rotação" : "Pausar rotação"}
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
          </div>

          <div className="hidden flex-1 grid-cols-4 gap-4 md:grid">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para: ${slide.title}`}
                aria-current={i === index}
                className="group text-left"
              >
                <span className="relative block h-0.5 overflow-hidden rounded-full bg-brand-100">
                  {i === index ? autoplay ? progress() : <span className="absolute inset-0 bg-brand-700" /> : null}
                  {i < index && <span className="absolute inset-0 bg-brand-300" />}
                </span>
                <span
                  className={cn(
                    "mt-3 line-clamp-1 text-[0.8125rem] font-medium transition-colors",
                    i === index ? "text-ink" : "text-muted group-hover:text-ink",
                  )}
                >
                  {slide.title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-1.5 md:hidden">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para o destaque ${i + 1}`}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all",
                  i === index ? "w-8 bg-brand-200" : "w-1.5 bg-brand-200",
                )}
              >
                {i === index && (autoplay ? progress() : <span className="absolute inset-0 bg-brand-700" />)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
