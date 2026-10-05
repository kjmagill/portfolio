import { About } from "@/components/about";
import { Cta } from "@/components/cta";
import { Hero } from "@/components/hero";
import { Practice } from "@/components/practice";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Work } from "@/components/work";
export default function Home() { return <><SiteHeader /><main id="main" tabIndex={-1}><Hero /><Work /><About /><Practice /><Cta /></main><SiteFooter /></>; }
