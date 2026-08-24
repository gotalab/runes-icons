import { ICON_METADATA_BY_SLUG } from "./catalog.js";
import { DEPRECATED_ICON_ALIASES, RELEASED_ICON_ALIASES } from "./icon-aliases.js";
import { icons } from "./icons/index.js";

export const catalogIcons = icons;
export const catalogMetadataBySlug = ICON_METADATA_BY_SLUG;
export const catalogAliases = RELEASED_ICON_ALIASES;
export const catalogDeprecatedAliases = DEPRECATED_ICON_ALIASES;
