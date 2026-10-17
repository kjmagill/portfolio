import fs from 'node:fs';
import sharp from 'sharp';
import fontkit from 'next/dist/compiled/@next/font/dist/fontkit/index.js';
const src=fs.readFileSync('public/flowstate/logo-mark-source.png');
const {width,height}=await sharp(src).metadata();
const data=`data:image/png;base64,${src.toString('base64')}`;
// The supplied alpha is the authoritative silhouette; apply the site's palette
// in SVG rather than changing any of the designer's curves or proportions.
const body=`<defs><mask id="silhouette" mask-type="alpha"><image href="${data}" width="${width}" height="${height}"/></mask><linearGradient id="palette" x1="0%" y1="0%" x2="0%" y2="100%"><stop stop-color="#eceee3"/><stop offset=".43" stop-color="#d3ed98"/><stop offset="1" stop-color="#91aa79"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#palette)" mask="url(#silhouette)"/>`;
const mark=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
fs.writeFileSync('public/flowstate/logo-mark-v4.svg',mark);
await sharp(Buffer.from(mark)).resize(1024).png().toFile('public/flowstate/logo-mark-v4.png');
const icon=`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="36" fill="#101310"/><svg x="24" y="29" width="132" height="122" viewBox="0 0 ${width} ${height}">${body}</svg></svg>`;
fs.writeFileSync('public/flowstate/mark-v4.svg',icon);
fs.writeFileSync('public/flowstate/mark.svg',icon);
await sharp(Buffer.from(icon)).png().toFile('public/flowstate/apple-icon-v4.png');
fs.copyFileSync('public/flowstate/apple-icon-v4.png','public/flowstate/apple-icon.png');
const font=fontkit.default(fs.readFileSync('src/app/fonts/geist-latin.woff2'));
const mono=fontkit.default(fs.readFileSync('src/app/fonts/geist-mono-latin.woff2'));
function text(value,x,y,size,color,tracking,face){const run=face.layout(value),scale=size/face.unitsPerEm;let paths='';for(let i=0;i<run.glyphs.length;i++){const p=run.positions[i];paths+=`<path transform="translate(${x+p.xOffset*scale} ${y-p.yOffset*scale}) scale(${scale} ${-scale})" d="${run.glyphs[i].path.toSVG()}"/>`;x+=p.xAdvance*scale+tracking;}return {svg:`<g fill="${color}">${paths}</g>`,end:x};}
const word=text('flowstate',350,270,250,'#eceee3',-13.89,font);
const labs=text('LABS',word.end+74,121,83.33,'#a5ad9f',18.52,mono);
const full=`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(labs.end+35)}" height="360" viewBox="0 0 ${Math.ceil(labs.end+35)} 360"><svg x="25" y="45" width="270" height="270" viewBox="0 0 ${width} ${height}">${body}</svg>${word.svg}${labs.svg}</svg>`;
const dir='exports/flowstate-brand-v4';
fs.writeFileSync(`${dir}/flowstate-full-logo.svg`,full);
await sharp(Buffer.from(full)).resize(3600).png().toFile(`${dir}/flowstate-full-logo-transparent.png`);
await sharp(Buffer.from(full)).resize(1200).flatten({background:'#101310'}).png().toFile(`${dir}/logo-preview.png`);
fs.copyFileSync('public/flowstate/logo-mark-v4.png',`${dir}/flowstate-mark-transparent.png`);
