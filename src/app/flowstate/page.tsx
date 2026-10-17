import type { Metadata, Viewport } from "next";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { FlowLogo } from "./flow-mark";
import { MotionProvider } from "./motion-context";
import { FlowField } from "./flow-field";
import styles from "./flowstate.module.css";

import { flowstate, flowstateSchema } from "@/lib/flowstate";

const { url, title, description, imageAlt } = flowstate;
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { absolute: title },
  description,
  formatDetection: { telephone: false },
  applicationName: "Flowstate Labs",
  authors: [{ name: "KJ Magill", url: "https://kjmagill.com" }],
  creator: "KJ Magill",
  publisher: "Flowstate Labs",
  category: "Software development and product design",
  keywords: ["Flowstate Labs", "custom software development", "product design studio", "web application development", "mobile app development", "New Jersey software studio", "KJ Magill"],
  alternates: { canonical: `${url}/` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title, description, url: `${url}/`, siteName: "Flowstate Labs", locale: "en_US", type: "website", images: [{ url: `${url}/flowstate/og-flowstate-v7.jpg`, width: 1200, height: 630, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", creator: "@kjmagill", title, description, images: [{ url: `${url}/flowstate/social-flowstate-v7.jpg`, width: 1200, height: 600, alt: imageAlt }] },
  icons: { icon: [{ url: "/flowstate/mark-v7.svg", type: "image/svg+xml" }, { url: "/flowstate/favicon-48-v7.png", sizes: "48x48", type: "image/png" }], apple: [{ url: "/flowstate/apple-icon-v7.png", sizes: "180x180" }] },
  manifest: "/flowstate/site.webmanifest",
};
export const viewport: Viewport = { themeColor: "#101310", colorScheme: "dark" };

export default function FlowstatePage() {
  return <MotionProvider><div className={styles.studio}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(flowstateSchema) }} />
    <header id="top" tabIndex={-1} className={styles.header}>
      <a href="#top" className={styles.brand} aria-label="Flowstate Labs home"><FlowLogo /></a>
      <nav aria-label="Studio navigation"><a href="#practice">The practice</a><a href="#work">Selected work</a><a href="#connect" className={styles.navContact}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a></nav>
    </header>
    <main id="main" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="flow-title">
        <div className={styles.heroIntro}><p className={styles.eyebrow}><span className={styles.statusDot} />Independent software &amp; product studio</p>
          <h1 id="flow-title">Good ideas deserve<br /><em>great software.</em></h1>
          <p className={styles.heroCopy}>From first sketch to launch, we bring product strategy, design, and engineering together to turn your ideas into useful digital products.</p>
          <a className={styles.primaryLink} href="#connect">Bring us your idea <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <FlowField />
        <div className={styles.heroFoot}><span>Thoughtful software. Built to be useful.</span><a href="#practice">Enter the studio <ArrowDown size={15} aria-hidden="true" /></a></div>
      </section>
      <section id="practice" tabIndex={-1} className={styles.practice} aria-labelledby="practice-title">
        <div className={styles.sectionMeta}><span className={styles.eyebrow}>01 / The practice</span><span>LESS NOISE. MORE INTENT.</span></div>
        <div className={styles.manifesto}><h2 id="practice-title">A clear direction.<br />A deeper kind of <em>focus.</em></h2><div><p>Flow is what happens when the right challenge meets undivided attention. That’s how we like to work.</p><p>Flowstate Labs is an independent studio led by developer and founder KJ Magill. We connect product thinking, interface design, and engineering so the idea and the execution move together.</p><a className={styles.quietLink} href="https://kjmagill.com" target="_blank" rel="noopener noreferrer">Meet the founder <ArrowUpRight size={16} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a></div></div>
        <div className={styles.services}>
          <article><span className={styles.serviceIndex}>/ 01</span><div className={styles.serviceGlyph} aria-hidden="true"><i /><i /><i /></div><h3>Find the signal.</h3><p>Give the idea a useful shape. Define the problem, question the assumptions, and decide what deserves to be built.</p><span className={styles.serviceTags}>Product direction / Prototyping</span></article>
          <article><span className={styles.serviceIndex}>/ 02</span><div className={`${styles.serviceGlyph} ${styles.glyphInterface}`} aria-hidden="true"><i /><i /><i /></div><h3>Make it feel right.</h3><p>Bring clarity to every interaction. Design interfaces that feel natural, with accessibility and purpose in the details.</p><span className={styles.serviceTags}>Interface design / Design systems</span></article>
          <article><span className={styles.serviceIndex}>/ 03</span><div className={`${styles.serviceGlyph} ${styles.glyphBuild}`} aria-hidden="true"><i /><i /><i /></div><h3>Build for what’s next.</h3><p>Turn the thinking into working software. Connect the systems, refine the experience, and leave room to grow.</p><span className={styles.serviceTags}>Web &amp; mobile / Full-stack engineering</span></article>
        </div>
      </section>
      <section id="work" tabIndex={-1} className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionMeta}><span className={styles.eyebrow}>02 / Selected experience</span><span>THINKING, MADE TANGIBLE.</span></div>
        <div className={styles.sectionHeading}><h2 id="work-title">Out of the abstract.<br /><em>Into the world.</em></h2><p>A product and a founder-led web design business. Two perspectives on building useful digital experiences.</p></div>
        <div className={styles.workGrid}>
          <a className={styles.projectCard} href="https://usecompbook.com" target="_blank" rel="noopener noreferrer">
            <div className={styles.projectMeta}><span>Product / Market intelligence</span><span aria-hidden="true">01</span></div>
            <h3>Compbook</h3>
            <div className={styles.projectIllustration} aria-hidden="true"><svg viewBox="0 0 480 200" fill="none"><rect x="64" y="26" width="352" height="148" rx="6" /><path d="M64 58H416M84 42H110M118 42H130" /><path d="M88 146H390M88 118H390M88 90H390" opacity=".18" /><path d="M88 144L126 130L164 135L202 110L240 118L278 90L316 99L354 76L390 70" className={styles.diagramAccent} /><circle cx="390" cy="70" r="4" className={styles.diagramPoint} /></svg></div>
            <p>A sales database and market price estimation tool for NBA digital trading cards.</p>
            <div className={styles.projectAction}><span>Explore the product</span><ArrowUpRight size={20} aria-hidden="true" /></div>
            <span className={styles.srOnly}>Opens in a new tab</span>
          </a>
          <a className={styles.projectCard} href="https://www.capemaywebdesign.com" target="_blank" rel="noopener noreferrer">
            <div className={styles.projectMeta}><span>Founder-led / Web design</span><span aria-hidden="true">02</span></div>
            <h3>Cape May Web Design</h3>
            <div className={styles.projectIllustration} aria-hidden="true"><svg viewBox="0 0 480 200" fill="none"><rect x="64" y="26" width="352" height="148" rx="6" /><path d="M64 58H416M84 42H110M335 42H355M365 42H395" /><path d="M88 84H204M88 98H178M88 120H204M88 132H190" /><rect x="88" y="146" width="60" height="10" rx="2" className={styles.diagramAccent} /><rect x="244" y="76" width="150" height="80" rx="3" opacity=".35" /><circle cx="352" cy="98" r="12" className={styles.diagramAccent} /><path d="M244 138C277 114 298 155 330 132S369 124 394 139M244 148C277 124 298 165 330 142S369 134 394 149" className={styles.diagramAccent} /></svg></div>
            <p>An independent web design business creating custom websites and brand identities for local businesses.</p>
            <div className={styles.projectAction}><span>Explore the business</span><ArrowUpRight size={20} aria-hidden="true" /></div>
            <span className={styles.srOnly}>Opens in a new tab</span>
          </a>
        </div>
        <a className={styles.quietLink} href="https://kjmagill.com/#work">More work from the founder <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>
      <section className={styles.process} aria-labelledby="process-title">
        <div><p className={styles.eyebrow}>03 / Working together</p><h2 id="process-title">Stay close.<br /><em>Keep moving.</em></h2><p className={styles.processIntro}>A direct relationship with the person doing the work. Clear decisions, useful conversations, and something tangible at every stage.</p><span className={styles.processNote}>ONE CONTINUOUS CONVERSATION</span></div>
        <div className={styles.processSteps}>
          {[{ n: "01", title: "Get to the heart of it.", text: "We start with the problem, the people, and the business behind the idea. Together, we define what success looks like and choose a focused first step." }, { n: "02", title: "Make the idea tangible.", text: "Flows and prototypes bring the important decisions into view early. We test the direction together before committing to the full build." }, { n: "03", title: "Build. Refine. Release.", text: "Working software arrives in focused iterations. We make room for feedback, take care of the details, and prepare for a confident launch." }, { n: "04", title: "Follow what you learn.", text: "Launch gives us real feedback. We use it to guide improvements, document the decisions, and make the next phase easier to build." }].map((step, i) => <details key={step.n} name="flow-process" open={i === 0}><summary><span>{step.n}</span><h3>{step.title}</h3><Plus size={20} aria-hidden="true" /></summary><p>{step.text}</p></details>)}
        </div>
      </section>
      <section id="connect" tabIndex={-1} className={styles.connect} aria-labelledby="connect-title"><div className={styles.connectOrb} aria-hidden="true" /><p className={styles.eyebrow}>Every good thing starts somewhere.</p><h2 id="connect-title">Have something in mind?<br />Let’s <em>build it together.</em></h2><p>A rough sketch, a stubborn problem, or a product ready for its next chapter. Bring it into the conversation.</p><a className={styles.primaryLink} href="https://kjmagill.com/contact">Start a conversation <ArrowUpRight size={19} aria-hidden="true" /></a><a className={styles.emailLink} href="mailto:kjmagill@protonmail.com?subject=Flowstate%20Labs%20project">Or send KJ an email <ArrowRight size={14} aria-hidden="true" /></a></section>
    </main>
    <footer className={styles.footer}><a href="#top" className={styles.brand} aria-label="Flowstate Labs, back to top"><FlowLogo /></a><p>Independent by design.<br /><span>Based in New Jersey.<br />Working with clients worldwide.</span></p><div><a href="https://kjmagill.com">KJ Magill <ArrowUpRight size={14} aria-hidden="true" /></a><span>© {new Date().getFullYear()} Flowstate Labs</span></div></footer>
  </div></MotionProvider>;
}
