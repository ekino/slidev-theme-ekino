/**
 * La trame ekino (le grain du site ekino.fr, recette DitherImageV2 validée le
 * 6 octobre 2026), pour le navigateur.
 *
 * Copie conforme de la recette de `trame.mjs` (skill ekino-trame), lui-même
 * repris de `dither-core.ts` et `tools/dither/dither.mjs` du site : palette,
 * forces, diffusion Atkinson et rééchantillonnage. Ne pas modifier la recette :
 * si le site change, ce fichier est remplacé.
 *
 *   - couleur : palette « Chaotic Neutral » (17 couleurs), force 1 ;
 *   - noir & blanc : palette {noir, blanc}, force 0,5 ;
 *   - l'image est d'abord remise à la largeur de la grille (1 pixel = 1 point de trame).
 */

// ─── Recette (copie conforme du site) ────────────────────────────────────────

export const CHAOTIC_NEUTRAL = [
  "e1d4cb", "c19f90", "a56457", "6d504d", "484044", "392b29", "31312f", "d8eef0",
  "97999f", "81a4c0", "6a7f92", "415973", "43425a", "45334b", "4b1f40", "671087", "955ab9",
].map((h) => [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]);
export const BLACK_WHITE = [[0, 0, 0], [255, 255, 255]];
export const COLOR_STRENGTH = 1;
export const BW_STRENGTH = 0.5;

/** Couleur de palette la plus proche (euclidienne RVB, premier minimum strict). */
function nearestIndex(palette, r, g, b) {
  let best = 0;
  let bd = Infinity;
  for (let i = 0; i < palette.length; i++) {
    const c = palette[i];
    const dr = r - c[0], dg = g - c[1], db = b - c[2];
    const d = dr * dr + dg * dg + db * db;
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}

/** Atkinson sur palette indexée, erreur × force, /8 vers 6 voisins. Alpha préservé. */
export function ditherPalette(rgba, width, height, palette, strength) {
  const count = width * height;
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    buf[i * 3] = rgba[i * 4];
    buf[i * 3 + 1] = rgba[i * 4 + 1];
    buf[i * 3 + 2] = rgba[i * 4 + 2];
  }
  const out = new Uint8Array(count * 4);
  const spread = (x, y, er, eg, eb) => {
    if (x < 0 || x >= width || y >= height) return;
    const j = (y * width + x) * 3;
    buf[j] += er / 8;
    buf[j + 1] += eg / 8;
    buf[j + 2] += eb / 8;
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const j = i * 3;
      const r = Math.min(255, Math.max(0, buf[j]));
      const g = Math.min(255, Math.max(0, buf[j + 1]));
      const b = Math.min(255, Math.max(0, buf[j + 2]));
      const c = palette[nearestIndex(palette, r, g, b)];
      const er = (r - c[0]) * strength, eg = (g - c[1]) * strength, eb = (b - c[2]) * strength;
      const o = i * 4;
      out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = rgba[o + 3];
      spread(x + 1, y, er, eg, eb);
      spread(x + 2, y, er, eg, eb);
      spread(x - 1, y + 1, er, eg, eb);
      spread(x, y + 1, er, eg, eb);
      spread(x + 1, y + 1, er, eg, eb);
      spread(x, y + 2, er, eg, eb);
    }
  }
  return out;
}

// ─── Rééchantillonnage (copie conforme de tools/dither) ─────────────────────

/** Réduction par moyenne d'aire. */
function resizeRgba(data, srcW, srcH, dstW, dstH) {
  const out = new Uint8Array(dstW * dstH * 4);
  const sx = srcW / dstW, sy = srcH / dstH;
  for (let oy = 0; oy < dstH; oy++) {
    const y0 = oy * sy, y1 = y0 + sy;
    const iy0 = Math.floor(y0), iy1 = Math.min(Math.ceil(y1), srcH);
    for (let ox = 0; ox < dstW; ox++) {
      const x0 = ox * sx, x1 = x0 + sx;
      const ix0 = Math.floor(x0), ix1 = Math.min(Math.ceil(x1), srcW);
      let r = 0, g = 0, b = 0, a = 0, wsum = 0;
      for (let yy = iy0; yy < iy1; yy++) {
        const wy = Math.min(yy + 1, y1) - Math.max(yy, y0);
        if (wy <= 0) continue;
        for (let xx = ix0; xx < ix1; xx++) {
          const wx = Math.min(xx + 1, x1) - Math.max(xx, x0);
          if (wx <= 0) continue;
          const w = wx * wy;
          const p = (yy * srcW + xx) * 4;
          r += data[p] * w; g += data[p + 1] * w; b += data[p + 2] * w; a += data[p + 3] * w;
          wsum += w;
        }
      }
      const d = (oy * dstW + ox) * 4;
      out[d] = Math.round(r / wsum); out[d + 1] = Math.round(g / wsum);
      out[d + 2] = Math.round(b / wsum); out[d + 3] = Math.round(a / wsum);
    }
  }
  return out;
}

/** Agrandissement bilinéaire (centres de pixels). */
function upscaleRgbaBilinear(data, srcW, srcH, dstW, dstH) {
  const out = new Uint8Array(dstW * dstH * 4);
  const sx = srcW / dstW, sy = srcH / dstH;
  const maxX = srcW - 1, maxY = srcH - 1;
  for (let oy = 0; oy < dstH; oy++) {
    const fy = Math.min(maxY, Math.max(0, (oy + 0.5) * sy - 0.5));
    const y0 = Math.floor(fy), y1 = y0 < maxY ? y0 + 1 : maxY, wy = fy - y0;
    for (let ox = 0; ox < dstW; ox++) {
      const fx = Math.min(maxX, Math.max(0, (ox + 0.5) * sx - 0.5));
      const x0 = Math.floor(fx), x1 = x0 < maxX ? x0 + 1 : maxX, wx = fx - x0;
      const p00 = (y0 * srcW + x0) * 4, p01 = (y0 * srcW + x1) * 4;
      const p10 = (y1 * srcW + x0) * 4, p11 = (y1 * srcW + x1) * 4;
      const d = (oy * dstW + ox) * 4;
      for (let c = 0; c < 4; c++) {
        const top = data[p00 + c] + (data[p01 + c] - data[p00 + c]) * wx;
        const bottom = data[p10 + c] + (data[p11 + c] - data[p10 + c]) * wx;
        out[d + c] = Math.round(top + (bottom - top) * wy);
      }
    }
  }
  return out;
}

export function toGrid(img, gridW) {
  const gridH = Math.max(1, Math.round((img.height * gridW) / img.width));
  if (gridW === img.width && gridH === img.height) return { data: img.data, width: gridW, height: gridH };
  const data = gridW > img.width
    ? upscaleRgbaBilinear(img.data, img.width, img.height, gridW, gridH)
    : resizeRgba(img.data, img.width, img.height, gridW, gridH);
  return { data, width: gridW, height: gridH };
}
