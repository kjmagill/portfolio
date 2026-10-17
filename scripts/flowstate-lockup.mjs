import fs from 'node:fs';
import fontkit from 'next/dist/compiled/@next/font/dist/fontkit/index.js';
const font = fontkit.default(fs.readFileSync('src/app/fonts/geist-latin.woff2'));
const mono = fontkit.default(fs.readFileSync('src/app/fonts/geist-mono-latin.woff2'));
const mark = `data:image/png;base64,${fs.readFileSync('public/flowstate/logo-mark-v4.png').toString('base64')}`;
export function lettering(value, x, y, size, color, tracking = 0, face = font) {
  const run = face.layout(value), scale = size / face.unitsPerEm;
  let paths = '';
  for (let i = 0; i < run.glyphs.length; i++) {
    const p = run.positions[i];
    paths += `<path transform="translate(${x + p.xOffset * scale} ${y - p.yOffset * scale}) scale(${scale} ${-scale})" d="${run.glyphs[i].path.toSVG()}"/>`;
    x += p.xAdvance * scale + tracking;
  }
  return { svg: `<g fill="${color}">${paths}</g>`, end: x };
}
export function lockup(x, y, size) {
  const height = size * .83, width = height * 1024 / 944;
  const word = lettering('flowstate', x + width + size * .32, y + size * .73, size, '#eceee3', -size * .047);
  const labelSize = Math.max(8, size * .255);
  const label = lettering('LABS', word.end + size * .34, y + size * .365 + labelSize * .35, labelSize, '#a5ad9f', size * .065, mono);
  return { svg: `<image href="${mark}" x="${x}" y="${y - size * .065}" width="${width}" height="${height}"/>${word.svg}${label.svg}`, end: label.end };
}
