# kjmagill.com

KJ Magill’s portfolio, built with Next.js App Router, React, TypeScript, and Tailwind CSS. Hosted on Vercel.

## Development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Content and branding

- `src/lib/site.ts`: identity, social links, and existing Basin/reCAPTCHA configuration.
- `src/lib/projects.ts`: project descriptions and destinations.
- `src/components/`: homepage sections and contact form.
- `src/app/globals.css`: responsive dark theme, focus states, and reduced-motion support.
- `public/images/kj-logo.png`: optimized version of the supplied transparent logo.
- `src/app/fonts/`: self-hosted Geist fonts and their license.

## Contact delivery

The form preserves Basin endpoint `https://usebasin.com/f/98f5540f74f1` and the existing reCAPTCHA site key. It uses multipart submissions with inline success/error feedback, native field validation, honeypots, and a submission timeout. reCAPTCHA loads only on the contact page. Basin remains responsible for server-side spam filtering; client-side checks are supplemental.

No new form account or environment variables are required. A live delivery check should be performed on the deployed domain, since domain restrictions and delivery settings belong to the existing Basin/reCAPTCHA accounts.

## Search and accessibility

Server-rendered content, canonical URLs, sitemap, robots metadata, Person structured data, branded sharing imagery, semantic landmarks, a skip link, visible keyboard focus, a keyboard-accessible mobile menu, and reduced-motion support are included. Security headers are configured in `next.config.ts`.
