"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/data/tour";
import { scrollToId } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type GlassBox = { left: number; width: number };

export function LiquidNav() {
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [glass, setGlass] = useState<GlassBox>({ left: 0, width: 0 });

  const target = hovered ?? active;

  const measure = useCallback(() => {
    const track = trackRef.current;
    const link = target >= 0 ? linkRefs.current[target] : null;
    if (!track || !link) {
      setGlass((prev) => ({ ...prev, width: 0 }));
      return;
    }
    setGlass({ left: link.offsetLeft, width: link.offsetWidth });
  }, [target]);

  useLayoutEffect(() => {
    measure();
    const track = trackRef.current;
    const ro = new ResizeObserver(measure);
    if (track) ro.observe(track);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const triggers = NAV_LINKS.map((link, index) =>
      ScrollTrigger.create({
        trigger: `#${link.id}`,
        start: "top 55%",
        end: "bottom 55%",
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) setActive(index);
          else if (index === 0 && self.direction < 0) setActive(-1);
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:pt-5">
      <nav
        className="liquid-glass pointer-events-auto flex max-w-full items-center gap-1 rounded-full p-1.5 md:gap-2"
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="shrink-0 rounded-full px-3 py-1 font-display text-[28px] font-bold leading-none text-spice-purple md:px-4"
        >
          Grand Scenic
        </a>

        <div
          ref={trackRef}
          className="relative hidden items-center rounded-full bg-white/25 p-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          <div
            aria-hidden
            className="absolute bottom-1 top-1 left-0 rounded-full bg-[linear-gradient(135deg,rgba(252,209,42,0.95),rgba(231,125,17,0.85))] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(193,68,14,0.3)] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: glass.width,
              transform: `translateX(${glass.left}px)`,
              opacity: glass.width > 0 ? 1 : 0,
            }}
          />
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              onClick={(e) => {
                e.preventDefault();
                setActive(index);
                scrollToId(link.id);
              }}
              className={cn(
                "relative z-10 rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                target === index ? "text-spice-ink" : "text-spice-ink/70 hover:text-spice-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#book"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("book");
          }}
          className="shrink-0 rounded-full bg-spice-red px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-spice-cream shadow-[0_8px_20px_rgba(193,68,14,0.35)] transition-colors hover:bg-spice-purple"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
