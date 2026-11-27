"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEEK_DAYS } from "@/data/tour";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEP_Y = 20;
const STEP_Z = 80;

function slot(k: number) {
  return {
    y: k * STEP_Y,
    z: -k * STEP_Z,
    scale: 1 - k * 0.035,
    rotateX: 0,
    rotateZ: 0,
    opacity: k <= 3 ? 1 : 0,
    filter: `brightness(${1 - Math.min(k, 3) * 0.18})`,
  };
}

export function WeekShuffle() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;
    const n = cards.length;

    const ctx = gsap.context(() => {
      const content = (card: HTMLElement) => card.querySelectorAll(".card-content");
      cards.forEach((card, i) => {
        gsap.set(card, { ...slot(i), zIndex: n - i });
        gsap.set(content(card), { opacity: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${n * window.innerHeight * 0.7}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setCurrent(Math.min(n - 1, Math.floor(self.progress * n))),
        },
      });

      for (let i = 0; i < n; i++) {
        const front = cards[i];
        const side = i % 2 === 0 ? -1 : 1;
        tl.to(
          front,
          {
            yPercent: -140,
            z: 220,
            rotateX: 34,
            rotateZ: side * 10,
            opacity: 0,
            duration: 0.85,
            ease: "power2.in",
          },
          i
        ).set(front, { visibility: "hidden" }, i + 0.85);

        for (let j = i + 1; j < n; j++) {
          tl.to(cards[j], { ...slot(j - i - 1), duration: 1 }, i);
          if (j === i + 1) tl.to(content(cards[j]), { opacity: 1, duration: 0.45 }, i + 0.45);
        }
      }

      const tilt = tiltRef.current;
      if (tilt) {
        const rx = gsap.quickTo(tilt, "rotateX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(tilt, "rotateY", { duration: 0.8, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 16);
          rx(8 - py * 12);
        };
        const onLeave = () => {
          rx(8);
          ry(0);
        };
        gsap.set(tilt, { rotateX: 8 });
        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
        return () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="week"
      ref={sectionRef}
      className="zellige relative flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-spice-ink px-6 [--zellige-color:#FCD12A] [--zellige-opacity:0.09] [--zellige-size:120px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(231,125,17,0.35),transparent_70%)]" />

      <div className="relative z-10 mb-6 text-center md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-spice-saffron">
          Shuffle through the week
        </p>
        <h2 className="mt-2 text-6xl text-spice-cream md:text-7xl">Eight days, one loop</h2>
      </div>

      <div className="relative z-10 w-full" style={{ perspective: "1600px" }}>
        <div
          ref={tiltRef}
          className="relative mx-auto h-[min(52svh,500px)] w-[min(86vw,420px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {WEEK_DAYS.map((day, index) => (
            <div
              key={day.day}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute inset-0 will-change-transform"
              style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
            >
              <article
                className="zellige relative flex h-full flex-col justify-between overflow-hidden border border-spice-saffron/40 p-7 text-spice-cream shadow-[0_40px_80px_rgba(15,4,28,0.55)] [--zellige-color:#FCD12A] [--zellige-opacity:0.1] [border-radius:50%_50%_28px_28px/24%_24%_28px_28px] md:p-9"
                style={{ background: `linear-gradient(160deg, ${day.from} 0%, ${day.to} 100%)` }}
              >
                <div className="pointer-events-none absolute inset-3 border border-spice-saffron/30 [border-radius:50%_50%_20px_20px/23%_23%_20px_20px]" />
                <div className="card-content relative flex flex-col items-center gap-3 pt-6 text-center">
                  <span className="font-display text-[7.5rem] font-bold leading-[0.75] text-spice-saffron md:text-[9rem]">
                    {day.day}
                  </span>
                  <span className="rounded-full border border-spice-cream/30 bg-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {day.km}
                  </span>
                </div>
                <div className="card-content relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-spice-saffron/90">
                    {day.place}
                  </p>
                  <h3 className="mt-2 text-5xl md:text-6xl">{day.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-spice-cream/85">{day.copy}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-14 flex items-center gap-2" aria-hidden>
        {WEEK_DAYS.map((day, i) => (
          <span
            key={day.day}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === current ? "w-8 bg-spice-saffron" : "w-1.5 bg-spice-cream/35"
            )}
          />
        ))}
      </div>
    </section>
  );
}
