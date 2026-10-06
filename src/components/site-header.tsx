"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { links } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = [{ href: links.work, label: "Work" }, { href: links.about, label: "About" }, { href: "/#expertise", label: "Expertise" }];
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand" aria-label="KJ Magill: home"><Image src="/images/kj-logo.png" alt="KJ" width={44} height={45} priority /></Link>
    <nav className="desktop-nav" aria-label="Primary">{items.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
    <Link className="header-contact" href={links.contact} aria-current={pathname === "/contact" ? "page" : undefined}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation"><Menu /></Button></SheetTrigger><SheetContent className="bg-background"><SheetHeader><SheetTitle>Explore</SheetTitle><SheetDescription>Work, background, and ways to connect.</SheetDescription></SheetHeader><nav className="mobile-nav" aria-label="Mobile">{[...items, { href: links.contact, label: "Contact" }].map(item => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav></SheetContent></Sheet>
  </div></header>;
}
