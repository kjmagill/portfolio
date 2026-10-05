import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <p className="kicker">404</p>
        <h1 className="font-heading mt-4 text-4xl text-sand sm:text-5xl">
          Nothing here. Yet.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The link may be old. Head home, or jump straight to selected work.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="h-11 rounded-full px-6">
            <Link href={links.home}>Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-copper/40 bg-transparent px-6 text-sand hover:bg-copper/10 hover:text-sand"
          >
            <Link href={links.work}>Selected work</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
