export const p = (d) => ["path", { d }];
export const c = (cx, cy, r) => ["circle", { cx, cy, r }];
export const l = (x1, y1, x2, y2) => ["line", { x1, y1, x2, y2 }];
export const rect = (x, y, width, height, rx, extra = {}) => ["rect", { x, y, width, height, rx, ...extra }];
export const poly = (points) => ["polyline", { points }];
export const layer = (name, node) => [...node, name];
export const diamond = (cx, cy, radius) => p(`M${cx} ${cy - radius} ${cx + radius} ${cy} ${cx} ${cy + radius} ${cx - radius} ${cy}Z`);
export const aiCore = (cx = 12, cy = 12, radius = 3, dot = 0.5) => [diamond(cx, cy, radius), c(cx, cy, dot)];
