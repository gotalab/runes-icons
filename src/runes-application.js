import { serializeNode, renderIconSvg } from "./render-svg.js";
import { iconBySlug } from "./icons/index.js";
import { LIBRARY_META } from "./catalog.js";
import {
  catalogAliases,
  catalogDeprecatedAliases,
  catalogIcons as defaultCatalogIcons,
  catalogMetadataBySlug as defaultMetadataBySlug,
} from "./runtime-catalog.js";
import { searchIcons } from "./search-icons.js";

export const RUNES_NAMESPACE = "@gotalab/runes";
export const ICONIFY_PREFIX = "gotalab-runes";

const iconifyBody = (icon) => `<g fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">${icon.nodes.map((node) => serializeNode(node)).join("")}</g>`;

export function createRunesApplication({
  catalogIcons = defaultCatalogIcons,
  metadataBySlug = defaultMetadataBySlug,
  aliases = catalogAliases,
  deprecatedAliases = catalogDeprecatedAliases,
} = {}) {
  const sourceIcons = Object.freeze([...catalogIcons]);
  const sourceMetadata = metadataBySlug;
  const bySlug = Object.freeze(Object.fromEntries(sourceIcons.map((icon) => [icon.slug, icon])));

  const resolve = (selector) => {
    const canonicalSlug = bySlug[selector]
      ? selector
      : aliases[selector] ?? deprecatedAliases[selector] ?? null;
    return canonicalSlug && bySlug[canonicalSlug]
      ? { icon: bySlug[canonicalSlug], metadata: sourceMetadata[canonicalSlug], requested: selector, canonicalSlug }
      : null;
  };

  return Object.freeze({
    icons: sourceIcons,
    metadataBySlug: sourceMetadata,
    resolve,
    search(query, { family, limit = 10 } = {}) {
      const scope = family ? sourceIcons.filter((icon) => icon.groupId === family) : sourceIcons;
      return searchIcons(scope, query, sourceMetadata).slice(0, limit);
    },
    info(selector) {
      return resolve(selector);
    },
    renderSvg(selector, options = {}) {
      const resolved = resolve(selector);
      return resolved ? { ...resolved, svg: renderIconSvg(resolved.icon, options) } : null;
    },
    iconifyJson() {
      const canonicalSlugs = new Set(sourceIcons.map((icon) => icon.slug));
      const iconifyAliases = {};
      for (const [alias, parent] of Object.entries({ ...aliases, ...deprecatedAliases })) {
        if (canonicalSlugs.has(parent)) iconifyAliases[alias] = { parent };
      }
      return {
        prefix: ICONIFY_PREFIX,
        width: 24,
        height: 24,
        icons: Object.fromEntries(sourceIcons.map((icon) => [icon.slug, { body: iconifyBody(icon) }])),
        aliases: iconifyAliases,
        info: {
          name: "Runes",
          total: sourceIcons.length,
          version: LIBRARY_META.version,
          author: { name: "gotalab", url: "https://github.com/gotalab" },
          license: { title: "MIT License", spdx: "MIT", url: "https://opensource.org/license/mit" },
          palette: false,
        },
      };
    },
    metadataJson() {
      return {
        schemaVersion: 1,
        namespace: RUNES_NAMESPACE,
        version: LIBRARY_META.version,
        license: "MIT",
        iconifyPrefix: ICONIFY_PREFIX,
        iconCount: sourceIcons.length,
        icons: sourceMetadata,
      };
    },
  });
}

export const runesApplication = createRunesApplication({
  catalogIcons: defaultCatalogIcons,
  metadataBySlug: defaultMetadataBySlug,
  aliases: catalogAliases,
  deprecatedAliases: catalogDeprecatedAliases,
});

export { iconBySlug };
