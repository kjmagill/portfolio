"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetClose, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { links } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = [{ href: links.work, label: "Work" }, { href: links.about, label: "About" }, { href: "/#expertise", label: "Expertise" }];
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand" aria-label="KJ Magill: home"><Image src="/images/kj-logo.png" alt="KJ" width={44} height={45} priority /></Link>
    <nav className="desktop-nav" aria-label="Primary">{items.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
    <Link className="header-contact" href={links.contact} aria-current={pathname === "/contact" ? "page" : undefined}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
      <SheetContent className="navigation-panel" showCloseButton={false}>
        <div className="navigation-top">
          <Link href="/" aria-label="KJ Magill: home" onClick={() => setOpen(false)}><Image src="/images/kj-logo.png" alt="KJ" width={36} height={37} /></Link>
          <SheetClose className="navigation-close" aria-label="Close navigation"><span>Close</span><X size={20} aria-hidden="true" /></SheetClose>
        </div>
        <div className="navigation-body">
          <SheetTitle className="navigation-label">Around the site</SheetTitle>
          <SheetDescription className="sr-only">Explore my work, background, and expertise, or start a conversation.</SheetDescription>
          <nav className="mobile-nav" aria-label="Mobile">
            {items.map((item, index) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <span className="navigation-number" aria-hidden="true">0{index + 1}</span><span>{item.label}</span><ArrowRight size={22} aria-hidden="true" />
            </Link>)}
          </nav>
          <div className="navigation-contact">
            <p>Have something in mind?</p>
            <Link href={links.contact} className="navigation-cta" onClick={() => setOpen(false)} aria-current={pathname === "/contact" ? "page" : undefined}>Let’s talk <ArrowUpRight size={28} aria-hidden="true" /></Link>
            <span>A project, a role, or a conversation.</span>
          </div>
        </div>
        <div className="navigation-footer">
          <p>KJ Magill<span>Developer &amp; founder</span></p>
          <div><a href={links.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
        </div>
      </SheetContent>
    </Sheet>
  </div></header>;
}
