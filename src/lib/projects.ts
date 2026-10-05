export type Project = {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  image: string;
  kind: "Product" | "App" | "Protocol" | "Studio";
  fit?: "cover" | "contain";
};

export const projects: Project[] = [
  {
    slug: "compbook",
    name: "Compbook",
    blurb: "Digital sports-card comps and market estimates.",
    href: "https://usecompbook.com",
    image: "/images/projects/compbook.webp",
    kind: "Product",
    fit: "contain",
  },
  {
    slug: "contrax",
    name: "Contrax dApp",
    blurb: "Auto-compounding vaults and DeFi tools on Arbitrum.",
    href: "https://github.com/Contrax-co/contrax-dapp",
    image: "/images/projects/contrax.webp",
    kind: "Protocol",
  },
  {
    slug: "care-for-life",
    name: "Care For Life",
    blurb:
      "Offline-first Android app for nonprofit field operations in Africa.",
    href: "https://github.com/kjmagill/care-for-life-fe",
    image: "/images/projects/care-for-life.webp",
    kind: "App",
  },
  {
    slug: "cantocurb",
    name: "CanToCurb",
    blurb:
      "Redesign and online scheduling for a local trash & recycling valet service.",
    href: "https://www.cantocurb.com",
    image: "/images/projects/cantocurb.webp",
    kind: "Studio",
  },
  {
    slug: "back-bay",
    name: "Back Bay Rentals",
    blurb: "Online booking and scheduling for local LSV rentals.",
    href: "https://www.backbaybuggies.com",
    image: "/images/projects/backbay.webp",
    kind: "Studio",
  },
  {
    slug: "golden-paver",
    name: "Golden Paver",
    blurb: "Local service-business marketing website and lead capture.",
    href: "https://www.goldenpaver.com",
    image: "/images/projects/golden-paver.webp",
    kind: "Studio",
  },
  {
    slug: "hornless",
    name: "HornlessHorseAI",
    blurb: "An AI platform built around radical transparency.",
    href: "https://hornlesshorse.com",
    image: "/images/projects/hornless.webp",
    kind: "Product",
  },
  {
    slug: "tmc",
    name: "Tom Magill Construction",
    blurb: "Marketing site for a custom home builder and remodeler.",
    href: "https://www.tommagillconstruction.com",
    image: "/images/projects/tmc.webp",
    kind: "Studio",
  },
  {
    slug: "todesko",
    name: "Todesko Bookkeeping",
    blurb: "A clear, professional web presence for a bookkeeping studio.",
    href: "https://todeskobookkeeping.com",
    image: "/images/projects/todesko.webp",
    kind: "Studio",
  },
];
