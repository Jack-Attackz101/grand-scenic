"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

const DEPARTURES = ["June 14", "July 12", "August 9", "September 13", "October 4"];

export function BookCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".book-panel",
        { scale: 0.92, borderRadius: "120px" },
        {
          scale: 1,
          borderRadius: "36px",
          ease: "none",
          scrollTrigger: { trigger: ".book-panel", start: "top bottom", end: "top 30%", scrub: true },
        }
      );
      gsap.from(".book-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".book-panel", start: "top 65%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="book" ref={rootRef} className="relative bg-spice-cream px-4 pb-24 md:px-8">
      <div className="book-panel zellige relative mx-auto max-w-7xl overflow-hidden bg-spice-red px-8 py-16 text-spice-cream [--zellige-color:#FCD12A] [--zellige-opacity:0.14] md:px-16 md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-spice-saffron/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-spice-purple/50 blur-3xl" />

        <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="book-reveal text-xs font-semibold uppercase tracking-[0.32em] text-spice-saffron">
              2027 departures
            </p>
            <h2 className="book-reveal mt-3 text-7xl md:text-[8.5rem]">
              Eight seats a week. Claim one.
            </h2>
            <p className="book-reveal mt-6 max-w-lg text-lg leading-relaxed text-spice-cream/85">
              Small-group supported cycling, June through October. Tell us your dates
              and whether you are bringing a bike or borrowing one of ours.
            </p>
            <div className="book-reveal mt-10 flex flex-wrap gap-3">
              <a
                href="mailto:hello@grandscenic.ride?subject=Cape%20Breton%20Grand%20Scenic%20inquiry"
                className="rounded-full bg-spice-saffron px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-spice-ink shadow-[0_16px_40px_rgba(42,15,61,0.3)] transition-transform hover:-translate-y-0.5"
              >
                Request dates
              </a>
              <button
                onClick={() => scrollToId("week")}
                className="rounded-full border border-spice-cream/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-spice-cream transition-colors hover:bg-spice-cream/10"
              >
                Review the week
              </button>
            </div>
          </div>

          <ul className="book-reveal space-y-3">
            {DEPARTURES.map((date) => (
              <li
                key={date}
                className="flex items-center justify-between rounded-2xl border border-spice-cream/20 bg-black/10 px-5 py-4 backdrop-blur"
              >
                <span className="font-display text-4xl font-bold leading-none">{date}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-spice-saffron">
                  8 days
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
