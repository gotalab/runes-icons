import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { icons } from "../src/icons/index.js";
import { RENDER_BASELINE_SCHEMA_VERSION, RENDER_PROFILES } from "./lib/render-geometry.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baselinePath = resolve(projectRoot, "scripts/fixtures/render-baseline.json");
const profileRunner = resolve(projectRoot, "scripts/render-geometry-profile.mjs");
if (!process.argv.includes("--accept")) {
  console.error("Refusing to update render baseline without --accept after visual review.");
  process.exit(1);
}
const packageJson = JSON.parse(await readFile(resolve(projectRoot, "node_modules/@resvg/resvg-js/package.json"), "utf8"));
const profileMetrics = {};
for (const profileName of Object.keys(RENDER_PROFILES)) {
  const result = spawnSync(process.execPath, [profileRunner, profileName], { cwd: projectRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`Render profile ${profileName} failed:\n${result.stderr}`);
  profileMetrics[profileName] = JSON.parse(result.stdout);
}
const baseline = {
  schemaVersion: RENDER_BASELINE_SCHEMA_VERSION,
  renderer: `@resvg/resvg-js@${packageJson.version}`,
  profiles: RENDER_PROFILES,
  icons: Object.fromEntries(icons.map((icon) => [icon.slug, Object.fromEntries(Object.keys(RENDER_PROFILES).map((profileName) => [profileName, profileMetrics[profileName][icon.slug]]))])),
};
await mkdir(dirname(baselinePath), { recursive: true });
await writeFile(baselinePath, `${JSON.stringify(baseline)}\n`);
console.log(`Updated deterministic render baseline for ${icons.length} icons at ${baselinePath}.`);
