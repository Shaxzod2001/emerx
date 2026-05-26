/**
 * Generates PWA icons for EmerX (no external deps — pure Node.js)
 * Produces: shield shape on dark background with green accent
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ── CRC32 ──────────────────────────────────────────────────────────────
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[i] = c;
}
function crc32(buf) {
  let crc = 0xffffffff;
  for (const b of buf) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// ── PNG chunk builder ──────────────────────────────────────────────────
function pngChunk(type, data) {
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.allocUnsafe(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

// ── Draw helpers ───────────────────────────────────────────────────────
function rgba(r, g, b, a) { return [r, g, b, a]; }

// Draw the icon pixel-buffer for the given size
function renderIcon(size) {
  const px = new Uint8Array(size * size * 4); // RGBA

  const cx = size / 2;
  const cy = size / 2;
  const pad = size * 0.08;

  // ── Background gradient (dark navy) ──
  const bg1 = [8, 12, 24, 255];   // #080c18
  const bg2 = [14, 20, 40, 255];  // slightly lighter center
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = Math.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2);
      const f = Math.min(t, 1);
      const r = Math.round(bg1[0] * f + bg2[0] * (1 - f));
      const g = Math.round(bg1[1] * f + bg2[1] * (1 - f));
      const b = Math.round(bg1[2] * f + bg2[2] * (1 - f));
      const i = (y * size + x) * 4;
      px[i] = r; px[i+1] = g; px[i+2] = b; px[i+3] = 255;
    }
  }

  // ── Shield shape ──
  // Shield: top rounded arch → V at bottom
  const sw = size * 0.62;  // shield width
  const sh = size * 0.72;  // shield height
  const sx = cx - sw / 2;
  const sy = cy - sh * 0.46;

  // Shield border color: bright green #00ff88
  const green  = [0, 255, 136];
  const green2 = [0, 200, 100];
  const shieldFill = [10, 16, 34];  // slightly lighter dark

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x - sx) / sw;  // 0..1 inside shield bounding box
      const ny = (y - sy) / sh;

      if (nx < 0 || nx > 1 || ny < 0 || ny > 1) continue;

      // Shield outline path (parametric):
      // Top corners rounded, sides straight, bottom tapers to point
      const inShield = isInShield(nx, ny);
      if (inShield === 0) continue;

      const i = (y * size + x) * 4;
      if (inShield === 2) {
        // border pixels
        const blend = 0.85;
        px[i]   = Math.round(px[i]   * (1 - blend) + green[0] * blend);
        px[i+1] = Math.round(px[i+1] * (1 - blend) + green[1] * blend);
        px[i+2] = Math.round(px[i+2] * (1 - blend) + green[2] * blend);
      } else {
        // interior — slightly lighter
        px[i]   = shieldFill[0];
        px[i+1] = shieldFill[1];
        px[i+2] = shieldFill[2];
      }
    }
  }

  // ── "X" letter centered (EmerX brand) ──
  const letterSize = sw * 0.46;
  const lx = cx - letterSize / 2;
  const ly = cy - letterSize * 0.42;
  const thick = Math.max(2, size * 0.055);

  drawX(px, size, lx, ly, letterSize, letterSize * 0.92, thick, green, green2);

  return px;
}

// Returns: 0=outside, 1=inside, 2=border
function isInShield(nx, ny) {
  const border = 0.07;

  // Shield shape math:
  // - Top arch: quarter-circle corners (radius ~0.22)
  // - Sides: straight vertical
  // - Bottom: tapers to point at ny=1, nx=0.5

  // Bottom taper: at ny, the width narrows
  // from full width at ny=0.6 → point at ny=1
  let leftEdge = 0;
  let rightEdge = 1;

  if (ny > 0.62) {
    const t = (ny - 0.62) / 0.38; // 0..1
    const narrow = t * 0.5;
    leftEdge  = narrow;
    rightEdge = 1 - narrow;
  }

  // Top arch: rounded top corners (radius 0.22 relative)
  const r = 0.22;
  if (ny < r) {
    // left corner circle
    if (nx < r) {
      const dx = nx - r, dy = ny - r;
      if (dx * dx + dy * dy > r * r) return 0;
    }
    // right corner circle
    if (nx > 1 - r) {
      const dx = nx - (1 - r), dy = ny - r;
      if (dx * dx + dy * dy > r * r) return 0;
    }
  }

  if (nx < leftEdge || nx > rightEdge) return 0;
  if (ny < 0 || ny > 1) return 0;

  // Border detection
  const bx = border * (1 / (rightEdge - leftEdge + 0.001));
  const isNearLeft  = (nx - leftEdge) < border;
  const isNearRight = (rightEdge - nx) < border;
  const isNearTop   = ny < border;
  const isNearBot   = ny > 1 - border * 2;

  // Near the taper edges
  const isNearTaper = ny > 0.62 && ((nx - leftEdge) < border || (rightEdge - nx) < border);

  if (isNearLeft || isNearRight || isNearTop || isNearTaper) return 2;
  return 1;
}

function drawX(px, size, lx, ly, lw, lh, thick, c1, c2) {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x - lx;
      const ny = y - ly;
      if (nx < 0 || nx > lw || ny < 0 || ny > lh) continue;

      const t  = ny / lh;        // 0..1 top→bottom
      const ex = nx / lw;        // 0..1 left→right

      // Diagonal 1: top-left to bottom-right   (ex ≈ t)
      const d1 = Math.abs(ex - t) * Math.min(lw, lh);
      // Diagonal 2: top-right to bottom-left   (ex ≈ 1-t)
      const d2 = Math.abs(ex - (1 - t)) * Math.min(lw, lh);

      if (d1 < thick / 2 || d2 < thick / 2) {
        const alpha = Math.max(
          1 - d1 / (thick / 2),
          1 - d2 / (thick / 2)
        );
        const blend = Math.min(alpha, 1);

        // gradient along letter (top=c1, bottom=c2)
        const fg = [
          Math.round(c1[0] * (1 - t) + c2[0] * t),
          Math.round(c1[1] * (1 - t) + c2[1] * t),
          Math.round(c1[2] * (1 - t) + c2[2] * t),
        ];

        const i = (y * size + x) * 4;
        px[i]   = Math.round(px[i]   * (1 - blend) + fg[0] * blend);
        px[i+1] = Math.round(px[i+1] * (1 - blend) + fg[1] * blend);
        px[i+2] = Math.round(px[i+2] * (1 - blend) + fg[2] * blend);
      }
    }
  }
}

// ── PNG encoder ────────────────────────────────────────────────────────
function encodePNG(size, px) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw image data: filter byte (0) + RGBA row
  const raw = Buffer.allocUnsafe(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;  // filter: None
    for (let x = 0; x < size; x++) {
      const si = (y * size + x) * 4;
      const di = y * (size * 4 + 1) + 1 + x * 4;
      raw[di]   = px[si];
      raw[di+1] = px[si+1];
      raw[di+2] = px[si+2];
      raw[di+3] = px[si+3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Main ───────────────────────────────────────────────────────────────
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outDir = path.join(__dirname, 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

for (const size of sizes) {
  const pixels = renderIcon(size);
  const png    = encodePNG(size, pixels);
  const dest   = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(dest, png);
  console.log(`✓ icon-${size}.png  (${png.length} bytes)`);
}
console.log('\nAll icons generated in public/icons/');
