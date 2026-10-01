import { About } from "@/components/about";
import { Cta } from "@/components/cta";
import { Hero } from "@/components/hero";
import { Practice } from "@/components/practice";
import { SiteFooter } from "@/components/site-footer";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <About />
        <Work />
        <Practice />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
