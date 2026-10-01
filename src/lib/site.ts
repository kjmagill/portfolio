export const site = {
  name: "KJ Magill",
  title: "KJ Magill · Full-stack developer and founder",
  description:
    "Full-stack developer and founder based in New Jersey. I build software for people and businesses — from local service sites to products that run in the field and on-chain.",
  url: "https://kjmagill.com",
  email: "kjmagill@protonmail.com",
  locale: "Cape May, New Jersey",
  tagline: "Full-stack developer and founder.",
  kicker: "Software · Founder · New Jersey",
  footerLine: "Leveling up, one day at a time.",
  recaptchaSiteKey: "6Lew3SMUAAAAAJ82QoS7gqOTkRI_dhYrFy1f7Sqy",
  basinEndpoint: "https://usebasin.com/f/98f5540f74f1",
} as const;

export const links = {
  home: "/",
  work: "/#work",
  about: "/#about",
  contact: "/contact",
  github: "https://github.com/kjmagill",
  linkedin: "https://www.linkedin.com/in/kjmagill/",
  x: "https://x.com/kjmagill",
  email: "mailto:kjmagill@protonmail.com",
  capeMayWebDesign: "https://www.capemaywebdesign.com",
  flowstate: "https://github.com/kjmagill",
  contrax: "https://github.com/Contrax-co/contrax-dapp",
} as const;

export const nav = [
  { href: links.work, label: "Work" },
  { href: links.about, label: "About" },
  { href: links.contact, label: "Contact" },
] as const;

export const socials = [
  { href: links.github, label: "GitHub" },
  { href: links.x, label: "X" },
  { href: links.linkedin, label: "LinkedIn" },
  { href: links.email, label: "Email" },
] as const;
