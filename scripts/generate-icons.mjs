// Generates the PWA app icons (solid background + a hand-drawn "M2" bitmap
// glyph) as raw PNGs, with no image-library dependency — just zlib, which
// ships with Node. Run with: node scripts/generate-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const BG = [0x2f, 0x5f, 0xda]; // matches --accent in src/styles/index.css
const FG = [0xff, 0xff, 0xff];

// 5x7 bitmap glyphs, 1 = foreground pixel.
const GLYPHS = {
  M: [
    "10001",
    "11011",
    "10101",
    "10101",
    "10001",
    "10001",
    "10001",
  ],
  2: [
    "01110",
    "10001",
    "00001",
    "00010",
    "00100",
    "01000",
    "11111",
  ],
};

function buildGlyphGrid(text, gap = 1) {
  const glyphs = [...text].map((ch) => GLYPHS[ch]);
  const height = 7;
  const width = glyphs.reduce((w, g) => w + g[0].length, 0) + gap * (glyphs.length - 1);
  const grid = Array.from({ length: height }, () => new Array(width).fill(0));
  let x = 0;
  for (const glyph of glyphs) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < glyph[row].length; col++) {
        grid[row][x + col] = glyph[row][col] === "1" ? 1 : 0;
      }
    }
    x += glyph[0].length + gap;
  }
  return grid;
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function renderIcon(size, text) {
  const grid = buildGlyphGrid(text);
  const glyphRows = grid.length;
  const glyphCols = grid[0].length;
  const scale = Math.floor((size * 0.6) / glyphCols);
  const glyphWidthPx = glyphCols * scale;
  const glyphHeightPx = glyphRows * scale;
  const offsetX = Math.floor((size - glyphWidthPx) / 2);
  const offsetY = Math.floor((size - glyphHeightPx) / 2);

  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4);
    raw[rowStart] = 0; // filter type: none
    for (let x = 0; x < size; x++) {
      let color = BG;
      const gx = x - offsetX;
      const gy = y - offsetY;
      if (gx >= 0 && gx < glyphWidthPx && gy >= 0 && gy < glyphHeightPx) {
        const col = Math.floor(gx / scale);
        const row = Math.floor(gy / scale);
        if (grid[row][col]) color = FG;
      }
      const px = rowStart + 1 + x * 4;
      raw[px] = color[0];
      raw[px + 1] = color[1];
      raw[px + 2] = color[2];
      raw[px + 3] = 255;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = deflateSync(raw);

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  const png = renderIcon(size, "M2");
  const path = new URL(`../public/icon-${size}.png`, import.meta.url);
  writeFileSync(path, png);
  console.log(`wrote ${path.pathname} (${png.length} bytes)`);
}
