import { ICON_CONCEPT_KINDS } from "./semantic-contract.js";

const TAG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ICON_METADATA_SCHEMA_VERSION = 1;
export const ICON_STABILITY_VALUES = Object.freeze(["experimental", "stable", "deprecated"]);

export const EXPLICIT_ICON_TAGS = Object.freeze({
  agent: Object.freeze(["ai-assistant", "autonomous-agent"]),
  "semantic-cache": Object.freeze(["similarity", "reuse", "memoization"]),
  "prompt-cache": Object.freeze(["exact-match", "reuse", "memoization"]),
  "model-checkpoint": Object.freeze(["snapshot", "saved-model"]),
  retention: Object.freeze(["cohort", "lifecycle"]),
  churn: Object.freeze(["cohort", "lifecycle", "attrition"]),
  delegation: Object.freeze(["bounded-work", "dispatch"]),
  "git-pull-request": Object.freeze(["pull-request", "code-review"]),
});

const normalizeTag = (value) => String(value)
  .trim()
  .toLowerCase()
  .replaceAll("&", " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const reverseAliases = (aliases) => {
  const result = {};
  for (const [alias, target] of Object.entries(aliases)) (result[target] ??= []).push(alias);
  return result;
};

export function buildIconMetadata(icons, {
  aliases = {},
  deprecatedAliases = {},
  introducedVersion = "0.2.0",
} = {}) {
  const aliasesByTarget = reverseAliases(aliases);
  const deprecatedByTarget = reverseAliases(deprecatedAliases);

  return Object.freeze(Object.fromEntries(icons.map((icon) => {
    const canonicalAliases = Object.freeze([...(aliasesByTarget[icon.slug] ?? [])].sort());
    const deprecatedNames = Object.freeze([...(deprecatedByTarget[icon.slug] ?? [])].sort());
    const tags = Object.freeze([...new Set([
      icon.slug,
      icon.groupId,
      ...icon.slug.split("-"),
      normalizeTag(icon.name),
      ICON_CONCEPT_KINDS[icon.slug],
      ...(EXPLICIT_ICON_TAGS[icon.slug] ?? []),
    ].filter(Boolean).map(normalizeTag).filter((tag) => tag && TAG_PATTERN.test(tag)))].sort());
    const searchTerms = Object.freeze([...new Set([
      icon.name,
      icon.slug,
      icon.loreName,
      icon.cue,
      ...canonicalAliases,
      ...deprecatedNames,
      ...tags,
    ].map((term) => term.toLowerCase()))]);

    return [icon.slug, Object.freeze({
      schemaVersion: ICON_METADATA_SCHEMA_VERSION,
      canonicalSlug: icon.slug,
      family: icon.groupId,
      aliases: canonicalAliases,
      deprecatedNames,
      tags,
      introducedVersion,
      stability: "stable",
      conceptKind: ICON_CONCEPT_KINDS[icon.slug] ?? null,
      searchTerms,
    })];
  })));
}
