"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTE_STOPS } from "@/data/tour";

gsap.registerPlugin(ScrollTrigger);

export function RouteVista() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".route-photo",
        { clipPath: "inset(18% 14% 0% 14% round 400px 400px 28px 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 400px 400px 28px 28px)",
          ease: "none",
          scrollTrigger: { trigger: ".route-photo", start: "top 90%", end: "top 25%", scrub: true },
        }
      );
      gsap.fromTo(
        ".route-photo img",
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".route-photo", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      const path = rootRef.current?.querySelector<SVGPathElement>(".route-line");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".route-stops", start: "top 75%", end: "bottom 55%", scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>(".route-stop").forEach((stop) => {
        gsap.from(stop, {
          x: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: stop, start: "top 82%" },
        });
      });

      gsap.from(".route-heading > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".route-heading", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="route"
      ref={rootRef}
      className="zellige relative px-6 pb-28 pt-10 [--zellige-opacity:0.07] md:px-10 md:pb-36 md:pt-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="route-heading mb-16 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-spice-red">
              The route
            </p>
            <h2 className="mt-3 text-6xl text-spice-purple md:text-8xl">
              298 kilometres of cliff, plateau and fishing village
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-spice-ink/75">
            Counter-clockwise from Baddeck, west through Margaree and Chéticamp,
            over the highland ridge to Pleasant Bay, then down to Ingonish before
            the loop closes. The ocean stays on your right whenever you want to stop.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="route-photo relative aspect-[3/4] overflow-hidden rounded-[400px_400px_28px_28px] shadow-[0_40px_90px_rgba(42,15,61,0.25)]">
            <Image
              src="/images/route-road.jpg"
              alt="Riders on a switchback of the Cabot Trail above the Gulf of St. Lawrence"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(42,15,61,0.75))]" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="font-display text-5xl font-bold leading-none text-spice-cream">
                French Mountain switchbacks
              </p>
              <p className="mt-2 text-sm text-spice-cream/80">
                Day five: the climb everyone talks about at dinner.
              </p>
            </div>
          </div>

          <div className="route-stops relative self-center">
            <svg
              className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-6 overflow-visible"
              viewBox="0 0 24 600"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M2 0 V600" stroke="rgba(74,20,140,0.15)" strokeWidth="3" fill="none" />
              <path
                className="route-line"
                d="M2 0 V600"
                stroke="url(#routeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="routeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FCD12A" />
                  <stop offset="50%" stopColor="#E77D11" />
                  <stop offset="100%" stopColor="#C1440E" />
                </linearGradient>
              </defs>
            </svg>
            <ol className="space-y-10">
              {ROUTE_STOPS.map((stop, i) => (
                <li key={`${stop.name}-${i}`} className="route-stop relative flex gap-6 pl-0">
                  <span className="relative z-10 mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-spice-orange bg-spice-cream">
                    <span className="h-2 w-2 rounded-full bg-spice-red" />
                  </span>
                  <div>
                    <p className="font-display text-5xl font-bold leading-none text-spice-ink">
                      {stop.name}
                    </p>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-spice-green">
                      {stop.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
