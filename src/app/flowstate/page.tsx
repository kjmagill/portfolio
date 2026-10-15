import type { Metadata, Viewport } from "next";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { FlowField } from "./flow-field";
import styles from "./flowstate.module.css";

const url = "https://flowstatelabs.kjmagill.com";
const description = "Flowstate Labs is an independent software and product studio led by KJ Magill. Clear thinking, considered design, and hands-on engineering, from first idea to launch.";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { absolute: "Flowstate Labs | Independent software & product studio" },
  description,
  keywords: ["Flowstate Labs", "software studio", "product development", "KJ Magill", "web applications", "mobile applications"],
  alternates: { canonical: url },
  openGraph: { title: "Flowstate Labs. Find the flow. Build what’s next.", description, url, siteName: "Flowstate Labs", type: "website", images: [{ url: `${url}/flowstate/og`, width: 1200, height: 630, alt: "Flowstate Labs: Find the flow. Build what’s next." }] },
  twitter: { card: "summary_large_image", title: "Flowstate Labs", description, images: [`${url}/flowstate/og`] },
  icons: { icon: [{ url: "/flowstate/mark.svg", type: "image/svg+xml" }], apple: [{ url: "/flowstate/apple-icon.png", sizes: "180x180" }] },
  manifest: "/flowstate/site.webmanifest",
};
export const viewport: Viewport = { themeColor: "#101310", colorScheme: "dark" };

function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M24 8H22C12 8 6 14 6 22C6 28 10 32 16 32C22 32 25 27 25 22M16 32H18C28 32 34 26 34 18C34 12 30 8 24 8C18 8 15 13 15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>;
}

export default function FlowstatePage() {
  return <div className={styles.studio} id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Flowstate Labs", url, description, founder: { "@type": "Person", name: "KJ Magill", url: "https://kjmagill.com" } }) }} />
    <header className={styles.header}>
      <a href="#top" className={styles.brand} aria-label="Flowstate Labs home"><Mark /><span>flowstate<span className={styles.labs}>LABS</span></span></a>
      <nav aria-label="Studio navigation"><a href="#practice">The practice</a><a href="#work">Selected work</a><a href="#connect" className={styles.navContact}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a></nav>
    </header>
    <main id="main" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="flow-title">
        <div className={styles.heroIntro}><p className={styles.eyebrow}><span className={styles.statusDot} />Independent software &amp; product studio</p>
          <h1 id="flow-title">Find the <em>flow.</em><br />Build what’s next.</h1>
          <p className={styles.heroCopy}>Good software starts with a clear head.<br className={styles.desktopBreak} /> We turn complex ideas into thoughtful digital products, with the focus to get the details right.</p>
          <a className={styles.primaryLink} href="#connect">Bring us your idea <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <FlowField />
        <div className={styles.heroFoot}><span>Clarity in thought. Momentum in making.</span><a href="#practice">Enter the studio <ArrowDown size={15} aria-hidden="true" /></a></div>
      </section>
      <section id="practice" className={styles.practice} aria-labelledby="practice-title">
        <div className={styles.sectionMeta}><span className={styles.eyebrow}>01 / The practice</span><span>LESS NOISE. MORE INTENT.</span></div>
        <div className={styles.manifesto}><h2 id="practice-title">A clear direction.<br />A deeper kind of <em>focus.</em></h2><div><p>Flow is what happens when the right challenge meets undivided attention. That’s how we like to work.</p><p>Flowstate Labs is an independent studio led by developer and founder KJ Magill. We connect product thinking, interface design, and engineering so the idea and the execution move together.</p><a className={styles.quietLink} href="https://kjmagill.com" target="_blank" rel="noopener noreferrer">Meet the founder <ArrowUpRight size={16} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a></div></div>
        <div className={styles.services}>
          <article><span className={styles.serviceIndex}>/ 01</span><div className={styles.serviceGlyph} aria-hidden="true"><i /><i /><i /></div><h3>Find the signal.</h3><p>Give the idea a useful shape. Define the problem, question the assumptions, and decide what deserves to be built.</p><span className={styles.serviceTags}>Product direction / Prototyping</span></article>
          <article><span className={styles.serviceIndex}>/ 02</span><div className={`${styles.serviceGlyph} ${styles.glyphInterface}`} aria-hidden="true"><i /><i /><i /></div><h3>Make it feel right.</h3><p>Bring clarity to every interaction. Design interfaces that feel natural, with accessibility and purpose in the details.</p><span className={styles.serviceTags}>Interface design / Design systems</span></article>
          <article><span className={styles.serviceIndex}>/ 03</span><div className={`${styles.serviceGlyph} ${styles.glyphBuild}`} aria-hidden="true"><i /><i /><i /></div><h3>Build for what’s next.</h3><p>Turn the thinking into working software. Connect the systems, refine the experience, and leave room to grow.</p><span className={styles.serviceTags}>Web &amp; mobile / Full-stack engineering</span></article>
        </div>
      </section>
      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionMeta}><span className={styles.eyebrow}>02 / Selected experience</span><span>THINKING, MADE TANGIBLE.</span></div>
        <div className={styles.sectionHeading}><h2 id="work-title">Out of the abstract.<br /><em>Into the world.</em></h2><p>A selection from KJ’s product and engineering work. Different challenges, the same attention to what makes a product useful.</p></div>
        <div className={styles.workGrid}>
          <a className={styles.workCard} href="https://usecompbook.com" target="_blank" rel="noopener noreferrer">
            <div className={styles.compArt} aria-hidden="true"><div className={styles.artTop}><span>COMPOUND YOUR KNOWLEDGE</span><span>01</span></div><div className={styles.compWord}>compbook<span>Know the card. Know the value.</span></div><svg viewBox="0 0 600 140" fill="none"><path d="M0 130L50 112L100 118L145 85L195 96L245 61L290 75L330 40L375 55L425 22L475 36L530 8L600 0" stroke="currentColor" strokeWidth="2" /><path d="M0 140H600M0 100H600M0 60H600M0 20H600" stroke="currentColor" opacity=".12" /></svg></div>
            <div className={styles.workInfo}><div><span className={styles.eyebrow}>Market intelligence / Web app</span><h3>Compbook</h3></div><ArrowUpRight size={24} aria-hidden="true" /></div><p>A sales database and market price estimation tool for NBA digital trading cards.</p><span className={styles.srOnly}>Visit Compbook (opens in a new tab)</span>
          </a>
          <a className={styles.workCard} href="https://github.com/Contrax-co/contrax-dapp" target="_blank" rel="noopener noreferrer">
            <div className={styles.contraxArt} aria-hidden="true"><div className={styles.artTop}><span>COMPOUNDING, WITHOUT THE COMPLEXITY</span><span>02</span></div><div className={styles.contraxRings}><i /><i /><i /><i /></div><span className={styles.contraxWord}>contrax</span><span className={styles.contraxBottom}>Ethereum + Arbitrum</span></div>
            <div className={styles.workInfo}><div><span className={styles.eyebrow}>Decentralized finance / Protocol</span><h3>Contrax</h3></div><ArrowUpRight size={24} aria-hidden="true" /></div><p>Open-source tools and auto-compounding vaults that make DeFi more approachable.</p><span className={styles.srOnly}>View Contrax source on GitHub (opens in a new tab)</span>
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
      <section id="connect" className={styles.connect} aria-labelledby="connect-title"><div className={styles.connectOrb} aria-hidden="true" /><p className={styles.eyebrow}>Every good thing starts somewhere.</p><h2 id="connect-title">An idea on your mind?<br />Let’s find its <em>flow.</em></h2><p>A rough sketch, a stubborn problem, or a product ready for its next chapter. Bring it into the conversation.</p><a className={styles.primaryLink} href="https://kjmagill.com/contact">Start a conversation <ArrowUpRight size={19} aria-hidden="true" /></a><a className={styles.emailLink} href="mailto:kjmagill@protonmail.com?subject=Flowstate%20Labs%20project">Or send KJ an email <ArrowRight size={14} aria-hidden="true" /></a></section>
    </main>
    <footer className={styles.footer}><a href="#top" className={styles.brand} aria-label="Flowstate Labs, back to top"><Mark /><span>flowstate<span className={styles.labs}>LABS</span></span></a><p>Independent by design.<br /><span>New Jersey. Open to everywhere.</span></p><div><a href="https://kjmagill.com">KJ Magill <ArrowUpRight size={14} aria-hidden="true" /></a><span>© {new Date().getFullYear()} Flowstate Labs</span></div></footer>
  </div>;
}
