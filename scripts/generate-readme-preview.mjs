import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { iconBySlug } from "../src/icons/index.js";
import { escapeXml, serializeNode } from "../src/render-svg.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const outputPath = resolve(projectRoot, "docs/assets/runes-preview.svg");
const checkOnly = process.argv.includes("--check");

const rows = [
  ["home", "search", "settings", "folder", "message", "slides"],
  ["terminal", "database", "api", "git-branch", "chart-line", "forecast"],
  ["agent", "orchestrator", "handoff", "agent-team", "cloud-agent", "subagent"],
  ["goal", "loop", "tool", "delegation", "routing", "human-gate"],
  ["dataset", "query", "memory", "plugin", "skill", "shield"],
];

const width = 1200;
const height = 860;
const startX = 105;
const columnWidth = 180;
const rowY = [180, 315, 450, 585, 720];

const renderIcon = (slug, x, y) => {
  const icon = iconBySlug[slug];
  if (!icon) throw new Error(`Unknown README preview icon: ${slug}`);
  const nodes = icon.nodes.map((node) => serializeNode(node)).join("");
  return [
    `<g transform="translate(${x} ${y}) scale(2)" fill="none" stroke="#3f46d8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">${nodes}</g>`,
    `<text x="${x + 24}" y="${y + 69}" text-anchor="middle" class="icon-label">${escapeXml(icon.name)}</text>`,
  ].join("\n");
};

const iconRows = rows.map((slugs, rowIndex) => {
  const y = rowY[rowIndex];
  return slugs.map((slug, columnIndex) => renderIcon(slug, startX + columnIndex * columnWidth, y)).join("\n");
}).join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">Representative Runes icons</title>
  <desc id="description">Thirty representative Runes icons for interfaces, software, data, AI agents, workflows, and tools.</desc>
  <style>
    text { font-family: Inter, Avenir Next, Helvetica Neue, Arial, sans-serif; }
    .title { fill: #101828; font-size: 38px; font-weight: 650; }
    .subtitle { fill: #667085; font-size: 17px; font-weight: 400; }
    .icon-label { fill: #475467; font-size: 13px; font-weight: 500; }
    .divider { stroke: #d9dee8; stroke-width: 1; }
  </style>
  <rect width="1200" height="860" fill="#f7f8fc" />
  <text x="64" y="70" class="title">Runes</text>
  <text x="64" y="101" class="subtitle">Useful first. A quiet trace of forgotten magical technology.</text>
  <line x1="64" y1="135" x2="1136" y2="135" class="divider" />
  ${iconRows}
</svg>
`;

if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== svg) {
    console.error("README preview is missing or out of date. Run: pnpm generate:readme-preview");
    process.exitCode = 1;
  } else {
    console.log("README preview matches the current icon source");
  }
} else {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, svg);
  console.log(`Generated ${outputPath}`);
}
