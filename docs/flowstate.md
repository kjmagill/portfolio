# Flowstate Labs

The studio lives at `https://flowstatelabs.kjmagill.com`, with a directly accessible preview at `/flowstate` on the portfolio deployment.

## Hosting

The existing Vercel project `kj-portfolio` serves both sites. Host-specific `beforeFiles` rewrites in `next.config.ts` map the studio homepage, favicon, robots file, and sitemap. The personal homepage keeps its original route.

DNS is managed at Namecheap. The required record returned by Vercel on October 15, 2026:

- Type: CNAME
- Host: `flowstatelabs`
- Value: `c953818b34fe72d5.vercel-dns-017.com`
- TTL: Automatic

The domain has been added to Vercel. Confirm DNS propagation and HTTPS after saving the record. Do not change the apex, nameservers, or email records.

## Content and design

- `src/app/flowstate/page.tsx`: copy, metadata, structured data, and page sections.
- `src/app/flowstate/flowstate.module.css`: isolated studio styling and responsive rules.
- `src/app/flowstate/flow-field.tsx`: procedural SVG artwork with a pause control.
- `/flowstate/og`: static social preview generated with Next.js ImageResponse.
- `public/flowstate`: studio icon, Apple touch icon, and manifest.

The artwork respects reduced motion and is static at tablet widths where its controls are hidden. Process steps use native accessible disclosure elements. No new animation library, third-party font request, or tracking script is required.

Contact calls to action link to the existing portfolio contact page and Basin integration. The selected work is explicitly attributed to KJ's experience, not presented as unverified studio client work.
