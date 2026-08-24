import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { icons } from "../src/icons/index.js";
import { RELEASED_ICON_ALIASES } from "../src/icon-aliases.js";
import { EXPANSION_FAMILIES, FAMILY_BY_ID } from "../src/family-manifest.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inventoryArgument = process.argv.find((argument) => argument.startsWith("--inventory="));
const inventoryPath = inventoryArgument ? resolve(projectRoot, inventoryArgument.slice("--inventory=".length)) : resolve(projectRoot, "scripts/fixtures/expansion-inventory.md");
const baseline = JSON.parse(await readFile(resolve(projectRoot, "scripts/fixtures/expansion-inventory-baseline.json"), "utf8"));
const batchReviews = JSON.parse(await readFile(resolve(projectRoot, "scripts/fixtures/expansion-batch-reviews.json"), "utf8"));
const requireComplete = process.argv.includes("--complete");
const source = await readFile(inventoryPath, "utf8");
const errors = [];
const fail = (message) => errors.push(message);
const rowPattern = /^- \[([ x])\] `([^`]+)` — decision:([^;]+); state:([^;]+); wave:(T[2-5]); family:([a-z0-9-]+)$/gm;
const rows = [...source.matchAll(rowPattern)].map((match) => ({ checked: match[1] === "x", slug: match[2], decision: match[3], state: match[4], wave: match[5], family: match[6] }));
const checkboxLineCount = [...source.matchAll(/^- \[[ x]\] /gm)].length;

if (rows.length !== 360) fail(`candidate row count ${rows.length} != 360`);
if (checkboxLineCount !== rows.length) fail(`${checkboxLineCount - rows.length} checkbox rows do not match the candidate schema`);
const duplicateSlugs = [...new Set(rows.map((row) => row.slug).filter((slug, index, all) => all.indexOf(slug) !== index))];
if (duplicateSlugs.length) fail(`duplicate candidate slugs: ${duplicateSlugs.join(", ")}`);
for (const row of rows) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) fail(`${row.slug}: invalid candidate slug`);
if (baseline.candidateCount !== 360 || Object.keys(baseline.candidates ?? {}).length !== 360) fail("inventory baseline must contain exactly 360 candidates");

const expectedWaves = { T2: 100, T3: 100, T4: 70, T5: 90 };
for (const [wave, expected] of Object.entries(expectedWaves)) {
  const actual = rows.filter((row) => row.wave === wave).length;
  if (actual !== expected) fail(`${wave} candidate count ${actual} != ${expected}`);
}

const expectedFamilies = Object.fromEntries(EXPANSION_FAMILIES.map((family) => [family.id, family.candidateCount]));
for (const [family, expected] of Object.entries(expectedFamilies)) {
  const actual = rows.filter((row) => row.family === family).length;
  if (actual !== expected) fail(`${family} candidate count ${actual} != ${expected}`);
}

const allowedStates = new Set(["pending", "in-progress", "implemented", "verified"]);
const sourceFamilyBySlug = new Map(icons.map((icon) => [icon.slug, icon.groupId]));
for (const argument of process.argv.filter((value) => value.startsWith("--source-override="))) {
  const [slug, family] = argument.slice("--source-override=".length).split(":");
  sourceFamilyBySlug.set(slug, family);
}
const sourceSlugs = new Set(sourceFamilyBySlug.keys());
const newTargets = rows.flatMap((row) => row.decision.match(/^new:(.+)$/)?.[1] ?? []);
const duplicateNewTargets = [...new Set(newTargets.filter((slug, index, all) => all.indexOf(slug) !== index))];
if (duplicateNewTargets.length) fail(`multiple candidates declare the same new target: ${duplicateNewTargets.join(", ")}`);
const plannedCanonicalSlugs = new Set([...sourceSlugs, ...newTargets]);
for (const row of rows) {
  if (!allowedStates.has(row.state)) fail(`${row.slug}: invalid state ${row.state}`);
  if (row.decision === "pending") {
    if (row.state !== "pending") fail(`${row.slug}: pending decision must have pending state`);
    if (row.checked) fail(`${row.slug}: unresolved candidate cannot be checked`);
    if (requireComplete) fail(`${row.slug}: unresolved candidate`);
    continue;
  }

  const decision = row.decision.match(/^(new|alias|merged|rejected):(.+)$/);
  if (!decision) {
    fail(`${row.slug}: invalid decision ${row.decision}`);
    continue;
  }
  const [, kind, target] = decision;
  if (kind !== "rejected" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(target)) fail(`${row.slug}: invalid ${kind} target slug ${target}`);
  if (kind === "rejected" && target.trim().length < 8) fail(`${row.slug}: rejected decision needs a concrete reason`);
  if (row.checked !== (row.state === "verified")) fail(`${row.slug}: checkbox must match verified state`);
  if (requireComplete && row.state !== "verified") fail(`${row.slug}: final state must be verified`);
  if (requireComplete && kind === "new" && !sourceSlugs.has(target)) fail(`${row.slug}: verified new target ${target} is missing from source icons`);
  if (kind === "new" && sourceSlugs.has(target) && sourceFamilyBySlug.get(target) !== row.family) fail(`${row.slug}: source family ${sourceFamilyBySlug.get(target)} != planned family ${row.family}`);
  if (row.state === "verified") {
    const review = batchReviews.families?.[row.family];
    for (const gate of ["semantic", "browser", "recognition", "independent"]) if (review?.[gate] !== "pass") fail(`${row.slug}: verified state requires ${row.family} ${gate} review pass`);
  }
}

const expectedRuntimeAliases = Object.fromEntries(rows.flatMap((row) => {
  if (row.state !== "verified") return [];
  const decision = row.decision.match(/^(alias|merged):(.+)$/);
  return decision && sourceSlugs.has(decision[2]) ? [[row.slug, decision[2]]] : [];
}));
const sortedEntries = (record) => Object.entries(record).sort(([a], [b]) => a.localeCompare(b));
if (JSON.stringify(sortedEntries(RELEASED_ICON_ALIASES)) !== JSON.stringify(sortedEntries(expectedRuntimeAliases))) fail("released runtime alias registry differs from verified source-backed alias/merge rows");

const actualDecisionCounts = Object.fromEntries(["new", "alias", "merged", "rejected"].map((kind) => [kind, rows.filter((row) => row.decision.startsWith(`${kind}:`)).length]));
if (JSON.stringify(actualDecisionCounts) !== JSON.stringify(baseline.decisionCounts)) fail(`decision counts ${JSON.stringify(actualDecisionCounts)} != baseline ${JSON.stringify(baseline.decisionCounts)}`);

for (const row of rows) {
  const expected = baseline.candidates?.[row.slug];
  if (!expected) {
    fail(`${row.slug}: missing from normalized inventory baseline`);
    continue;
  }
  for (const field of ["decision", "wave", "family"]) if (row[field] !== expected[field]) fail(`${row.slug}: ${field} ${row[field]} != baseline ${expected[field]}`);
}
for (const slug of Object.keys(baseline.candidates ?? {})) if (!rows.some((row) => row.slug === slug)) fail(`${slug}: normalized baseline candidate missing from inventory`);

const expansionIds = new Set(EXPANSION_FAMILIES.map((family) => family.id));
if (JSON.stringify([...expansionIds].sort()) !== JSON.stringify(Object.keys(expectedFamilies).sort())) fail("expansion family manifest IDs differ from normalized inventory families");
for (const family of EXPANSION_FAMILIES) {
  if (family.wave !== rows.find((row) => row.family === family.id)?.wave) fail(`${family.id}: manifest wave ${family.wave} differs from inventory`);
  if (family.candidateCount !== expectedFamilies[family.id]) fail(`${family.id}: manifest candidate count ${family.candidateCount} != ${expectedFamilies[family.id]}`);
  if (!family.sourcePath?.startsWith("src/icons/") || !family.sourcePath.endsWith(".js")) fail(`${family.id}: invalid planned sourcePath`);
  if (family.candidateCount > 30) fail(`${family.id}: expansion candidate count ${family.candidateCount} exceeds family limit 30`);
  try {
    const sourceModule = await import(new URL(`../${family.sourcePath}`, import.meta.url));
    if (!Array.isArray(sourceModule.icons)) fail(`${family.id}: expansion source must export an icons array`);
    for (const icon of sourceModule.icons ?? []) if (icon.groupId !== family.id) fail(`${family.id}: source icon ${icon.slug} has group ${icon.groupId}`);
  } catch (error) {
    fail(`${family.id}: expansion source cannot load (${error.message})`);
  }
}
for (const family of Object.keys(expectedFamilies)) if (!FAMILY_BY_ID[family]) fail(`${family}: missing from family manifest`);
if (JSON.stringify(Object.keys(batchReviews.families ?? {}).sort()) !== JSON.stringify(Object.keys(expectedFamilies).sort())) fail("batch review family IDs differ from normalized inventory families");
for (const [family, review] of Object.entries(batchReviews.families ?? {})) {
  for (const gate of ["semantic", "browser", "recognition", "independent"]) if (!["pending", "pass", "fail", "blocked"].includes(review[gate])) fail(`${family}: invalid ${gate} review state ${review[gate]}`);
}

const decisionsByCandidate = new Map(rows.map((row) => [row.slug, row.decision]));
for (const row of rows) {
  const decision = row.decision.match(/^(alias|merged):(.+)$/);
  if (!decision) continue;
  const target = decision[2];
  if (/^(alias|merged):/.test(decisionsByCandidate.get(target) ?? "")) fail(`${row.slug}: alias/merge chains are not allowed (${target})`);
  if (!plannedCanonicalSlugs.has(target)) fail(`${row.slug}: ${decision[1]} target ${target} is not canonical`);
  if (decision[1] === "merged" && !newTargets.includes(target)) fail(`${row.slug}: merged target ${target} must be declared by a new decision`);
  if (requireComplete && !sourceSlugs.has(target)) fail(`${row.slug}: verified ${decision[1]} target ${target} is missing from source icons`);
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

const counts = Object.fromEntries(["T2", "T3", "T4", "T5"].map((wave) => [wave, rows.filter((row) => row.wave === wave).length]));
console.log(`Validated ${rows.length} expansion candidates${requireComplete ? " as complete" : " structurally"}.`);
console.log(JSON.stringify(counts));
console.log(JSON.stringify({
  decisions: actualDecisionCounts,
  states: Object.fromEntries(["pending", "in-progress", "implemented", "verified"].map((state) => [state, rows.filter((row) => row.state === state).length])),
}));
