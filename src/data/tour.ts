export const NAV_LINKS = [
  { id: "route", label: "The Route" },
  { id: "week", label: "The Week" },
  { id: "included", label: "Included" },
] as const;

export const STATS = [
  { value: 298, suffix: " km", label: "of coastal loop" },
  { value: 8, suffix: "", label: "days in the saddle" },
  { value: 6, suffix: "", label: "villages & stops" },
  { value: 8, suffix: "", label: "riders per departure" },
] as const;

export const ROUTE_STOPS = [
  { name: "Baddeck", note: "Start on Bras d'Or Lake" },
  { name: "Inverness", note: "Warm Gulf beaches" },
  { name: "Chéticamp", note: "Acadian heartland" },
  { name: "Pleasant Bay", note: "Whales offshore" },
  { name: "Ingonish", note: "Atlantic headlands" },
  { name: "Baddeck", note: "Loop closes" },
] as const;

export const WEEK_DAYS = [
  {
    day: "01",
    title: "Baddeck Arrival",
    place: "Bras d'Or Lake",
    copy: "Settle into lakeside lodging, shake out the legs on quiet village roads, and visit the Alexander Graham Bell National Historic Site before the loop begins.",
    km: "18 km easy",
    from: "#4A148C",
    to: "#2A0F3D",
  },
  {
    day: "02",
    title: "Margaree to Inverness",
    place: "Gulf Shore",
    copy: "Roll west through salmon-river farmland toward warmer Gulf water. Wide beaches, links golf country, and a sunset ride along the sand.",
    km: "62 km rolling",
    from: "#C1440E",
    to: "#7A2508",
  },
  {
    day: "03",
    title: "Acadian Coast",
    place: "Chéticamp",
    copy: "Enter the French heart of the trail. Rug-hooking studios, fricot kitchens, and a gentle coastal spin under highland silhouettes.",
    km: "48 km coastal",
    from: "#1B5E20",
    to: "#0B3010",
  },
  {
    day: "04",
    title: "Highlands Gateway",
    place: "Cape Breton Park",
    copy: "The national park gates open. Valley-floor trails in the morning, then a supported climb onto the plateau.",
    km: "54 km climbing",
    from: "#E77D11",
    to: "#A3470A",
  },
  {
    day: "05",
    title: "Ridge & Whales",
    place: "Pleasant Bay",
    copy: "The showpiece: switchbacks onto the highland ridge with the Gulf below. Descend to Pleasant Bay for an afternoon whale watch.",
    km: "41 km alpine",
    from: "#4A148C",
    to: "#1B0833",
  },
  {
    day: "06",
    title: "Eastern Descent",
    place: "Ingonish Beach",
    copy: "Cross the plateau and drop to the Atlantic side. Six beaches, cold saltwater, and lodging perched above the headlands.",
    km: "58 km descent",
    from: "#C1440E",
    to: "#5E1F06",
  },
  {
    day: "07",
    title: "Skyline Trail",
    place: "French Mountain",
    copy: "Leave early for the signature boardwalk cliffs. A shorter park ride afterwards keeps legs fresh for the final stretch.",
    km: "Hike + 22 km",
    from: "#1B5E20",
    to: "#082A0C",
  },
  {
    day: "08",
    title: "Loop Close",
    place: "Back to Baddeck",
    copy: "Pastoral southbound miles, a coffee stop at Wreck Cove, and a ceremonial roll back into Baddeck to close the circuit.",
    km: "72 km return",
    from: "#E77D11",
    to: "#8A3A07",
  },
] as const;

export const INCLUDED = [
  {
    title: "Two guides, every day",
    detail:
      "One rides with the group, one drives the support van, so the pace flexes to every rider without anyone waiting.",
    stat: "2:8",
    statLabel: "guide to rider ratio",
  },
  {
    title: "Sag wagon & mechanic",
    detail:
      "Spare parts, rain shells, snacks, and a mechanic who knows highland weather.",
  },
  {
    title: "Seven boutique nights",
    detail:
      "Inns and lodges chosen for trail access, hot showers, and a proper view at breakfast.",
  },
  {
    title: "Acadian & seafood tables",
    detail:
      "Daily breakfasts, trail lunches, and five dinners from Chéticamp kitchens to Ingonish lobster.",
  },
  {
    title: "Park passes handled",
    detail:
      "Cape Breton Highlands entry and every logistics detail sorted before you clip in.",
  },
  {
    title: "Fitted bike or bring yours",
    detail:
      "Ride your own road or gravel bike, or a fitted rental with spare wheels in the van.",
  },
] as const;
