import { Resvg } from "@resvg/resvg-js";
import { serializeNode } from "../../src/render-svg.js";

export const RENDER_BASELINE_SCHEMA_VERSION = 1;
export const RENDER_PROFILES = Object.freeze({
  compact: Object.freeze({ size: 16, strokeWidth: 1.25 }),
  canonical: Object.freeze({ size: 24, strokeWidth: 1.25 }),
  audit: Object.freeze({ size: 128, strokeWidth: 1.25 }),
  hairline: Object.freeze({ size: 128, strokeWidth: 0.5 }),
  ultra: Object.freeze({ size: 128, strokeWidth: 3 }),
});

const ALPHA_THRESHOLD = 8;
const COMPONENT_THRESHOLD = 32;
const COLUMNS = 30;
const VIEWBOX_PADDING = 6;
const CELL_UNITS = 24 + VIEWBOX_PADDING * 2;

function buildSpriteSvg(icons, { size, strokeWidth }) {
  const rows = Math.ceil(icons.length / COLUMNS);
  const groups = icons.map((icon, index) => {
    const x = (index % COLUMNS) * CELL_UNITS + VIEWBOX_PADDING;
    const y = Math.floor(index / COLUMNS) * CELL_UNITS + VIEWBOX_PADDING;
    return `<g transform="translate(${x} ${y})">${icon.nodes.map((node) => serializeNode(node)).join("")}</g>`;
  }).join("");
  const cellSize = size * CELL_UNITS / 24;
  const paddingPixels = size * VIEWBOX_PADDING / 24;
  return {
    columns: COLUMNS,
    cellSize,
    paddingPixels,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${COLUMNS * cellSize}" height="${rows * cellSize}" viewBox="0 0 ${COLUMNS * CELL_UNITS} ${rows * CELL_UNITS}" fill="none" stroke="#000000" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${groups}</svg>`,
  };
}

function connectedComponents(pixels, sheetWidth, offsetX, offsetY, size, seen, queue) {
  seen.fill(0);
  let count = 0;
  for (let localY = 0; localY < size; localY++) for (let localX = 0; localX < size; localX++) {
    const localIndex = localY * size + localX;
    const alpha = pixels[((offsetY + localY) * sheetWidth + offsetX + localX) * 4 + 3];
    if (seen[localIndex] || alpha < COMPONENT_THRESHOLD) continue;
    count++;
    let head = 0;
    let tail = 0;
    queue[tail++] = localIndex;
    seen[localIndex] = 1;
    while (head < tail) {
      const value = queue[head++];
      const x = value % size;
      const y = Math.floor(value / size);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nextX = x + dx;
        const nextY = y + dy;
        if (nextX < 0 || nextY < 0 || nextX >= size || nextY >= size) continue;
        const nextIndex = nextY * size + nextX;
        const nextAlpha = pixels[((offsetY + nextY) * sheetWidth + offsetX + nextX) * 4 + 3];
        if (!seen[nextIndex] && nextAlpha >= COMPONENT_THRESHOLD) {
          seen[nextIndex] = 1;
          queue[tail++] = nextIndex;
        }
      }
    }
  }
  return count;
}

function analyzeCell(pixels, sheetWidth, iconIndex, size, columns, cellSize, paddingPixels, scratch) {
  const cellX = (iconIndex % columns) * cellSize;
  const cellY = Math.floor(iconIndex / columns) * cellSize;
  const offsetX = cellX + paddingPixels;
  const offsetY = cellY + paddingPixels;
  let hashA = 2166136261;
  let hashB = 2246822519;
  let alphaPixels = 0;
  let minX = size;
  let minY = size;
  let maxX = -1;
  let maxY = -1;
  let outsideCanvas = false;
  for (let y = 0; y < cellSize; y++) for (let x = 0; x < cellSize; x++) {
    if (x >= paddingPixels && x < paddingPixels + size && y >= paddingPixels && y < paddingPixels + size) continue;
    if (pixels[((cellY + y) * sheetWidth + cellX + x) * 4 + 3] >= ALPHA_THRESHOLD) outsideCanvas = true;
  }
  for (let y = 0; y < size; y++) {
    const rowStart = ((offsetY + y) * sheetWidth + offsetX) * 4;
    for (let x = 0; x < size; x++) {
      const pixelOffset = rowStart + x * 4;
      const alpha = pixels[pixelOffset + 3];
      hashA = Math.imul(hashA ^ alpha, 16777619) >>> 0;
      hashB = Math.imul(hashB ^ alpha, 3266489917) >>> 0;
      if (alpha < ALPHA_THRESHOLD) continue;
      alphaPixels++;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  return Object.freeze({
    hash: `${hashA.toString(16).padStart(8, "0")}${hashB.toString(16).padStart(8, "0")}`,
    alphaPixels,
    bbox: alphaPixels ? Object.freeze([minX, minY, maxX, maxY]) : null,
    outsideCanvas,
    components: connectedComponents(pixels, sheetWidth, offsetX, offsetY, size, scratch.seen, scratch.queue),
  });
}

export function renderGeometryProfile(icons, profileName) {
  const profile = RENDER_PROFILES[profileName];
  if (!profile) throw new TypeError(`Unknown render profile: ${profileName}`);
  const { columns, cellSize, paddingPixels, svg } = buildSpriteSvg(icons, profile);
  const image = new Resvg(svg).render();
  const pixels = image.pixels;
  const sheetWidth = image.width;
  const scratch = { seen: new Uint8Array(profile.size * profile.size), queue: new Int32Array(profile.size * profile.size) };
  return Object.freeze(Object.fromEntries(icons.map((icon, index) => [icon.slug, analyzeCell(pixels, sheetWidth, index, profile.size, columns, cellSize, paddingPixels, scratch)])));
}
