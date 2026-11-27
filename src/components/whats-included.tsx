"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BedDouble, Bike, Ticket, Users, UtensilsCrossed, Wrench } from "lucide-react";
import { INCLUDED } from "@/data/tour";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Users, Wrench, BedDouble, UtensilsCrossed, Ticket, Bike];
const ACCENTS = ["", "bg-spice-red", "bg-spice-green", "bg-spice-orange", "bg-spice-purple", "bg-spice-saffron text-spice-ink"];

export function WhatsIncluded() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".include-heading > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".include-heading", start: "top 80%" },
      });

      gsap.from(".include-card", {
        y: 90,
        rotateX: -18,
        opacity: 0,
        transformOrigin: "50% 100%",
        stagger: 0.09,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".include-grid", start: "top 78%" },
      });

      const cleanups: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".include-card").forEach((card) => {
        const rx = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="included" ref={rootRef} className="relative bg-spice-cream px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="include-heading mb-16 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-spice-red">
              What&apos;s included
            </p>
            <h2 className="mt-3 text-6xl text-spice-purple md:text-8xl">
              Everything between the first climb and the last lake swim
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-spice-ink/75">
            You ride. We handle the highland weather, the bags, the bikes and the
            dinner reservations, so every day feels like the good part.
          </p>
        </div>

        <div className="include-grid grid gap-5 md:grid-cols-3" style={{ perspective: "1400px" }}>
          {INCLUDED.map((item, index) => {
            const Icon = ICONS[index];
            const feature = index === 0;
            const wide = index === INCLUDED.length - 1;
            return (
              <article
                key={item.title}
                className={cn(
                  "include-card group relative overflow-hidden rounded-[28px] p-8 will-change-transform",
                  feature
                    ? "zellige flex flex-col justify-between bg-spice-purple text-spice-cream shadow-[0_40px_80px_rgba(74,20,140,0.35)] [--zellige-color:#FCD12A] [--zellige-opacity:0.12] md:row-span-2 md:p-10"
                    : wide
                      ? "zellige flex flex-col gap-6 bg-spice-green text-spice-cream shadow-[0_30px_70px_rgba(27,94,32,0.3)] [--zellige-color:#FCD12A] [--zellige-opacity:0.1] md:col-span-3 md:flex-row md:items-center md:gap-10"
                      : "border border-spice-orange/25 bg-white/60 shadow-[0_20px_50px_rgba(193,68,14,0.1)] backdrop-blur"
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: feature
                      ? "radial-gradient(320px circle at var(--mx) var(--my), rgba(252,209,42,0.25), transparent 60%)"
                      : "radial-gradient(280px circle at var(--mx) var(--my), rgba(252,209,42,0.35), transparent 60%)",
                  }}
                />
                <div
                  className={cn(
                    "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                    !wide && "mb-6",
                    feature ? "bg-spice-saffron text-spice-purple" : cn("text-spice-cream", ACCENTS[index])
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div className="relative">
                  {feature && "stat" in item && (
                    <p className="mb-4 font-display text-[9rem] font-bold leading-[0.8] text-spice-saffron md:text-[12rem]">
                      {item.stat}
                      <span className="mt-2 block font-body text-xs font-semibold uppercase tracking-[0.28em] text-spice-cream/70">
                        {item.statLabel}
                      </span>
                    </p>
                  )}
                  <h3 className={cn("text-5xl", feature ? "text-spice-cream md:text-6xl" : wide ? "text-spice-cream" : "text-spice-ink")}>
                    {item.title}
                  </h3>
                  <p className={cn("mt-3 text-[15px] leading-relaxed", feature || wide ? "text-spice-cream/80" : "text-spice-ink/70")}>
                    {item.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
