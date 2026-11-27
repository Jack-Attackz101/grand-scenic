# Cape Breton Grand Scenic

An 8-day supported cycling tour site for looping the Cabot Trail — Acadian villages, highland ridges, whale watches, and the Skyline Trail.

## Run locally

```bash
npm install
npm run dev -- -p 4317
```

Open [http://localhost:4317](http://localhost:4317).

## Stack

- Next.js + TypeScript + Tailwind, Moroccan Spice theme (Amatic SC headings, Mukta body)
- GSAP ScrollTrigger + Lenis smooth scroll for the pinned hero, liquid nav glass, and 3D week-card shuffle
- Three.js (React Three Fiber) spice-dust particles drifting between the sky and mountain layers
- Hero imagery under `public/images/`: AI-extended, upscaled sky layer plus a separate transparent mountain layer (wide and tall variants)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
