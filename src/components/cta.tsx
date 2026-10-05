import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
export function Cta() { return <section className="cta-section"><Container><p className="section-label">Have something in mind?</p><Link href="/contact" className="cta-link">Let’s build<br />something good.<ArrowUpRight aria-hidden="true" /></Link><div className="cta-bottom"><p>A project, a role, or a conversation.<br />I’m open to the right next thing.</p><Link href="/contact" className="button-primary">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></Link></div></Container></section>; }
