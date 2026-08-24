import { diamond, layer, p, rect } from "./primitives.js";

// Role icons reserve the left half for a stable, readable Agent identity.
// This is an optical recomposition of the selected Base Agent M, not a scaled copy.
export const roleAgent = (cx = 7, cy = 12) => [
  layer("secondary", p(`M${cx} ${cy - 8}v2`)),
  layer("secondary", rect(cx - 4.5, cy - 6, 9, 12, 2.25)),
  diamond(cx, cy, 2),
];

// Boundaries such as browser, session, and state need a simpler nested mark.
export const nestedAgent = (cx = 12, cy = 13) => [
  layer("secondary", p(`M${cx} ${cy - 5}v1.5`)),
  layer("secondary", rect(cx - 3.5, cy - 3.5, 7, 7, 1.8)),
  diamond(cx, cy, 1.4),
];
