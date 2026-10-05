# Social preview assets

Generated with the built-in image-generation tool using `public/images/kj-logo.png` as the reference.

Final prompt: Create a mobile-first landscape social link preview for KJ Magill on a near-black (#0a0a0a) background. Use the supplied white KJ logo faithfully, with only two large, left-aligned text lines: “KJ Magill” and “Developer & founder”. White name, light-gray role, generous safe margins. Both lines must remain legible at a 320px display width. No fine print, URL, footer, category labels, photography, gradients, glow, or additional text.

Exports:
- `public/images/og-2026.jpg`: 1200 × 630 Open Graph image.
- `public/images/social-2026.jpg`: 1200 × 600 large social card.
- `public/images/og.webp`: replacement for the existing legacy URL.

Favicon variants are generated deterministically from the supplied logo with `node scripts/generate-icons.mjs`. They use a white mark and charcoal keyline. The Apple touch icon has an opaque light background; browser and manifest PNGs have transparency. Both ICO files contain 16px, 32px, and 48px representations.

## Current revision

Restore the first card composition with the headline “Custom software. Built to work.” Increase all supporting typography approximately 50%, retaining the KJ logo, category line, divider, name, role, and domain. Generated using the built-in image-generation tool from the original card reference. Current metadata points to `og-custom-software.jpg` (1200×630) and `social-custom-software.jpg` (1200×600); earlier asset URLs are also updated for compatibility.
