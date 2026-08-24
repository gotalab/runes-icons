import { RELEASED_FAMILIES } from "../family-manifest.js";

export const icons = Object.freeze(RELEASED_FAMILIES.flatMap((family) => family.icons));

export const iconBySlug = Object.freeze(Object.fromEntries(icons.map((icon) => [icon.slug, icon])));
