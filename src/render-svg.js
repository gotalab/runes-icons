import { ICON_CONTRACT } from "./icon-contract.js";

export const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

export function serializeNode([tag, props], extraProps = {}) {
  const attributes = Object.entries({ ...props, ...extraProps })
    .map(([key, value]) => `${key}="${escapeXml(value)}"`)
    .join(" ");
  return `<${tag} ${attributes}></${tag}>`;
}

export function renderIconSvg(icon, {
  size = ICON_CONTRACT.width,
  strokeWidth = ICON_CONTRACT.defaultStrokeWidth,
  title = "",
  pretty = false,
  color = ICON_CONTRACT.stroke,
  colorMode = "monochrome",
  colors = {},
} = {}) {
  if (!ICON_CONTRACT.colorModes.includes(colorMode)) throw new TypeError(`Unsupported color mode: ${colorMode}`);
  const palette = {
    primary: colors.primary ?? color,
    secondary: colors.secondary ?? colors.primary ?? color,
    tertiary: colors.tertiary ?? colors.secondary ?? colors.primary ?? color,
  };
  const titleNode = title ? `<title>${escapeXml(title)}</title>` : "";
  const accessibility = title ? 'role="img"' : 'aria-hidden="true"';
  const rootStroke = colorMode === "palette" ? palette.primary : color;
  const open = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${ICON_CONTRACT.viewBox}" fill="${ICON_CONTRACT.fill}" stroke="${escapeXml(rootStroke)}" stroke-width="${strokeWidth}" stroke-linecap="${ICON_CONTRACT.linecap}" stroke-linejoin="${ICON_CONTRACT.linejoin}" ${accessibility}>`;
  const nodes = icon.nodes.map((node) => {
    const layer = node[2] ?? "primary";
    if (colorMode === "hierarchical" && layer !== "primary") return serializeNode(node, { "stroke-opacity": ICON_CONTRACT.hierarchicalOpacity[layer] });
    if (colorMode === "palette" && layer !== "primary") return serializeNode(node, { stroke: palette[layer] });
    return serializeNode(node);
  });

  if (!pretty) return `${open}${titleNode}${nodes.join("")}</svg>`;
  return [open, titleNode, ...nodes, "</svg>"].filter(Boolean).map((line, index) => index === 0 || line === "</svg>" ? line : `  ${line}`).join("\n");
}
