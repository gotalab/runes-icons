import { renderIconSvg } from "./render-svg.js";

export function renderGalleryExportSvg(icon, {
  size,
  strokeWidth,
  colorMode,
  colors,
  inheritColor,
  resolvedColor,
  raster = false,
} = {}) {
  if (!icon) throw new TypeError("icon is required");
  if (raster && inheritColor && !resolvedColor) throw new TypeError("resolvedColor is required for raster export");
  const primary = inheritColor ? (raster ? resolvedColor : "currentColor") : colors.primary;
  return renderIconSvg(icon, {
    size,
    strokeWidth,
    title: icon.name,
    pretty: true,
    color: primary,
    colorMode,
    colors: { ...colors, primary },
  });
}
