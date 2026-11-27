export function SiteFooter() {
  return (
    <footer className="bg-spice-ink px-6 py-14 text-spice-cream md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-6xl font-bold leading-none text-spice-saffron">
            Cape Breton Grand Scenic
          </p>
          <p className="mt-3 text-sm text-spice-cream/60">
            Supported cycling on the Cabot Trail, Nova Scotia.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-spice-cream/50">
          Baddeck · Chéticamp · Pleasant Bay · Ingonish
        </p>
      </div>
    </footer>
  );
}
