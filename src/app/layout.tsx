import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { site, links } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "KJ Magill",
    "full-stack developer",
    "founder",
    "New Jersey",
    "Cape May",
    "React",
    "TypeScript",
    "DeFi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/images/og-custom-software.jpg",
        width: 1200,
        height: 630,
        alt: "KJ Magill: Full-stack developer and founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kjmagill",
    title: site.title,
    description: site.description,
    images: [{ url: "/images/social-custom-software.jpg", width: 1200, height: 600, alt: "KJ Magill: Custom software. Built to work." }],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-48.png?v=white-2", sizes: "48x48", type: "image/png" },
      { url: "/icons/favicon-32.png?v=white-2", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png?v=white-2", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=white-2", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest?v=white-2",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-stack developer and founder",
  url: site.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  sameAs: [links.github, links.linkedin, links.x],
  knowsAbout: ["Software development", "Web development", "Mobile applications", "Decentralized finance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sand focus:px-3 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
