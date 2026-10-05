import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KJ Magill about a project, collaboration, or role.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="contact-page" tabIndex={-1}>
        <Container className="contact-layout">
          <section className="contact-intro" aria-labelledby="contact-title">
            <p className="section-label">Contact</p>
            <h1 id="contact-title">Let’s make something useful.</h1>
            <p>
              Tell me what you’re working on, where you’re stuck, or what kind
              of role you have in mind. I read every message.
            </p>
            <a className="text-link" href={`mailto:${site.email}`}>
              Or email me directly <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section className="contact-panel" aria-label="Send a message">
            <ContactForm />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
