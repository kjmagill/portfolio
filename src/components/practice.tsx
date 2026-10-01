import { Container } from "@/components/container";

const columns = [
  {
    title: "Front-end",
    lede: "Clean, commented code and snappy, minimalist design.",
    stack: "React, React Native, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind, Web3.js",
    extras: ["Expo", "Figma", "Android Studio", "Redux", "Sass"],
  },
  {
    title: "Back-end",
    lede: "APIs, databases, and smart contracts from scratch through production.",
    stack: "Node, Express, GraphQL, Python, Solidity, SQL, Rust",
    extras: ["AWS", "Postgres", "Apollo", "Remix", "Truffle"],
  },
  {
    title: "Collaboration",
    lede: "Years leading and shipping with remote, freelance, and founding teams.",
    stack: "Freelance projects, founding work, and distributed software teams",
    extras: ["GitHub", "Notion", "Slack", "Google Workspace", "Airtable"],
  },
] as const;

export function Practice() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <p className="kicker">Practice</p>
        <h2 className="font-heading mt-3 max-w-xl text-4xl text-sand sm:text-5xl">
          How I like to build.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/80 sm:grid-cols-3">
          {columns.map((column) => (
            <article key={column.title} className="bg-navy-2 p-7 sm:p-8">
              <h3 className="text-lg font-medium text-sand">{column.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {column.lede}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-sand/85">
                {column.stack}
              </p>
              <ul className="mt-5 space-y-1.5">
                {column.extras.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] tracking-[0.14em] text-copper uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
