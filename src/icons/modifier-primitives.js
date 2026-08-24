import { l, poly } from "./primitives.js";

export const minusMark = (cx, cy, radius) => [l(cx - radius, cy, cx + radius, cy)];

export const plusMark = (cx, cy, radius) => [
  ...minusMark(cx, cy, radius),
  l(cx, cy - radius, cx, cy + radius),
];

export const checkMark = (cx, cy, width, {
  elbowOffset = -width / 6,
  drop = width / 3,
  rise = width / 3,
} = {}) => [poly(`${cx - width / 2} ${cy} ${cx + elbowOffset} ${cy + drop} ${cx + width / 2} ${cy - rise}`)];
