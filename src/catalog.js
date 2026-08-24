import { RELEASED_FAMILIES } from "./family-manifest.js";
import { FACET_BY_ID, FACET_MEMBERSHIP } from "./facet-manifest.js";
import { DEPRECATED_ICON_ALIASES, RELEASED_ICON_ALIASES } from "./icon-aliases.js";
import { buildIconMetadata } from "./icon-metadata.js";

const releasedIconCount = RELEASED_FAMILIES.reduce((total, family) => total + family.icons.length, 0);
const releasedIcons = Object.freeze(RELEASED_FAMILIES.flatMap((family) => family.icons));

export const LIBRARY_META = Object.freeze({
  name: "Runes",
  version: "0.2.2",
  displayVersion: "0.2",
  iconCount: releasedIconCount,
  tagline: "Practical icons with traces of forgotten magical technology.",
});

const allGroup = Object.freeze({
  id: "all",
  label: "All",
  description: `All ${RELEASED_FAMILIES.length} released semantic families`,
  expectedIconCount: releasedIconCount,
  calibrationTitle: "Cross-family calibration",
  calibrationDescription: "Goal, acting agent, remote agent, and plugin bundle across the complete language.",
  calibration: Object.freeze(["goal", "agent", "cloud-agent", "plugin"]),
});

export const GROUPS = Object.freeze(RELEASED_FAMILIES.map((family) => Object.freeze({
  id: family.id,
  collection: family.collection,
  label: family.label,
  description: family.description,
  expectedIconCount: family.icons.length,
  worldbuildingRatio: family.worldbuildingRatio,
  calibrationTitle: family.calibrationTitle,
  calibrationDescription: family.calibrationDescription,
  calibration: family.calibration,
})));

export const GROUP_COLLECTIONS = Object.freeze([...new Set(GROUPS.map((group) => group.collection))].map((label) => Object.freeze({
  label,
  groups: Object.freeze(GROUPS.filter((group) => group.collection === label)),
})));

export const FACETS = Object.freeze(FACET_MEMBERSHIP.map((membership) => {
  const definition = FACET_BY_ID[membership.facetId];
  return Object.freeze({
    ...definition,
    id: `facet:${definition.id}`,
    kind: "facet",
    slugs: membership.slugs,
    expectedIconCount: membership.slugs.length,
  });
}));

export const GROUP_OPTIONS = Object.freeze([allGroup, ...GROUPS]);
export const GROUP_BY_ID = Object.freeze(Object.fromEntries(GROUP_OPTIONS.map((group) => [group.id, group])));
export const FILTER_OPTIONS = Object.freeze([...GROUP_OPTIONS, ...FACETS]);
export const FILTER_BY_ID = Object.freeze(Object.fromEntries(FILTER_OPTIONS.map((filter) => [filter.id, filter])));
export const ICON_METADATA_BY_SLUG = buildIconMetadata(releasedIcons, {
  aliases: RELEASED_ICON_ALIASES,
  deprecatedAliases: DEPRECATED_ICON_ALIASES,
});
