import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ICON_CONTRACT } from "../src/icon-contract.js";
import { icons } from "../src/icons/index.js";
import { renderIconSvg } from "../src/render-svg.js";

const outputDir = resolve("dist/svg");
await mkdir(outputDir, { recursive: true });

for (const icon of icons) {
  const svg = renderIconSvg(icon, { size: ICON_CONTRACT.width, strokeWidth: ICON_CONTRACT.defaultStrokeWidth, title: icon.name, pretty: true });
  await writeFile(resolve(outputDir, `${icon.slug}.svg`), `${svg}\n`);
}

console.log(`Exported ${icons.length} SVG icons to ${outputDir}`);
