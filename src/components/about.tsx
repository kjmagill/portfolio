import { Container } from "@/components/container";
import { links } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
export function About() {
  return <section id="about" className="section about-section"><Container><div className="about-grid">
    <div><p className="section-label">02 / A little context</p><h2>A developer’s craft.<br /><span className="muted">A founder’s mindset.</span></h2><p className="about-signature">KJ Magill <span>Based in New Jersey. Building beyond it.</span></p></div>
    <div className="about-copy"><p>I’m KJ, a full-stack developer who enjoys taking an idea all the way to something people can use.</p><p>I founded Flowstate Labs and <a href={links.capeMayWebDesign} target="_blank" rel="noopener noreferrer">Cape May Web Design</a>, and co-founded <a href={links.contrax} target="_blank" rel="noopener noreferrer">Contrax</a>, a DeFi protocol on Ethereum and Arbitrum. My work spans fintech, ecommerce, mobile apps, digital marketing, and the businesses in my own community.</p><p>I care a lot about maintainable code, intuitive design, and understanding the business behind the build. I’ve worked across remote, freelance, and founding teams, taking responsibility for both the details and the bigger picture.</p><p>Away from the keyboard: the gym, a basketball court, or somewhere I haven’t been before.</p><a className="text-link" href={links.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </div></Container></section>;
}
