export const flowstate = {
  url: "https://flowstatelabs.kjmagill.com",
  title: "Flowstate Labs | Custom Software & Product Design Studio",
  description: "New Jersey software and product studio led by KJ Magill. Product strategy, interface design, and custom web and mobile development, from idea to launch.",
  imageAlt: "Flowstate Labs. Good ideas deserve great software. Independent software and product studio led by KJ Magill.",
} as const;

const { url, title, description } = flowstate;
export const flowstateSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${url}/#organization`,
      name: "Flowstate Labs", url: `${url}/`, description,
      logo: { "@type": "ImageObject", url: `${url}/flowstate/apple-icon-v6.png`, width: 180, height: 180 },
      image: `${url}/flowstate/og-flowstate-v6.jpg`,
      founder: { "@type": "Person", name: "KJ Magill", url: "https://kjmagill.com" },
      email: "kjmagill@protonmail.com",
      location: { "@type": "Place", name: "New Jersey, United States", address: { "@type": "PostalAddress", addressRegion: "NJ", addressCountry: "US" } },
      contactPoint: { "@type": "ContactPoint", contactType: "Project inquiries", email: "kjmagill@protonmail.com", url: "https://kjmagill.com/contact", availableLanguage: "English" },
    },
    {
      "@type": "WebSite", "@id": `${url}/#website`, name: "Flowstate Labs", url: `${url}/`,
      description, inLanguage: "en-US", publisher: { "@id": `${url}/#organization` },
    },
    {
      "@type": "WebPage", "@id": `${url}/#webpage`, url: `${url}/`, name: title, description,
      isPartOf: { "@id": `${url}/#website` }, about: { "@id": `${url}/#organization` },
      inLanguage: "en-US", primaryImageOfPage: { "@type": "ImageObject", url: `${url}/flowstate/og-flowstate-v6.jpg`, width: 1200, height: 630 },
      mainEntity: { "@id": `${url}/#services` },
    },
    {
      "@type": "Service", "@id": `${url}/#services`,
      name: "Software development and product design", url: `${url}/#practice`,
      serviceType: ["Product strategy and prototyping", "Interface design and design systems", "Web and mobile application development"],
      description: "Product direction, accessible interface design, and full-stack engineering for web and mobile products.",
      provider: { "@id": `${url}/#organization` },
    },
  ],
};
