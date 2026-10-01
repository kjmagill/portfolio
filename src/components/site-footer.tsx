import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { SocialLinks } from "@/components/social-links";
import { links, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Link href={links.home} className="flex flex-col items-center gap-3">
          <Image
            src="/images/sigil.webp"
            alt=""
            width={56}
            height={56}
            loading="eager"
            className="size-14 rounded-md object-cover ring-1 ring-copper/30"
          />
          <p className="font-heading text-xl text-sand">{site.footerLine}</p>
        </Link>
        <SocialLinks />
        <p className="text-xs tracking-wide text-muted-foreground">
          Designed by {site.name}
          {" · "}
          <a
            href={links.capeMayWebDesign}
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            Cape May Web Design
          </a>
          {" · "}
          <span aria-hidden>©</span> {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
