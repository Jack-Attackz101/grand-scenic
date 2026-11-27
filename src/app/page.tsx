import { LiquidNav } from "@/components/liquid-nav";
import { Hero } from "@/components/hero";
import { RouteVista } from "@/components/route-vista";
import { WeekShuffle } from "@/components/week-shuffle";
import { WhatsIncluded } from "@/components/whats-included";
import { BookCta } from "@/components/book-cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main>
      <LiquidNav />
      <Hero />
      <RouteVista />
      <WeekShuffle />
      <WhatsIncluded />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
