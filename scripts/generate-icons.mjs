import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Preserve the supplied KJ silhouette. Supersampling keeps its dark keyline
// smooth and legible against both light and dark browser chrome.
const source = 'public/images/kj-logo.png';
async function icon(size, opaque = false) {
  const scale = 4;
  const edge = size * scale;
  const mark = Math.round(edge * 0.82);
  const logo = await sharp(source).resize(mark, mark, { fit: 'contain' }).toBuffer();
  const { data } = await sharp({ create: { width: edge, height: edge, channels: 4, background: '#00000000' } })
    .composite([{ input: logo, gravity: 'center' }]).raw().toBuffer({ resolveWithObject: true });
  const outlined = Buffer.alloc(data.length);
  const radius = Math.max(3, Math.round(edge * 0.015));
  const alpha = await sharp(data, { raw: { width: edge, height: edge, channels: 4 } })
    .extractChannel(3).erode(radius).raw().toBuffer();
  for (let p = 0; p < data.length; p += 4) {
    const a = data[p + 3] / 255;
    outlined[p] = outlined[p + 1] = outlined[p + 2] = Math.round(66 + 189 * a);
    outlined[p + 3] = alpha[p / 4];
  }
  let image = sharp(outlined, { raw: { width: edge, height: edge, channels: 4 } }).resize(size, size);
  if (opaque) image = image.flatten({ background: '#f4f4f3' });
  return image.png().toBuffer();
}
const sizes = [16, 32, 48, 64, 180, 192, 512];
const buffers = new Map();
for (const size of sizes) {
  const buffer = await icon(size, size === 180);
  buffers.set(size, buffer);
  const path = size === 180 ? 'public/apple-touch-icon.png' : size === 64 ? 'public/icon.png' : `public/icons/${size >= 192 ? 'icon' : 'favicon'}-${size}.png`;
  await writeFile(path, buffer);
}
const icoSizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
icoSizes.forEach((size, index) => {
  const p = 6 + index * 16, png = buffers.get(size);
  header[p] = header[p + 1] = size;
  header.writeUInt16LE(1, p + 4);
  header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(png.length, p + 8);
  header.writeUInt32LE(offset, p + 12);
  offset += png.length;
});
const ico = Buffer.concat([header, ...icoSizes.map(size => buffers.get(size))]);
await writeFile('public/favicon.ico', ico);
await writeFile('src/app/favicon.ico', ico);
console.log('Generated all PNG icons and multi-resolution ICO files.');
