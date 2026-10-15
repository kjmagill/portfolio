import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SocialLinks } from "@/components/social-links";
import { links } from "@/lib/site";
export function SiteFooter() { return <footer className="site-footer"><Container><div className="footer-inner"><Link href="/" aria-label="KJ Magill: home"><Image src="/images/kj-logo.png" alt="KJ" width={44} height={45} loading="eager" /></Link><p>© {new Date().getFullYear()} KJ Magill<span>Always building. Always learning.</span><a className="footer-studio" href={links.flowstate}>My studio: Flowstate Labs <span aria-hidden="true">↗</span></a></p><SocialLinks /><a href="#main" className="back-top">Back to top ↑</a></div></Container></footer>; }
