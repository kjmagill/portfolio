import { Container } from "@/components/container";
import { links } from "@/lib/site";

const facts = [
  {
    label: "Founder",
    value: "Flowstate Labs · Cape May Web Design",
  },
  {
    label: "Field",
    value: "Fintech · Ecommerce · Web · Business development",
  },
  {
    label: "Stack",
    value: "Python · TypeScript · JavaScript · Solidity · Rust",
  },
  {
    label: "Schools",
    value: "Bloomtech · Coastal Carolina · Drexel",
  },
  {
    label: "DeFi",
    value: "Co-founded Contrax on Arbitrum",
  },
  {
    label: "After hours",
    value: "Vulnerabilities · Agentic loops · Automations · Basketball · Hold'em",
  },
] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <p className="kicker">Hello, world</p>
        <div className="mt-6 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-4xl text-sand sm:text-5xl">
              A developer from New Jersey, building in public and for the coast.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              <p>
                I&apos;m KJ. I founded{" "}
                <span className="text-sand">Flowstate Labs</span> and{" "}
                <a
                  href={links.capeMayWebDesign}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Cape May Web Design
                </a>
                , and co-founded{" "}
                <a
                  href={links.contrax}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  Contrax
                </a>
                , a DeFi protocol on Arbitrum.
              </p>
              <p>
                I care about clean, commented code and quiet interfaces —
                software that helps a business grow its presence, or a team
                actually get the work done. I&apos;ve shipped with remote,
                freelance, and founding teams for years.
              </p>
              <p>
                When I&apos;m not at the keyboard, I&apos;m in the gym, on the
                basketball court, or out seeing some new corner of the world.
                Say hello on{" "}
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>

          <dl className="self-start divide-y divide-border/80 rounded-2xl border border-border/80 bg-navy-2/60 px-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:items-baseline"
              >
                <dt className="font-mono text-[11px] font-semibold tracking-[0.22em] text-copper uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-relaxed text-sand/90">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
