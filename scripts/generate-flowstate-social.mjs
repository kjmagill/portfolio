// Rebuild the studio's share graphics from the site's local fonts and mark.
import fs from 'node:fs';
import sharp from 'sharp';
import fontkit from 'next/dist/compiled/@next/font/dist/fontkit/index.js';
const loadFont = fontkit.default;
const font = loadFont(fs.readFileSync('src/app/fonts/geist-latin.woff2'));
const mono = loadFont(fs.readFileSync('src/app/fonts/geist-mono-latin.woff2'));
const curve = fs.readFileSync('public/flowstate/mark.svg', 'utf8').match(/<path d="([^"]+)"/)[1];
function text(value, x, y, size, color, tracking = 0, face = font) {
  const run = face.layout(value), scale = size / face.unitsPerEm;
  return `<g fill="${color}">${run.glyphs.map((glyph, i) => {
    const p = run.positions[i];
    const path = `<path transform="translate(${x + p.xOffset * scale} ${y - p.yOffset * scale}) scale(${scale} ${-scale})" d="${glyph.path.toSVG()}"/>`;
    x += p.xAdvance * scale + tracking;
    return path;
  }).join('')}</g>`;
}
function graphic(height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}">
  <rect width="1200" height="${height}" fill="#101310"/>
  <g fill="none" stroke="#d3ed98" opacity=".07" stroke-width="1.5"><ellipse cx="1110" cy="270" rx="215" ry="310" transform="rotate(32 1110 270)"/><ellipse cx="1110" cy="270" rx="185" ry="280" transform="rotate(32 1110 270)"/><ellipse cx="1110" cy="270" rx="155" ry="250" transform="rotate(32 1110 270)"/></g>
  <path transform="translate(60 55) scale(1.6)" d="${curve}" fill="none" stroke="#eceee3" stroke-width="2.5" stroke-linecap="round"/>
  ${text('flowstate',140,104,51,'#eceee3',-2.8)}${text('LABS',350,78,16,'#a5ad9f',3,mono)}
  ${text('SOFTWARE / PRODUCT STUDIO',690,89,22,'#a5ad9f',.5,mono)}
  ${text('Good ideas deserve',64,292,112,'#eceee3',-5)}
  ${text('great software.',64,417,112,'#d3ed98',-5)}
  <path d="M64 ${height-136}H1136" stroke="#505b45"/>
  ${text('Independent by design.',64,height-83,30,'#eceee3',-.4)}
  ${text('Led by KJ Magill',64,height-42,26,'#a5ad9f')}
  ${text('flowstatelabs.kjmagill.com',770,height-43,27,'#eceee3',-.3)}
  </svg>`;
}
(async () => {
  for (const [name,height] of [['og',630],['social',600]]) {
    const svg = Buffer.from(graphic(height));
    await sharp(svg).jpeg({quality:95,mozjpeg:true}).toFile(`public/flowstate/${name}-flowstate-v3.jpg`);
    if (name === 'og') await sharp(svg).resize(2400,1260).png().toFile('public/flowstate/preview-flowstate-2400.png');
  }
})().catch(e=>{console.error(e.message);process.exitCode=1;});
