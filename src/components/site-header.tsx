"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links, nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-40 w-full",
        overlay
          ? "absolute top-0 left-0"
          : "sticky top-0 border-b border-border/70 bg-background/85 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <Link href={links.home} className="group flex items-center gap-3">
          <Image
            src="/images/sigil.webp"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-sm object-cover ring-1 ring-copper/25"
          />
          <span className="font-heading text-lg tracking-[0.18em] text-sand uppercase">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-sand/70 transition-colors hover:text-sand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-9 rounded-full px-4 text-sm md:inline-flex"
          >
            <Link href={links.contact}>Get in touch</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(20rem,88vw)] border-border bg-navy text-foreground"
            >
              <SheetHeader>
                <SheetTitle className="font-heading text-left tracking-[0.16em] text-sand uppercase">
                  {site.name}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-3 text-lg text-sand/90 hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
