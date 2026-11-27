"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/components/smooth-scroll";
import { STATS } from "@/data/tour";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

const LAYER_SETS = [
  {
    key: "wide",
    className: "hidden md:block",
    sky: "/images/hero-wide-sky.jpg",
    mountain: "/images/hero-wide-mountain.webp",
    ratio: 4 / 3,
  },
  {
    key: "tall",
    className: "md:hidden",
    sky: "/images/hero-tall-sky.jpg",
    mountain: "/images/hero-tall-mountain.webp",
    ratio: 3 / 4,
  },
] as const;

function layerBox(ratio: number): React.CSSProperties {
  return {
    width: `max(100vw, calc(128svh * ${ratio}))`,
    aspectRatio: `${ratio}`,
    left: "50%",
    bottom: 0,
  };
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(".hero-box", { xPercent: -50 });
      gsap.set(".hero-curtain", { y: 64, yPercent: 100 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-sky-img", { scale: 1.12, duration: 2.4, ease: "power2.out" }, 0)
        .from(".hero-title-char", { yPercent: 110, opacity: 0, stagger: 0.05, duration: 1.3 }, 0.3)
        .from(".hero-intro", { y: 30, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.8);

      if (reduce) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        ".hero-sky",
        {
          y: (_i: number, el: HTMLElement) =>
            Math.min(Math.max(0, el.offsetHeight - window.innerHeight), window.innerHeight * 0.14),
          duration: 1,
        },
        0
      )
        .to(".hero-title", { yPercent: -45, duration: 1 }, 0)
        .to(".hero-intro", { y: -40, opacity: 0, stagger: 0.05, duration: 0.35 }, 0.1)
        .to(".hero-dust", { opacity: 0.25, duration: 0.6 }, 0.4)
        .to(".hero-curtain", { y: 0, yPercent: 0, duration: 0.55, ease: "power2.inOut" }, 0.72)
        .to(".hero-title", { opacity: 0, duration: 0.25 }, 0.95)
        .from(".hero-stat", { y: 40, opacity: 0, stagger: 0.04, duration: 0.25 }, 1.05);
    }, root);

    return () => ctx.revert();
  }, []);

  const title = "Cabot Trail";

  return (
    <section id="top" ref={rootRef} className="relative h-[100svh] overflow-hidden bg-[#7fb2e6]">
      {LAYER_SETS.map((set) => (
        <div key={set.key} className={`absolute inset-0 ${set.className}`} aria-hidden>
          <div className="hero-box hero-sky absolute will-change-transform" style={layerBox(set.ratio)}>
            <Image
              src={set.sky}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-sky-img object-cover"
            />
          </div>
        </div>
      ))}

      <div className="hero-dust pointer-events-none absolute inset-0">
        <HeroScene />
      </div>

      <div className="hero-title pointer-events-none absolute inset-x-0 top-[33svh] flex justify-center md:top-[25svh]">
        <h1 className="overflow-hidden px-2 text-center font-display text-[30vw] font-bold leading-[0.85] text-spice-cream drop-shadow-[0_12px_40px_rgba(42,15,61,0.35)] md:text-[19vw]">
          <span className="sr-only">Cape Breton Grand Scenic: </span>
          {title.split("").map((char, i) => (
            <span key={i} className="hero-title-char inline-block" aria-hidden>
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </h1>
      </div>

      {LAYER_SETS.map((set) => (
        <div key={set.key} className={`pointer-events-none absolute inset-0 ${set.className}`} aria-hidden>
          <div className="hero-box absolute" style={layerBox(set.ratio)}>
            <Image
              src={set.mountain}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,transparent,rgba(11,48,16,0.55)_55%,rgba(42,15,61,0.75))]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 md:px-10 md:pb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="hero-intro mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-spice-saffron">
              <span className="h-px w-10 bg-spice-saffron" />
              Cape Breton Grand Scenic
            </p>
            <p className="hero-intro font-display text-5xl font-bold leading-[0.9] text-spice-cream md:text-7xl">
              Eight days around the Cabot Trail
            </p>
            <p className="hero-intro mt-4 max-w-md text-base leading-relaxed text-spice-cream/85 md:text-lg">
              A supported cycling loop through Acadian villages, highland ridges,
              and Atlantic headlands in Nova Scotia.
            </p>
          </div>
          <div className="hero-intro flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("book")}
              className="rounded-full bg-spice-saffron px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-spice-ink shadow-[0_14px_34px_rgba(252,209,42,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Reserve your week
            </button>
            <button
              onClick={() => scrollToId("week")}
              className="liquid-glass rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-spice-ink transition-transform hover:-translate-y-0.5"
            >
              See the eight days
            </button>
          </div>
        </div>
      </div>

      <div className="hero-curtain absolute inset-x-0 bottom-0 z-20 h-[52%]"
        style={{ transform: "translateY(calc(100% + 64px))" }}>
        <svg
          className="absolute -top-[39px] left-0 h-10 w-full text-spice-cream"
          viewBox="0 0 120 10"
          preserveAspectRatio="none"
          aria-hidden
        >
          <pattern id="arches" width="12" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 10V6C0 2.5 3 0 6 0s6 2.5 6 6v4z" fill="currentColor" />
          </pattern>
          <rect width="120" height="10" fill="url(#arches)" />
        </svg>
        <div className="zellige flex h-full items-center bg-spice-cream [--zellige-opacity:0.07]">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero-stat text-center">
                <p className="font-display text-7xl font-bold leading-none text-spice-red md:text-8xl">
                  {stat.value}
                  <span className="text-spice-orange">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-spice-purple/75">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
