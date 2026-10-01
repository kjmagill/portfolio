import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { links, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src="/images/coast.webp"
        alt="Night aerial of Cape May Point Lighthouse over a wide beach, dunes, and ponds"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/55 via-transparent to-navy/20" />

      <SiteHeader overlay />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="kicker">{site.kicker}</p>
        <h1 className="font-heading mt-4 max-w-xl text-5xl leading-[1.05] text-sand sm:text-6xl md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-sand/90 sm:text-xl">
          {site.tagline}
        </p>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
          I build software that helps people and businesses grow — from local
          service sites to products that run in the field and on-chain.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild className="h-11 rounded-full px-6">
            <Link href={links.work}>Selected work</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-copper/50 bg-transparent px-6 text-sand hover:bg-copper/10 hover:text-sand"
          >
            <Link href={links.contact}>Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
