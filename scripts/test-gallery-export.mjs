import assert from "node:assert/strict";
import { renderGalleryExportSvg } from "../src/gallery-export.js";
import { iconBySlug } from "../src/icons/index.js";

const settings = {
  size: 64,
  strokeWidth: 1.5,
  colorMode: "hierarchical",
  colors: { primary: "#3f46d8", secondary: "#7c5ce0", tertiary: "#b477c8" },
  inheritColor: true,
  resolvedColor: "#f0f2f7",
};

const svg = renderGalleryExportSvg(iconBySlug.agent, settings);
assert.match(svg, /width="64" height="64"/);
assert.match(svg, /stroke-width="1.5"/);
assert.match(svg, /stroke="currentColor"/);
assert.match(svg, /<title>Agent<\/title>/);

const rasterSvg = renderGalleryExportSvg(iconBySlug.agent, { ...settings, raster: true });
assert.match(rasterSvg, /stroke="#f0f2f7"/);
assert.doesNotMatch(rasterSvg, /stroke="currentColor"/);

const paletteSvg = renderGalleryExportSvg(iconBySlug.memory, { ...settings, colorMode: "palette", inheritColor: false });
assert.match(paletteSvg, /stroke="#3f46d8"/);
assert.match(paletteSvg, /stroke="#7c5ce0"/);
assert.match(paletteSvg, /stroke="#b477c8"/);

assert.throws(() => renderGalleryExportSvg(iconBySlug.agent, { ...settings, resolvedColor: "", raster: true }), /resolvedColor/);
console.log("Validated gallery SVG copy/download settings and raster color resolution.");
