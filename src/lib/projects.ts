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
    blurb:
      "Sports-card collectors compare recent sales to estimate card values and follow the market.",
    href: "https://usecompbook.com",
    image: "/images/projects/compbook.webp",
    kind: "Product",
    fit: "contain",
  },
  {
    slug: "contrax",
    name: "Contrax dApp",
    blurb:
      "A DeFi app for exploring Arbitrum protocols and using auto-compounding yield vaults.",
    href: "https://github.com/Contrax-co/contrax-dapp",
    image: "/images/projects/contrax.webp",
    kind: "Protocol",
  },
  {
    slug: "care-for-life",
    name: "Care For Life",
    blurb:
      "Offline-first Android tools help nonprofit field teams coordinate programs in low-connectivity areas.",
    href: "https://github.com/kjmagill/care-for-life-fe",
    image: "/images/projects/care-for-life.webp",
    kind: "App",
  },
  {
    slug: "cantocurb",
    name: "CanToCurb",
    blurb:
      "Trash and recycling bin valet service for homes in Cape May County.",
    href: "https://www.cantocurb.com",
    image: "/images/projects/cantocurb.webp",
    kind: "Studio",
  },
  {
    slug: "back-bay",
    name: "Back Bay Rentals",
    blurb:
      "Street-legal golf cart rentals with pickup and delivery across Cape May County.",
    href: "https://www.backbaybuggies.com",
    image: "/images/projects/backbay.webp",
    kind: "Studio",
  },
  {
    slug: "golden-paver",
    name: "Golden Paver",
    blurb:
      "Paver cleaning, polymeric sanding, sealing, and restoration across South Jersey.",
    href: "https://www.goldenpaver.com",
    image: "/images/projects/golden-paver.webp",
    kind: "Studio",
  },
  {
    slug: "hornless",
    name: "HornlessHorseAI",
    blurb:
      "An AI platform built around radical transparency.",
    href: "https://hornlesshorse.com",
    image: "/images/projects/hornless.webp",
    kind: "Product",
  },
  {
    slug: "tmc",
    name: "Tom Magill Construction",
    blurb:
      "Custom home building, additions, and remodeling in Cape May County, New Jersey.",
    href: "https://www.tommagillconstruction.com",
    image: "/images/projects/tmc.webp",
    kind: "Studio",
  },
  {
    slug: "todesko",
    name: "Todesko Bookkeeping",
    blurb:
      "Bookkeeping, QuickBooks setup, payroll, and financial reporting for small businesses.",
    href: "https://todeskobookkeeping.com",
    image: "/images/projects/todesko.webp",
    kind: "Studio",
  },
];
