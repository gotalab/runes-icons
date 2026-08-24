import { icons } from "../src/icons/index.js";
import { renderGeometryProfile } from "./lib/render-geometry.mjs";

const profileName = process.argv[2];
let validationIcons = icons;
if (process.argv.includes("--inject-blank")) validationIcons = icons.map((icon) => icon.slug === "home" ? { ...icon, nodes: [] } : icon);
if (process.argv.includes("--inject-clipped")) validationIcons = icons.map((icon) => icon.slug === "home" ? { ...icon, nodes: [["line", { x1: 0, y1: 0, x2: 24, y2: 24 }]] } : icon);
if (process.argv.includes("--inject-render-drift")) validationIcons = icons.map((icon) => icon.slug === "home" ? { ...icon, nodes: [...icon.nodes, ["circle", { cx: 12, cy: 12, r: 1 }]] } : icon);
process.stdout.write(JSON.stringify(renderGeometryProfile(validationIcons, profileName)));
