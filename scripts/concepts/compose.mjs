/**
 * Konsept sayfalarının ekran görüntülerinden vaka görselleri üretir (sunum panosu düzeni).
 * Girdi: screenshots/concepts/<ad>-d.png, <ad>-dfull.png, <ad>-mfull.png
 * Çıktı: src/content/work/assets/<ad>-cover.webp, <ad>-detail.webp, <ad>-mobile.webp (2000x1250)
 * Ekran görüntülerini almak ve bu betiği çalıştırmak için adımlar CLAUDE.md içinde.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 2000;
const H = 1250;
const SRC = 'screenshots/concepts';
const OUT = 'src/content/work/assets';

const concepts = {
  kiyi: { cover: '#3f4a36', detail: '#e4e3da', mobile: '#c9cdbd', detailCrop: { top: 860, height: 975 }, phoneX: 1480 },
  tane: { cover: '#d9922e', detail: '#1f3a2e', mobile: '#e2c9a4', detailCrop: { top: 820, height: 700 }, phoneX: 1480 },
  denge: { cover: '#0f766e', detail: '#d8efec', mobile: '#10201d', detailCrop: { top: 0, height: 760, left: 240, width: 1200 }, phoneX: 840 },
};

const roundMask = (w, h, r) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);

async function rounded(input, width, radius) {
  const img = sharp(input).resize({ width });
  const { data, info } = await img.png().toBuffer({ resolveWithObject: true });
  const out = await sharp(data)
    .composite([{ input: roundMask(info.width, info.height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { buf: out, w: info.width, h: info.height };
}

function shadow(w, h, r, blur = 26, opacity = 0.32) {
  const pad = blur * 3;
  const svg = `<svg width="${w + pad * 2}" height="${h + pad * 2}"><defs><filter id="b"><feGaussianBlur stdDeviation="${blur}"/></filter></defs><rect x="${pad}" y="${pad + blur * 0.6}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,${opacity})" filter="url(#b)"/></svg>`;
  return { buf: Buffer.from(svg), pad };
}

async function phone(input, top, screenWidth) {
  const crop = await sharp(input).extract({ left: 0, top, width: 390, height: 844 }).png().toBuffer();
  const screen = await rounded(crop, screenWidth, Math.round(screenWidth * 0.1));
  const bezel = Math.round(screenWidth * 0.035);
  const w = screen.w + bezel * 2;
  const h = screen.h + bezel * 2;
  const body = Buffer.from(
    `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${Math.round(screenWidth * 0.1) + bezel}" fill="#0b0c0e"/><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${Math.round(screenWidth * 0.1) + bezel - 1}" fill="none" stroke="#2a2d32" stroke-width="2"/></svg>`,
  );
  const buf = await sharp(body).composite([{ input: screen.buf, left: bezel, top: bezel }]).png().toBuffer();
  return { buf, w, h };
}

function canvas(color) {
  return sharp({ create: { width: W, height: H, channels: 4, background: color } });
}

async function place(layers) {
  // layers: [{buf, left, top, shadow?: {w,h,r}}]
  const out = [];
  for (const l of layers) {
    if (l.shadow) {
      const s = shadow(l.shadow.w, l.shadow.h, l.shadow.r);
      out.push({ input: s.buf, left: l.left - s.pad, top: l.top - s.pad });
    }
    out.push({ input: l.buf, left: l.left, top: l.top });
  }
  return out;
}

await mkdir(OUT, { recursive: true });

for (const [name, c] of Object.entries(concepts)) {
  const mfull = await sharp(`${SRC}/${name}-mfull.png`).metadata();
  const maxTop = Math.max(0, mfull.height - 844);

  // 1) Kapak: masaüstü ekran ve üstüne binen telefon.
  const desk = await rounded(`${SRC}/${name}-d.png`, 1380, 14);
  const ph = await phone(`${SRC}/${name}-mfull.png`, 0, 300);
  const deskLeft = name === 'denge' ? 170 : 150;
  const cover = canvas(c.cover).composite(
    await place([
      { buf: desk.buf, left: deskLeft, top: Math.round((H - desk.h) / 2) - 40, shadow: { w: desk.w, h: desk.h, r: 14 } },
      { buf: ph.buf, left: c.phoneX, top: H - ph.h - 110, shadow: { w: ph.w, h: ph.h, r: 40 } },
    ]),
  );
  await cover.webp({ quality: 84 }).toFile(`${OUT}/${name}-cover.webp`);

  // 2) Detay: masaüstü sayfadan bir kesit, büyük ölçekte.
  const full = await sharp(`${SRC}/${name}-dfull.png`).metadata();
  const crop = c.detailCrop;
  const cropBuf = await sharp(`${SRC}/${name}-dfull.png`)
    .extract({
      left: crop.left ?? 0,
      top: Math.min(crop.top, full.height - 10),
      width: crop.width ?? 1440,
      height: Math.min(crop.height, full.height - crop.top),
    })
    .png()
    .toBuffer();
  const detailW = 1640;
  const det = await rounded(cropBuf, detailW, 16);
  const scale = det.h > H - 160 ? (H - 160) / det.h : 1;
  const det2 = scale < 1 ? await rounded(cropBuf, Math.round(detailW * scale), 16) : det;
  await canvas(c.detail)
    .composite(await place([{ buf: det2.buf, left: Math.round((W - det2.w) / 2), top: Math.round((H - det2.h) / 2), shadow: { w: det2.w, h: det2.h, r: 16 } }]))
    .webp({ quality: 84 })
    .toFile(`${OUT}/${name}-detail.webp`);

  // 3) Mobil: üç ekran yan yana (tek ekranlık sayfalarda telefon ve masaüstü paneli).
  let layers;
  if (maxTop >= 844) {
    const tops = [0, Math.round(maxTop / 2), maxTop];
    const phones = await Promise.all(tops.map((t) => phone(`${SRC}/${name}-mfull.png`, t, 380)));
    const gap = 90;
    const total = phones.reduce((s, p) => s + p.w, 0) + gap * 2;
    let x = Math.round((W - total) / 2);
    layers = phones.map((p, i) => {
      const l = { buf: p.buf, left: x, top: Math.round((H - p.h) / 2) + (i === 1 ? -40 : 30), shadow: { w: p.w, h: p.h, r: 44 } };
      x += p.w + gap;
      return l;
    });
  } else {
    const p = await phone(`${SRC}/${name}-mfull.png`, 0, 420);
    const panel = await sharp(`${SRC}/${name}-d.png`).extract({ left: 1080, top: 0, width: 360, height: 600 }).png().toBuffer();
    const pr = await rounded(panel, 620, 18);
    layers = [
      { buf: pr.buf, left: 1080, top: Math.round((H - pr.h) / 2), shadow: { w: pr.w, h: pr.h, r: 18 } },
      { buf: p.buf, left: 380, top: Math.round((H - p.h) / 2), shadow: { w: p.w, h: p.h, r: 48 } },
    ];
  }
  await canvas(c.mobile).composite(await place(layers)).webp({ quality: 84 }).toFile(`${OUT}/${name}-mobile.webp`);

  console.log(`${name}: kapak, detay ve mobil görseller üretildi.`);
}
