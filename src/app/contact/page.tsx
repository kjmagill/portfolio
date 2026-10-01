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
      <main id="main" className="flex-1 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="kicker">Contact</p>
          <h1 className="font-heading mt-4 text-4xl text-sand sm:text-5xl">
            Thanks for reaching out.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Fill out the form, or{" "}
            <a href={`mailto:${site.email}`} className="prose-link">
              email me
            </a>
            . I read everything that comes through.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
