export const ICON_CONTRACT = Object.freeze({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  defaultStrokeWidth: 1.25,
  strokeRange: Object.freeze({ min: 0.5, max: 3, step: 0.25 }),
  linecap: "round",
  linejoin: "round",
  inspectionSizes: Object.freeze([16, 20, 24, 32, 48, 64, 96, 128]),
  colorModes: Object.freeze(["monochrome", "hierarchical", "palette"]),
  layerNames: Object.freeze(["primary", "secondary", "tertiary"]),
  hierarchicalOpacity: Object.freeze({ primary: 1, secondary: 0.68, tertiary: 0.5 }),
});

export const SVG_NODE_ATTRIBUTES = Object.freeze({
  path: Object.freeze(["d"]),
  circle: Object.freeze(["cx", "cy", "r"]),
  line: Object.freeze(["x1", "y1", "x2", "y2"]),
  rect: Object.freeze(["x", "y", "width", "height", "rx", "transform"]),
  polyline: Object.freeze(["points"]),
});

export const SVG_NODE_REQUIRED_ATTRIBUTES = Object.freeze({
  path: Object.freeze(["d"]),
  circle: Object.freeze(["cx", "cy", "r"]),
  line: Object.freeze(["x1", "y1", "x2", "y2"]),
  rect: Object.freeze(["x", "y", "width", "height", "rx"]),
  polyline: Object.freeze(["points"]),
});
