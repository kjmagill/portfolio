import Link from "next/link";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/site";

export function Cta() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-copper/25 bg-navy-2 px-7 py-8 sm:flex-row sm:items-center sm:px-10 sm:py-10">
          <div>
            <p className="kicker">Collaborate</p>
            <h2 className="font-heading mt-3 text-3xl text-sand sm:text-4xl">
              Interested in hiring me or collaborating?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              I&apos;m always open to a well-timed role or a project worth
              building. Tell me a little about what you have in mind.
            </p>
          </div>
          <Button asChild className="h-11 shrink-0 rounded-full px-6">
            <Link href={links.contact}>Let&apos;s do this</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
