import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/links",
        destination: "https://withkoji.com/@kjmagill",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "https://medium.com/@KJcodes",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/kjmagill",
        permanent: false,
      },
      {
        source: "/facebook",
        destination: "https://www.facebook.com/kj.magill",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/kjmagill/",
        permanent: false,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/kjmagill/",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/kjmagill",
        permanent: false,
      },
      {
        source: "/angellist",
        destination: "https://angel.co/kjmagill",
        permanent: false,
      },
      {
        source: "/rickroll",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
