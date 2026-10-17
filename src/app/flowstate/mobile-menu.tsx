"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { FlowLogo } from "./flow-mark";
import styles from "./flowstate.module.css";

const links = [
  { href: "#practice", label: "The practice", note: "What we bring" },
  { href: "#work", label: "Selected work", note: "Ideas in the world" },
  { href: "#process", label: "Our approach", note: "Working together" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const destination = useRef<string | null>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  function navigate(href: string) {
    destination.current = href;
    setOpen(false);
  }
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger className={styles.menuTrigger} aria-label="Open navigation menu"><span>Menu</span><Menu size={20} aria-hidden="true" /></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.menuOverlay} />
      <Dialog.Content className={styles.mobileMenu} aria-describedby="studio-menu-description" onCloseAutoFocus={(event) => {
        if (!destination.current) return;
        event.preventDefault();
        document.querySelector<HTMLElement>(destination.current)?.focus({ preventScroll: true });
        destination.current = null;
      }}>
        <div className={styles.menuTop}><FlowLogo /><Dialog.Close aria-label="Close navigation menu"><X size={24} aria-hidden="true" /></Dialog.Close></div>
        <Dialog.Title className={styles.menuLabel}>Explore the studio</Dialog.Title>
        <Dialog.Description id="studio-menu-description" className={styles.srOnly}>Our practice, selected work, and ways to start a project.</Dialog.Description>
        <nav aria-label="Mobile studio navigation" className={styles.menuLinks}>
          {links.map((link, index) => <a key={link.href} href={link.href} onClick={() => navigate(link.href)}><span className={styles.menuIndex}>0{index + 1}</span><span><strong>{link.label}</strong><small>{link.note}</small></span><ArrowUpRight size={22} aria-hidden="true" /></a>)}
        </nav>
        <div className={styles.menuBottom}><p>Have something in mind?</p><a href="#connect" onClick={() => navigate("#connect")}>Let’s talk <ArrowUpRight size={22} aria-hidden="true" /></a><span>Independent software &amp; product studio</span></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
