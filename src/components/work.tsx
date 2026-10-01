import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/site";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-8 sm:py-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="font-heading mt-3 text-4xl text-sand sm:text-5xl">
              Recent projects
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
            Products I founded, apps I shipped, and sites built for local
            businesses. Want to see more?{" "}
            <Link href={links.contact} className="prose-link">
              Contact me
            </Link>
            .
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-border/80 bg-navy-2 transition-colors group-hover:border-copper/35">
                  <div className="relative aspect-[3/2] overflow-hidden bg-navy">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      loading="eager"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={
                        project.fit === "contain"
                          ? "object-contain p-6"
                          : "object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                      }
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-copper uppercase">
                        {project.kind}
                      </p>
                      <h3 className="mt-1 text-base font-medium text-sand">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {project.blurb}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-teal-soft" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-copper/40 bg-transparent px-6 text-sand hover:bg-copper/10 hover:text-sand"
          >
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              See more on GitHub
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
