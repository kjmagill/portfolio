import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { projects } from "@/lib/projects";
import { links } from "@/lib/site";

const details = ["Sports-card intelligence", "Decentralized finance", "Technology with purpose"];
export function Work() {
  return <section id="work" className="section work-section"><Container>
    <div className="section-heading"><div><p className="section-label">01 / Selected work</p><h2>Ideas into outcomes.</h2></div><p>Independent products, collaborative builds,<br className="hidden sm:block" /> and better tools for everyday business.</p></div>
    <div className="featured-projects">{projects.slice(0, 3).map((project, i) => <a key={project.slug} className={`project-card project-${project.slug}`} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: ${project.href.includes("github") ? "view source on GitHub" : "visit website"} (opens in a new tab)`}>
      <div className="project-art" aria-hidden="true"><span className="project-art-label">{details[i]}</span><span className="project-wordmark">{i === 0 ? "compbook" : i === 1 ? "contrax" : <>care<br />for life.</>}</span><span className="project-art-bottom">{i === 0 ? "Know the card. Know the value." : i === 1 ? "Compounding interest made simple." : "Teaching self-reliance to end the cycle of poverty."}<ArrowUpRight size={22} /></span></div>
      <div className="project-info"><div><span className="project-index">0{i + 1} / {project.kind}</span><h3>{project.name}</h3></div><ArrowUpRight size={20} aria-hidden="true" /><p>{project.blurb}</p></div>
    </a>)}</div>
    <div className="more-work-heading"><h3>More from the workbench</h3><a href={links.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    <div className="project-list">{projects.slice(3).map(project => <a href={project.href} target="_blank" rel="noopener noreferrer" key={project.slug} className="project-row"><span className="project-row-name">{project.name}</span><span className="project-row-description">{project.blurb}</span><span className="project-row-kind">{project.kind === "Studio" ? "Website" : project.kind}</span><ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
  </Container></section>;
}
