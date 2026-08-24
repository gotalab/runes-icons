import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { icons } from "../src/icons/index.js";
import { RENDER_BASELINE_SCHEMA_VERSION, RENDER_PROFILES } from "./lib/render-geometry.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseline = JSON.parse(await readFile(resolve(projectRoot, "scripts/fixtures/render-baseline.json"), "utf8"));
const rendererPackage = JSON.parse(await readFile(resolve(projectRoot, "node_modules/@resvg/resvg-js/package.json"), "utf8"));
const profileRunner = resolve(projectRoot, "scripts/render-geometry-profile.mjs");
const injectionArguments = process.argv.filter((argument) => argument.startsWith("--inject-"));

const errors = [];
const fail = (message) => errors.push(message);
if (baseline.schemaVersion !== RENDER_BASELINE_SCHEMA_VERSION) fail(`render baseline schema ${baseline.schemaVersion} is unsupported`);
if (baseline.renderer !== `@resvg/resvg-js@${rendererPackage.version}`) fail(`render baseline renderer ${baseline.renderer} differs from installed @resvg/resvg-js@${rendererPackage.version}`);
if (JSON.stringify(baseline.profiles) !== JSON.stringify(RENDER_PROFILES)) fail("render baseline profiles differ from contract");

const metrics = Object.fromEntries(icons.map((icon) => [icon.slug, {}]));
for (const profileName of Object.keys(RENDER_PROFILES)) {
  const result = spawnSync(process.execPath, [profileRunner, profileName, ...injectionArguments], { cwd: projectRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) {
    fail(`render profile ${profileName} failed: ${result.stderr.trim()}`);
    continue;
  }
  const profileMetrics = JSON.parse(result.stdout);
  for (const icon of icons) metrics[icon.slug][profileName] = profileMetrics[icon.slug];
}
const baselineSlugs = Object.keys(baseline.icons).sort();
const currentSlugs = icons.map((icon) => icon.slug).sort();
if (JSON.stringify(baselineSlugs) !== JSON.stringify(currentSlugs)) fail("render baseline icon inventory differs from released icons");

for (const icon of icons) {
  for (const [profileName, profile] of Object.entries(RENDER_PROFILES)) {
    const actual = metrics[icon.slug]?.[profileName];
    const expected = baseline.icons[icon.slug]?.[profileName];
    if (!actual?.alphaPixels) fail(`${icon.slug}/${profileName}: rendered blank`);
    if (profileName !== "ultra" && actual?.outsideCanvas) fail(`${icon.slug}/${profileName}: rendered pixels leave the 24px canvas`);
    if (!expected) fail(`${icon.slug}/${profileName}: missing render baseline`);
    else if (actual.hash !== expected.hash) fail(`${icon.slug}/${profileName}: rendered pixel hash differs from baseline`);
    if (actual?.bbox && actual.bbox.some((value) => value < 0 || value >= profile.size)) fail(`${icon.slug}/${profileName}: rendered bbox is invalid`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}
console.log(`Validated deterministic renders for ${icons.length} icons across ${Object.keys(RENDER_PROFILES).length} profiles.`);
