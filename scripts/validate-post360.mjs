import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { icons } from "../src/icons/index.js";
import { RELEASED_FAMILIES } from "../src/family-manifest.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requireComplete = process.argv.includes("--complete");
const errors = [];
const fail = (message) => errors.push(message);

const replacements = Object.freeze({
  query: "data-analytics",
  forecast: "data-analytics",
  retention: "product-analytics",
  churn: "product-analytics",
});

const additions = Object.freeze({
  play: "media-playback",
  pause: "media-playback",
  stop: "media-playback",
  "skip-back": "media-playback",
  "skip-forward": "media-playback",
  "volume-high": "media-playback",
  "volume-off": "media-playback",
  headphones: "media-playback",
  laptop: "devices-connectivity",
  keyboard: "devices-connectivity",
  mouse: "devices-connectivity",
  wifi: "devices-connectivity",
  "device-pairing": "devices-connectivity",
  battery: "devices-connectivity",
  power: "devices-connectivity",
  plug: "devices-connectivity",
  "map-pin": "location-navigation",
  map: "location-navigation",
  globe: "location-navigation",
  compass: "location-navigation",
  navigation: "location-navigation",
  locate: "location-navigation",
  "shopping-cart": "commerce-payments",
  "credit-card": "commerce-payments",
  wallet: "commerce-payments",
  receipt: "commerce-payments",
  share: "core-actions",
  "log-in": "core-actions",
  "log-out": "core-actions",
  "zoom-in": "core-actions",
  "zoom-out": "core-actions",
  move: "core-actions",
  sun: "status-time-view",
  moon: "status-time-view",
  "align-center": "editing-presentation",
  "align-right": "editing-presentation",
  "align-justify": "editing-presentation",
  "list-ordered": "editing-presentation",
  "list-checks": "editing-presentation",
  strikethrough: "editing-presentation",
});

const expectedSlugs = [...Object.keys(replacements), ...Object.keys(additions)].sort();
if (expectedSlugs.length !== 44) fail(`post-360 expected slug count ${expectedSlugs.length} != 44`);
if (new Set(expectedSlugs).size !== expectedSlugs.length) fail("duplicate post-360 expected slug");

const iconBySlug = new Map(icons.map((icon) => [icon.slug, icon]));
if (iconBySlug.size !== icons.length) fail("released source contains duplicate icon slugs");
for (const [slug, family] of Object.entries({ ...replacements, ...additions })) {
  const icon = iconBySlug.get(slug);
  if (!icon) fail(`${slug}: missing from released source`);
  else if (icon.groupId !== family) fail(`${slug}: source family ${icon.groupId} != ${family}`);
}
if (iconBySlug.has("bluetooth")) fail("protected Bluetooth rune/name must not be released; use device-pairing");

const expectedFamilyCounts = Object.entries(additions).reduce((counts, [, family]) => ({ ...counts, [family]: (counts[family] ?? 0) + 1 }), {});
const manifestPostCounts = Object.fromEntries(RELEASED_FAMILIES.filter((family) => Number.isInteger(family.post360Count)).map((family) => [family.id, family.post360Count]));
if (JSON.stringify(Object.entries(manifestPostCounts).sort()) !== JSON.stringify(Object.entries(expectedFamilyCounts).sort())) fail("manifest post360Count values differ from normalized addition ownership");
if (Object.keys(additions).length !== 40) fail(`normalized additions ${Object.keys(additions).length} != 40`);
if (Object.values(manifestPostCounts).reduce((sum, value) => sum + value, 0) !== 40) fail("manifest post-360 total != 40");

if (requireComplete && icons.length !== 438) fail(`released icon count ${icons.length} != 438`);
if (requireComplete && RELEASED_FAMILIES.length !== 29) fail(`released family count ${RELEASED_FAMILIES.length} != 29`);

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

console.log(`Validated post-360 ${expectedSlugs.length} source-backed icons${requireComplete ? " as complete" : " structurally"}.`);
console.log(JSON.stringify({ replacements: Object.keys(replacements).length, additions: Object.keys(additions).length, icons: icons.length, families: RELEASED_FAMILIES.length }));
