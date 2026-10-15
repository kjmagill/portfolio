export const flowstate = {
  url: "https://flowstatelabs.kjmagill.com",
  title: "Flowstate Labs | Custom Software & Product Design Studio",
  description: "Independent software and product studio led by KJ Magill. Product strategy, interface design, and custom web and mobile development, from first idea to launch.",
  imageAlt: "Flowstate Labs. Find the flow. Build what’s next. Independent software and product studio led by KJ Magill.",
} as const;

const { url, title, description } = flowstate;
export const flowstateSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${url}/#organization`,
      name: "Flowstate Labs", url: `${url}/`, description,
      logo: { "@type": "ImageObject", url: `${url}/flowstate/apple-icon.png`, width: 180, height: 180 },
      image: `${url}/flowstate/og-flowstate-v2.jpg`,
      founder: { "@type": "Person", name: "KJ Magill", url: "https://kjmagill.com" },
      email: "kjmagill@protonmail.com",
    },
    {
      "@type": "WebSite", "@id": `${url}/#website`, name: "Flowstate Labs", url: `${url}/`,
      description, inLanguage: "en-US", publisher: { "@id": `${url}/#organization` },
    },
    {
      "@type": "WebPage", "@id": `${url}/#webpage`, url: `${url}/`, name: title, description,
      isPartOf: { "@id": `${url}/#website` }, about: { "@id": `${url}/#organization` },
      inLanguage: "en-US", primaryImageOfPage: { "@type": "ImageObject", url: `${url}/flowstate/og-flowstate-v2.jpg`, width: 1200, height: 630 },
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
