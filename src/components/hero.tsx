import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { links } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-topline"><p className="section-label">KJ Magill / Developer & founder</p><span className="hero-location">Cape May, New Jersey</span></div>
        <h1 id="hero-title">Custom software.<br /><span>Built to work.</span></h1>
        <div className="hero-bottom">
          <p>I build thoughtful software for real-world problems. From a business’s first website to products that work in the field and on-chain.</p>
          <div className="hero-actions"><Link className="button-primary" href={links.work}>Explore my work <ArrowDown size={17} aria-hidden="true" /></Link><Link className="text-link" href={links.contact}>Start a Project <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
        <div className="hero-footnote"><span>Independent thinking. End-to-end building.</span><span>Web / Mobile / On-chain</span></div>
      </Container>
    </section>
  );
}
