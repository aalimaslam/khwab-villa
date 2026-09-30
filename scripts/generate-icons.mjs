// Generates every favicon / app icon from one master design.
// Run with: npm run icons
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const OUT = new URL('../public/', import.meta.url);
const BG = '#262a1b';
const GOLD = '#b99a5f';

// Leaf mark on a 32×32 grid. `scale` shrinks it inside the canvas (maskable icons need a safe zone).
const mark = (scale = 1) => {
  const t = 16 - 16 * scale;
  return `<g transform="translate(${t} ${t}) scale(${scale})">
    <path d="M16 5c4.4 3.5 7 7.4 7 11.8A7 7 0 0 1 16 23.6a7 7 0 0 1-7-6.8C9 12.4 11.6 8.5 16 5Z" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
    <path d="M16 10v17M16 16l-3.5-2.6M16 19.6l3.5-2.6" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
};
const svg = ({ radius = 8, scale = 1 } = {}) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="${radius}" fill="${BG}"/>${mark(scale)}</svg>`);

const png = (size, opts) => sharp(svg(opts), { density: Math.max(72, (size / 32) * 72) }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// ICO container holding PNG images (supported by every browser that still asks for favicon.ico)
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

const files = {
  'favicon.svg': svg(),
  'favicon-32x32.png': await png(32),
  'apple-touch-icon.png': await png(180, { radius: 0 }), // iOS applies its own rounded mask
  'icon-192.png': await png(192),
  'icon-512.png': await png(512),
  'icon-maskable-512.png': await png(512, { radius: 0, scale: 0.72 }), // leaf kept inside the 80% safe zone
  'favicon.ico': ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size) })))),
};

for (const [name, data] of Object.entries(files)) {
  await writeFile(new URL(name, OUT), data);
  console.log(`✓ public/${name} (${(data.length / 1024).toFixed(1)} KB)`);
}
