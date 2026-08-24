import { readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { FACETS, GROUPS, GROUP_OPTIONS, ICON_METADATA_BY_SLUG, LIBRARY_META } from "../src/catalog.js";
import { FACET_BY_ID, FACET_DEFINITIONS, FACET_MEMBERSHIP } from "../src/facet-manifest.js";
import { DEPRECATED_ICON_ALIASES, RELEASED_ICON_ALIASES } from "../src/icon-aliases.js";
import { ICON_METADATA_SCHEMA_VERSION, ICON_STABILITY_VALUES } from "../src/icon-metadata.js";
import { ICON_CONTRACT, SVG_NODE_ATTRIBUTES, SVG_NODE_REQUIRED_ATTRIBUTES } from "../src/icon-contract.js";
import { icons } from "../src/icons/index.js";
import { COMPOUND_ICON_MODIFIERS, MODIFIER_KINDS } from "../src/modifier-contract.js";
import { CONCEPT_KINDS, ICON_CONCEPT_KINDS, SEMANTIC_DISTINCTION_GROUPS } from "../src/semantic-contract.js";
import { V0_2_BASELINE } from "../src/release-baseline.js";
import { FAMILY_MANIFEST, RELEASED_FAMILIES } from "../src/family-manifest.js";
import { renderIconSvg } from "../src/render-svg.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkDist = process.argv.includes("--dist");
const duplicateGeometryNodes = icons.find((icon) => icon.slug === "search")?.nodes;
const validationIcons = icons.map((icon) => {
  if (process.argv.includes("--inject-invalid-family") && icon.slug === "home") return { ...icon, groupId: "not-a-family" };
  if (process.argv.includes("--inject-invalid-layer") && icon.slug === "home") return { ...icon, nodes: icon.nodes.map((node, index) => index === 0 ? [...node.slice(0, 2), "not-a-layer"] : node) };
  if (process.argv.includes("--inject-duplicate-geometry") && icon.slug === "home") return { ...icon, nodes: duplicateGeometryNodes };
  if (process.argv.includes("--inject-out-of-bounds-node") && icon.slug === "home") return { ...icon, nodes: [["line", { x1: -1, y1: 12, x2: 24, y2: 12 }]] };
  if (process.argv.includes("--inject-zero-length-line") && icon.slug === "home") return { ...icon, nodes: [["line", { x1: 12, y1: 12, x2: 12, y2: 12 }]] };
  if (process.argv.includes("--inject-duplicate-node") && icon.slug === "home") return { ...icon, nodes: [icon.nodes[0], icon.nodes[0]] };
  if (process.argv.includes("--inject-duplicate-cue") && icon.slug === "home") return { ...icon, cue: icons.find((candidate) => candidate.slug === "search").cue };
  return icon;
});
const validationAliases = process.argv.includes("--inject-missing-alias-target")
  ? { ...RELEASED_ICON_ALIASES, "approval-request": "not-an-icon" }
  : RELEASED_ICON_ALIASES;
const validationDeprecatedAliases = process.argv.includes("--inject-deprecated-alias-collision")
  ? { ...DEPRECATED_ICON_ALIASES, agent: "agent" }
  : DEPRECATED_ICON_ALIASES;
const validationMetadata = process.argv.includes("--inject-invalid-metadata-tag")
  ? { ...ICON_METADATA_BY_SLUG, home: { ...ICON_METADATA_BY_SLUG.home, tags: [...ICON_METADATA_BY_SLUG.home.tags, "Not A Tag"] } }
  : ICON_METADATA_BY_SLUG;
const validationModifierContract = process.argv.includes("--inject-missing-modifier-contract")
  ? Object.fromEntries(Object.entries(COMPOUND_ICON_MODIFIERS).filter(([slug]) => slug !== "user-plus"))
  : COMPOUND_ICON_MODIFIERS;
const validationConceptKinds = process.argv.includes("--inject-missing-concept-kind")
  ? Object.fromEntries(Object.entries(ICON_CONCEPT_KINDS).filter(([slug]) => slug !== "handoff"))
  : ICON_CONCEPT_KINDS;
const validationSemanticGroups = SEMANTIC_DISTINCTION_GROUPS.map((group, index) => {
  if (index !== 0) return group;
  if (process.argv.includes("--inject-missing-semantic-member")) return { ...group, members: [...group.members, "not-an-icon"] };
  if (process.argv.includes("--inject-duplicate-semantic-member")) return { ...group, members: [...group.members, group.members[0]] };
  return group;
});
const validationFacetMembership = FACET_MEMBERSHIP.map((membership, index) => {
  if (index !== 0) return membership;
  if (process.argv.includes("--inject-unknown-facet-id")) return { ...membership, facetId: "not-a-facet" };
  if (process.argv.includes("--inject-missing-facet-slug")) return { ...membership, slugs: [...membership.slugs, "not-an-icon"] };
  if (process.argv.includes("--inject-duplicate-facet-member")) return { ...membership, slugs: [...membership.slugs, membership.slugs[0]] };
  if (process.argv.includes("--inject-alias-facet-member")) return { ...membership, slugs: [...membership.slugs, "approval-request"] };
  return membership;
});
const errors = [];
const fail = (message) => errors.push(message);
const duplicates = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];

const packageJson = JSON.parse(await readFile(resolve(projectRoot, "package.json"), "utf8"));
if (packageJson.version !== LIBRARY_META.version) fail(`package version ${packageJson.version} != catalog version ${LIBRARY_META.version}`);
if (packageJson.license !== "MIT") fail(`package license ${packageJson.license} != MIT`);
if (validationIcons.length !== LIBRARY_META.iconCount) fail(`icon count ${validationIcons.length} != catalog release count ${LIBRARY_META.iconCount}`);

const duplicateSlugs = duplicates(validationIcons.map((icon) => icon.slug));
const duplicateNames = duplicates(validationIcons.map((icon) => icon.name));
const duplicateCues = duplicates(validationIcons.map((icon) => icon.cue));
if (duplicateSlugs.length) fail(`duplicate slugs: ${duplicateSlugs.join(", ")}`);
if (duplicateNames.length) fail(`duplicate names: ${duplicateNames.join(", ")}`);
if (duplicateCues.length) fail(`duplicate semantic cues: ${duplicateCues.join(" | ")}`);
const geometryOwners = new Map();
for (const icon of validationIcons) {
  const key = JSON.stringify(icon.nodes);
  const owners = geometryOwners.get(key) ?? [];
  owners.push(icon.slug);
  geometryOwners.set(key, owners);
}
for (const owners of geometryOwners.values()) if (owners.length > 1) fail(`duplicate canonical geometry: ${owners.join(", ")}`);

const groupIds = new Set(GROUPS.map((group) => group.id));
const iconSlugs = new Set(validationIcons.map((icon) => icon.slug));
const numericAttributes = new Set(["cx", "cy", "r", "x1", "y1", "x2", "y2", "x", "y", "width", "height", "rx"]);

for (const [alias, target] of Object.entries(validationAliases)) {
  if (iconSlugs.has(alias)) fail(`released alias ${alias} collides with a canonical icon`);
  if (!iconSlugs.has(target)) fail(`released alias ${alias} targets missing icon ${target}`);
  if (alias === target) fail(`released alias ${alias} cannot target itself`);
}
for (const [alias, target] of Object.entries(validationDeprecatedAliases)) {
  if (iconSlugs.has(alias)) fail(`deprecated alias ${alias} collides with a canonical icon`);
  if (alias in validationAliases) fail(`deprecated alias ${alias} also exists as a released alias`);
  if (!iconSlugs.has(target)) fail(`deprecated alias ${alias} targets missing icon ${target}`);
}

const metadataSlugs = Object.keys(validationMetadata);
if (metadataSlugs.length !== validationIcons.length) fail(`metadata count ${metadataSlugs.length} != icon count ${validationIcons.length}`);
for (const icon of validationIcons) {
  const metadata = validationMetadata[icon.slug];
  if (!metadata) {
    fail(`icon ${icon.slug}: missing canonical metadata`);
    continue;
  }
  if (metadata.schemaVersion !== ICON_METADATA_SCHEMA_VERSION) fail(`icon ${icon.slug}: invalid metadata schema version ${metadata.schemaVersion}`);
  if (metadata.canonicalSlug !== icon.slug) fail(`icon ${icon.slug}: metadata canonical slug ${metadata.canonicalSlug} differs`);
  if (metadata.family !== icon.groupId) fail(`icon ${icon.slug}: metadata family ${metadata.family} differs`);
  if (!/^\d+\.\d+\.\d+$/.test(metadata.introducedVersion)) fail(`icon ${icon.slug}: invalid introduced version ${metadata.introducedVersion}`);
  if (!ICON_STABILITY_VALUES.includes(metadata.stability)) fail(`icon ${icon.slug}: invalid stability ${metadata.stability}`);
  const expectedConceptKind = validationConceptKinds[icon.slug] ?? null;
  if (metadata.conceptKind !== expectedConceptKind) fail(`icon ${icon.slug}: metadata concept kind ${metadata.conceptKind} differs from ${expectedConceptKind}`);
  for (const field of ["aliases", "deprecatedNames", "tags", "searchTerms"]) if (!Array.isArray(metadata[field])) fail(`icon ${icon.slug}: metadata ${field} is not an array`);
  for (const tag of metadata.tags ?? []) if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag) || ["undefined", "null"].includes(tag)) fail(`icon ${icon.slug}: invalid metadata tag ${tag}`);
  for (const field of ["aliases", "deprecatedNames", "tags", "searchTerms"]) {
    const values = metadata[field] ?? [];
    if (new Set(values).size !== values.length) fail(`icon ${icon.slug}: duplicate metadata ${field}`);
  }
  if (!metadata.tags?.includes(icon.slug)) fail(`icon ${icon.slug}: metadata tags omit canonical slug`);
  if (!metadata.tags?.includes(icon.groupId)) fail(`icon ${icon.slug}: metadata tags omit family`);
  const expectedAliases = Object.entries(validationAliases).filter(([, target]) => target === icon.slug).map(([alias]) => alias).sort();
  const expectedDeprecated = Object.entries(validationDeprecatedAliases).filter(([, target]) => target === icon.slug).map(([alias]) => alias).sort();
  if (JSON.stringify(metadata.aliases) !== JSON.stringify(expectedAliases)) fail(`icon ${icon.slug}: metadata aliases differ from authority`);
  if (JSON.stringify(metadata.deprecatedNames) !== JSON.stringify(expectedDeprecated)) fail(`icon ${icon.slug}: metadata deprecated names differ from authority`);
}

for (const [slug, composition] of Object.entries(validationModifierContract)) {
  if (!iconSlugs.has(slug)) fail(`modifier contract targets missing icon ${slug}`);
  if (!MODIFIER_KINDS[composition.modifier]) fail(`modifier contract ${slug} uses unknown modifier ${composition.modifier}`);
  if (!composition.noun || typeof composition.noun !== "string") fail(`modifier contract ${slug} is missing noun`);
  const expectedSuffix = MODIFIER_KINDS[composition.modifier]?.suffix;
  if (expectedSuffix && !slug.endsWith(`-${expectedSuffix}`)) fail(`modifier contract ${slug} does not end with ${expectedSuffix}`);
}
for (const icon of validationIcons.filter((candidate) => /-(plus|minus|check)$/.test(candidate.slug))) {
  if (!validationModifierContract[icon.slug]) fail(`compound icon ${icon.slug} is missing modifier contract`);
}

for (const [slug, kind] of Object.entries(validationConceptKinds)) {
  if (!iconSlugs.has(slug)) fail(`concept kind targets missing icon ${slug}`);
  if (!CONCEPT_KINDS.includes(kind)) fail(`icon ${slug}: unknown concept kind ${kind}`);
}
const semanticGroupIds = validationSemanticGroups.map((group) => group.id);
for (const id of duplicates(semanticGroupIds)) fail(`duplicate semantic group ${id}`);
for (const group of validationSemanticGroups) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(group.id)) fail(`invalid semantic group ID ${group.id}`);
  if (!Array.isArray(group.members) || group.members.length < 2) fail(`semantic group ${group.id} needs at least two members`);
  if (!group.distinction || typeof group.distinction !== "string") fail(`semantic group ${group.id} is missing distinction`);
  for (const slug of duplicates(group.members ?? [])) fail(`semantic group ${group.id} has duplicate member ${slug}`);
  for (const slug of group.members ?? []) {
    if (!iconSlugs.has(slug)) fail(`semantic group ${group.id} targets missing icon ${slug}`);
    else if (!validationConceptKinds[slug]) fail(`semantic group ${group.id} member ${slug} has no concept kind`);
  }
}

if (new Set(FAMILY_MANIFEST.map((family) => family.id)).size !== FAMILY_MANIFEST.length) fail("family manifest has duplicate IDs");
for (const family of RELEASED_FAMILIES) {
  if (!family.icons.length) fail(`released family ${family.id} has no icons`);
  if (family.icons.length > 30) fail(`released family ${family.id} exceeds icon limit 30`);
  for (const icon of family.icons) if (icon.groupId !== family.id) fail(`icon ${icon.slug} group ${icon.groupId} differs from manifest owner ${family.id}`);
}

const facetIds = FACET_DEFINITIONS.map((facet) => facet.id);
const membershipFacetIds = validationFacetMembership.map((membership) => membership.facetId);
for (const id of duplicates(facetIds)) fail(`duplicate facet definition ${id}`);
for (const id of duplicates(membershipFacetIds)) fail(`duplicate facet membership ${id}`);
for (const membership of validationFacetMembership) {
  if (!FACET_BY_ID[membership.facetId]) fail(`unknown facet ID ${membership.facetId}`);
  for (const slug of duplicates(membership.slugs)) fail(`${membership.facetId}: duplicate facet member ${slug}`);
  for (const slug of membership.slugs) {
    if (slug in validationAliases) fail(`${membership.facetId}: alias slug ${slug} must resolve to ${validationAliases[slug]}`);
    else if (!iconSlugs.has(slug)) fail(`${membership.facetId}: missing released icon ${slug}`);
  }
}
for (const facet of FACET_DEFINITIONS) {
  const membership = validationFacetMembership.find((candidate) => candidate.facetId === facet.id);
  if (!membership) fail(`${facet.id}: missing facet membership`);
  if (!Array.isArray(facet.calibration) || facet.calibration.length !== 4) fail(`${facet.id}: calibration must contain exactly four slugs`);
  for (const slug of facet.calibration ?? []) if (!membership?.slugs.includes(slug)) fail(`${facet.id}: calibration icon ${slug} is not a facet member`);
}

for (const slug of V0_2_BASELINE.slugs) if (!iconSlugs.has(slug)) fail(`missing protected v0.2 icon ${slug}`);
const checkIcon = validationIcons.find((icon) => icon.slug === "check");
if (checkIcon?.nodes.length !== 1 || checkIcon.nodes[0]?.[0] !== "path" || checkIcon.nodes[0]?.[1]?.d !== V0_2_BASELINE.checkPath) fail("protected Check geometry changed");
for (const [slug, expectedLayers] of Object.entries(V0_2_BASELINE.layeredSequences)) {
  const icon = validationIcons.find((candidate) => candidate.slug === slug);
  const actualLayers = icon?.nodes.map((node) => node[2] ?? "primary");
  if (JSON.stringify(actualLayers) !== JSON.stringify(expectedLayers)) fail(`protected layered sequence changed for ${slug}`);
}

for (const icon of validationIcons) {
  const prefix = `icon ${icon.slug || "<missing slug>"}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(icon.slug ?? "")) fail(`${prefix}: invalid slug`);
  for (const field of ["name", "groupId", "loreName", "cue"]) {
    if (typeof icon[field] !== "string" || !icon[field].trim()) fail(`${prefix}: missing ${field}`);
  }
  if (!groupIds.has(icon.groupId)) fail(`${prefix}: unknown group ${icon.groupId}`);
  if (!Array.isArray(icon.nodes) || !icon.nodes.length) fail(`${prefix}: nodes must be a non-empty array`);

  for (const [nodeIndex, node] of (icon.nodes ?? []).entries()) {
    if (!Array.isArray(node) || ![2, 3].includes(node.length)) {
      fail(`${prefix}: node ${nodeIndex} is not [tag, props, optional layer]`);
      continue;
    }
    const [tag, props, layer] = node;
    if (layer !== undefined && !ICON_CONTRACT.layerNames.includes(layer)) fail(`${prefix}: node ${nodeIndex} uses unknown color layer ${layer}`);
    const allowed = SVG_NODE_ATTRIBUTES[tag];
    if (!allowed) {
      fail(`${prefix}: node ${nodeIndex} uses unsupported tag ${tag}`);
      continue;
    }
    if (!props || typeof props !== "object" || Array.isArray(props)) {
      fail(`${prefix}: node ${nodeIndex} props are invalid`);
      continue;
    }
    for (const key of SVG_NODE_REQUIRED_ATTRIBUTES[tag]) if (!(key in props)) fail(`${prefix}: node ${nodeIndex} is missing ${tag}.${key}`);
    for (const [key, value] of Object.entries(props)) {
      if (!allowed.includes(key)) fail(`${prefix}: node ${nodeIndex} has unsupported ${tag}.${key}`);
      if (numericAttributes.has(key) && (typeof value !== "number" || !Number.isFinite(value))) fail(`${prefix}: node ${nodeIndex} ${key} is not finite`);
      if (["r", "width", "height", "rx"].includes(key) && typeof value === "number" && value < 0) fail(`${prefix}: node ${nodeIndex} ${key} is negative`);
      if (["d", "points"].includes(key) && (typeof value !== "string" || !value.trim())) fail(`${prefix}: node ${nodeIndex} ${key} is empty`);
      if (key === "transform" && !/^rotate\(-?\d+(?:\.\d+)? -?\d+(?:\.\d+)? -?\d+(?:\.\d+)?\)$/.test(value)) fail(`${prefix}: node ${nodeIndex} has unsupported transform ${value}`);
    }
    if (tag === "line" && props.x1 === props.x2 && props.y1 === props.y2) fail(`${prefix}: node ${nodeIndex} is a zero-length line`);
    if (tag === "polyline") {
      const values = String(props.points).trim().split(/[ ,]+/).map(Number);
      if (values.length < 4 || values.length % 2 !== 0 || values.some((value) => !Number.isFinite(value))) fail(`${prefix}: node ${nodeIndex} has malformed polyline points`);
      else if (values.some((value) => value < 0 || value > 24)) fail(`${prefix}: node ${nodeIndex} polyline leaves the 24px canvas`);
    }
    if (tag === "circle") {
      const bounds = [props.cx - props.r, props.cy - props.r, props.cx + props.r, props.cy + props.r];
      if (bounds.some((value) => value < 0 || value > 24)) fail(`${prefix}: node ${nodeIndex} circle leaves the 24px canvas`);
    }
    if (tag === "rect" && (props.x < 0 || props.y < 0 || props.x + props.width > 24 || props.y + props.height > 24)) fail(`${prefix}: node ${nodeIndex} rect leaves the 24px canvas`);
    if (tag === "line" && [props.x1, props.y1, props.x2, props.y2].some((value) => value < 0 || value > 24)) fail(`${prefix}: node ${nodeIndex} line leaves the 24px canvas`);
  }
  const duplicateNodes = duplicates((icon.nodes ?? []).map((node) => JSON.stringify(node)));
  if (duplicateNodes.length) fail(`${prefix}: contains duplicate SVG nodes`);

  const defaultSvg = renderIconSvg(icon);
  if (!defaultSvg.includes('stroke="currentColor"')) fail(`${prefix}: default render must inherit currentColor`);
  if (defaultSvg.includes("stroke-opacity")) fail(`${prefix}: default render leaked hierarchical styling`);
  const usedLayers = new Set(icon.nodes.map((node) => node[2]).filter(Boolean));
  if (usedLayers.size) {
    const hierarchicalSvg = renderIconSvg(icon, { colorMode: "hierarchical" });
    if (!hierarchicalSvg.includes("stroke-opacity")) fail(`${prefix}: hierarchical render is missing layer opacity`);
    const paletteSvg = renderIconSvg(icon, { colorMode: "palette", colors: { primary: "#111111", secondary: "#222222", tertiary: "#333333" } });
    for (const layer of ["secondary", "tertiary"]) {
      if (usedLayers.has(layer) && !paletteSvg.includes(`stroke="${layer === "secondary" ? "#222222" : "#333333"}"`)) fail(`${prefix}: palette render is missing ${layer} color`);
    }
  }
}

for (const group of GROUP_OPTIONS) {
  const actualCount = group.id === "all" ? validationIcons.length : validationIcons.filter((icon) => icon.groupId === group.id).length;
  if (actualCount !== group.expectedIconCount) fail(`group ${group.id}: icon count ${actualCount} != expected ${group.expectedIconCount}`);
  if (!Array.isArray(group.calibration) || group.calibration.length !== 4) fail(`group ${group.id}: calibration must contain exactly four slugs`);
  if (new Set(group.calibration).size !== group.calibration.length) fail(`group ${group.id}: calibration contains duplicates`);
  for (const slug of group.calibration) if (!iconSlugs.has(slug)) fail(`group ${group.id}: missing calibration icon ${slug}`);
  if (group.id !== "all") for (const slug of group.calibration) if (validationIcons.find((icon) => icon.slug === slug)?.groupId !== group.id) fail(`group ${group.id}: calibration icon ${slug} belongs to another family`);
}
for (const facet of FACETS) {
  const membership = validationFacetMembership.find((candidate) => `facet:${candidate.facetId}` === facet.id);
  if (membership && facet.expectedIconCount !== membership.slugs.length) fail(`${facet.id}: icon count ${membership.slugs.length} != expected ${facet.expectedIconCount}`);
}

const indexHtml = await readFile(resolve(projectRoot, "index.html"), "utf8");
const design = await readFile(resolve(projectRoot, "ICON_LANGUAGE.md"), "utf8");
const readme = await readFile(resolve(projectRoot, "README.md"), "utf8");
const license = await readFile(resolve(projectRoot, "LICENSE"), "utf8");
if (!indexHtml.includes("Search and inspect the Runes icon language")) fail("index metadata is missing the public gallery description");
if (!indexHtml.includes('href="./src/styles.css"')) fail("gallery stylesheet path is not Pages-safe");
if (!indexHtml.includes('src="./src/app.js"')) fail("gallery module path is not Pages-safe");
if (/(?:href|src)="\//.test(indexHtml)) fail("gallery contains a root-absolute asset path");
if (!design.includes("# Runes Icon Language")) fail("icon language heading is missing");
if (!design.includes(`Status: v${LIBRARY_META.displayVersion} preview`)) fail("icon language version is out of sync with catalog");
const languageContractLines = [
  `- Canvas: \`${ICON_CONTRACT.width} × ${ICON_CONTRACT.height}\`.`,
  `- Default stroke: \`${ICON_CONTRACT.defaultStrokeWidth}\`.`,
  `- Inspection range: \`${ICON_CONTRACT.strokeRange.min}–${ICON_CONTRACT.strokeRange.max}\` in \`${ICON_CONTRACT.strokeRange.step}\` increments.`,
  `- Caps and joins: ${ICON_CONTRACT.linecap}.`,
  `- Default fill: ${ICON_CONTRACT.fill}.`,
  `- Default color: \`${ICON_CONTRACT.stroke}\`.`,
];
for (const line of languageContractLines) if (!design.includes(line)) fail(`icon language contract is missing: ${line}`);
if (!readme.includes(`${LIBRARY_META.iconCount} SVG icons`)) fail("README icon count is out of sync with catalog");
if (!readme.includes("16px to 128px")) fail("README is missing the gallery size range");
if (!readme.includes("docs/assets/runes-preview.svg")) fail("README is missing the representative icon preview");
if (!readme.includes("licensed under [MIT](LICENSE)")) fail("README is missing the MIT license statement");
if (!license.startsWith("MIT License\n")) fail("LICENSE is not the canonical MIT text");

async function walkFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(path));
    else files.push(path);
  }
  return files.sort();
}

if (checkDist) {
  const svgDir = resolve(projectRoot, "dist/svg");
  const actualSvgFiles = (await readdir(svgDir)).filter((name) => name.endsWith(".svg")).sort();
  const expectedSvgFiles = validationIcons.map((icon) => `${icon.slug}.svg`).sort();
  if (JSON.stringify(actualSvgFiles) !== JSON.stringify(expectedSvgFiles)) fail("dist/svg filenames do not match source slugs");

  for (const icon of validationIcons) {
    const expected = `${renderIconSvg(icon, { size: ICON_CONTRACT.width, strokeWidth: ICON_CONTRACT.defaultStrokeWidth, title: icon.name, pretty: true })}\n`;
    const actual = await readFile(resolve(svgDir, `${icon.slug}.svg`), "utf8");
    if (actual !== expected) fail(`dist/svg/${icon.slug}.svg differs from canonical renderer output`);
  }

  const sourceRoot = resolve(projectRoot, "src");
  const distSourceRoot = resolve(projectRoot, "dist/src");
  const sourceFiles = await walkFiles(sourceRoot);
  const distFiles = await walkFiles(distSourceRoot);
  const sourceRelative = sourceFiles.map((path) => relative(sourceRoot, path));
  const distRelative = distFiles.map((path) => relative(distSourceRoot, path));
  if (JSON.stringify(sourceRelative) !== JSON.stringify(distRelative)) fail("dist/src file inventory differs from src");
  for (const file of sourceRelative) {
    const [sourceContent, distContent] = await Promise.all([
      readFile(resolve(sourceRoot, file), "utf8"),
      readFile(resolve(distSourceRoot, file), "utf8"),
    ]);
    if (sourceContent !== distContent) fail(`dist/src/${file} differs from src/${file}`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

const counts = Object.fromEntries(GROUPS.map((group) => [group.id, validationIcons.filter((icon) => icon.groupId === group.id).length]));
console.log(`Validated ${validationIcons.length} icons across ${GROUPS.length} groups${checkDist ? " with dist parity" : ""}.`);
console.log(JSON.stringify(counts));
