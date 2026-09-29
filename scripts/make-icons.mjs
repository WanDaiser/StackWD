/**
 * Simgeleri üretir: favicon.ico (32px), apple-touch-icon.png (180px), icon-192.png, icon-512.png.
 * Kaynak: koyu zeminli, markanın katman işareti. Çalıştırmak için: npm run assets
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const mark = (size, pad) => {
  const inner = size - pad * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#0d0e10"/>
  <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 28 28">
    <path d="M14 15.5 25 21l-11 5.5L3 21z" fill="none" stroke="#edeae2" stroke-width="1.6" stroke-linejoin="round" opacity=".5"/>
    <path d="M14 9.5 25 15l-11 5.5L3 15z" fill="none" stroke="#edeae2" stroke-width="1.6" stroke-linejoin="round" opacity=".75"/>
    <path d="M14 3.5 25 9l-11 5.5L3 9z" fill="#8c99ff" stroke="#8c99ff" stroke-width="1.6" stroke-linejoin="round"/>
  </svg>
</svg>`);
};

const png = (size, pad) => sharp(mark(size, pad)).png().toBuffer();

await writeFile('public/apple-touch-icon.png', await png(180, 30));
await writeFile('public/icon-192.png', await png(192, 32));
await writeFile('public/icon-512.png', await png(512, 84));

// ICO: tek bir 32px PNG'yi saran en küçük geçerli ICO başlığı.
const ico32 = await png(32, 3);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // ayrılmış
header.writeUInt16LE(1, 2); // tür: simge
header.writeUInt16LE(1, 4); // görsel sayısı
header.writeUInt8(32, 6); // genişlik
header.writeUInt8(32, 7); // yükseklik
header.writeUInt8(0, 8); // palet
header.writeUInt8(0, 9); // ayrılmış
header.writeUInt16LE(1, 10); // renk düzlemi
header.writeUInt16LE(32, 12); // bit derinliği
header.writeUInt32LE(ico32.length, 14); // veri boyutu
header.writeUInt32LE(22, 18); // veri başlangıcı
await writeFile('public/favicon.ico', Buffer.concat([header, ico32]));

console.log('Simgeler üretildi.');
