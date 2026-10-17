import fs from 'node:fs';
import sharp from 'sharp';
// Native Bezier paths are the master. Raster exports are rendered directly
// at their target dimensions, never enlarged from a low-resolution mask.
const mark=fs.readFileSync('public/flowstate/logo-mark-v6.svg','utf8');
const width=293, height=270;
const body=mark.replace(/<svg[^>]*>/,'').replace('</svg>','');
await sharp(Buffer.from(mark)).resize(4096).png().toFile('public/flowstate/logo-mark-v6.png');
const icon=`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><svg x="9" y="15" width="162" height="150" viewBox="0 0 ${width} ${height}">${body}</svg></svg>`;
fs.writeFileSync('public/flowstate/mark-v7.svg',icon);
fs.writeFileSync('public/flowstate/mark.svg',icon);
await sharp(Buffer.from(icon)).resize(48).png().toFile('public/flowstate/favicon-48-v7.png');
await sharp(Buffer.from(icon)).png().toFile('public/flowstate/apple-icon-v7.png');
fs.copyFileSync('public/flowstate/apple-icon-v7.png','public/flowstate/apple-icon.png');
const { lockup } = await import('./flowstate-lockup.mjs');
const dir='exports/flowstate-brand-v7';
fs.mkdirSync(dir, { recursive: true });
const art=lockup(18, 60, 250);
const full=`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(art.end+12)}" height="300" viewBox="0 0 ${Math.ceil(art.end+12)} 300">${art.svg}</svg>`;
fs.writeFileSync(`${dir}/flowstate-full-logo.svg`,full);
await sharp(Buffer.from(full)).resize(6000).png().toFile(`${dir}/flowstate-full-logo-transparent.png`);
await sharp(Buffer.from(full)).resize(1200).flatten({background:'#101310'}).png().toFile(`${dir}/logo-preview.png`);
fs.copyFileSync('public/flowstate/logo-mark-v6.png',`${dir}/flowstate-mark-transparent.png`);
fs.copyFileSync('public/flowstate/logo-mark-v6.svg',`${dir}/flowstate-mark.svg`);
const nav=lockup(0, 7, 27);
const navSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(nav.end)}" height="34" viewBox="0 0 ${Math.ceil(nav.end)} 34">${nav.svg}</svg>`;
fs.writeFileSync('public/flowstate/logo-lockup-v7.svg',navSvg);
console.log('Navbar width:', Math.ceil(nav.end));
