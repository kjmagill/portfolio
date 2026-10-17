import fs from 'node:fs';
import sharp from 'sharp';
// Native Bezier paths are the master. Raster exports are rendered directly
// at their target dimensions, never enlarged from a low-resolution mask.
const mark=fs.readFileSync('public/flowstate/logo-mark-v6.svg','utf8');
const width=293, height=270;
const body=mark.replace(/<svg[^>]*>/,'').replace('</svg>','');
await sharp(Buffer.from(mark)).resize(4096).png().toFile('public/flowstate/logo-mark-v6.png');
const icon=`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="36" fill="#101310"/><svg x="24" y="29" width="132" height="122" viewBox="0 0 ${width} ${height}">${body}</svg></svg>`;
fs.writeFileSync('public/flowstate/mark-v6.svg',icon);
fs.writeFileSync('public/flowstate/mark.svg',icon);
await sharp(Buffer.from(icon)).png().toFile('public/flowstate/apple-icon-v6.png');
fs.copyFileSync('public/flowstate/apple-icon-v6.png','public/flowstate/apple-icon.png');
const { lockup } = await import('./flowstate-lockup.mjs');
const dir='exports/flowstate-brand-v6';
fs.mkdirSync(dir, { recursive: true });
const art=lockup(12, 25, 250);
const full=`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(art.end+12)}" height="240" viewBox="0 0 ${Math.ceil(art.end+12)} 240">${art.svg}</svg>`;
fs.writeFileSync(`${dir}/flowstate-full-logo.svg`,full);
await sharp(Buffer.from(full)).resize(6000).png().toFile(`${dir}/flowstate-full-logo-transparent.png`);
await sharp(Buffer.from(full)).resize(1200).flatten({background:'#101310'}).png().toFile(`${dir}/logo-preview.png`);
fs.copyFileSync('public/flowstate/logo-mark-v6.png',`${dir}/flowstate-mark-transparent.png`);
fs.copyFileSync('public/flowstate/logo-mark-v6.svg',`${dir}/flowstate-mark.svg`);
const nav=lockup(0, 2, 27);
const navSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(nav.end)}" height="27" viewBox="0 0 ${Math.ceil(nav.end)} 27">${nav.svg}</svg>`;
fs.writeFileSync('public/flowstate/logo-lockup-v6.svg',navSvg);
console.log('Navbar width:', Math.ceil(nav.end));
