import { FACETS, FILTER_BY_ID, GROUP_COLLECTIONS, ICON_METADATA_BY_SLUG, LIBRARY_META } from "./catalog.js";
import { ICON_CONTRACT } from "./icon-contract.js";
import { iconBySlug, icons } from "./icons/index.js";
import { renderGalleryExportSvg } from "./gallery-export.js";
import { renderIconSvg } from "./render-svg.js";
import { searchIcons } from "./search-icons.js";

const app = document.querySelector("#app");
const THEME_TEXT = Object.freeze({ light: "#101828", dark: "#f0f2f7" });
const initialParams = new URLSearchParams(window.location.search);
const initialSize = Number(initialParams.get("size"));
const initialIcon = initialParams.get("icon");
const state = {
  size: ICON_CONTRACT.inspectionSizes.includes(initialSize) ? initialSize : ICON_CONTRACT.width,
  stroke: ICON_CONTRACT.defaultStrokeWidth,
  theme: "light",
  groupId: "all",
  query: initialIcon ?? "",
  selectedSlug: iconBySlug[initialIcon] ? initialIcon : null,
  labels: "show",
  colorMode: "monochrome",
  inheritColor: true,
  colors: { primary: "#3f46d8", secondary: "#7c5ce0", tertiary: "#b477c8" },
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const renderColors = () => ({ ...state.colors, primary: state.inheritColor ? "currentColor" : state.colors.primary });
const iconSvg = (icon, size = state.size, stroke = state.stroke, title = "") => renderIconSvg(icon, {
  size,
  strokeWidth: stroke,
  title,
  color: state.inheritColor ? "currentColor" : state.colors.primary,
  colorMode: state.colorMode,
  colors: renderColors(),
});

const githubMarkSvg = (size = 16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/></svg>`;

const exportPrimaryColor = () => state.inheritColor ? THEME_TEXT[state.theme] : state.colors.primary;

function exportSvg(icon, { raster = false } = {}) {
  return renderGalleryExportSvg(icon, {
    size: state.size,
    strokeWidth: state.stroke,
    colorMode: state.colorMode,
    colors: state.colors,
    inheritColor: state.inheritColor,
    resolvedColor: exportPrimaryColor(),
    raster,
  });
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard copy is unavailable");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function pngBlob(icon) {
  const svg = exportSvg(icon, { raster: true });
  const sourceUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    image.decoding = "async";
    const loaded = new Promise((resolve, reject) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", () => reject(new Error("Could not rasterize SVG")), { once: true });
    });
    image.src = sourceUrl;
    await loaded;
    const canvas = document.createElement("canvas");
    canvas.width = state.size;
    canvas.height = state.size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable");
    context.drawImage(image, 0, 0, state.size, state.size);
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not encode PNG")), "image/png"));
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function control(label, key, options, format = String) {
  return `<fieldset class="control control-${key}"><legend>${label}</legend><div class="segments">${options.map((option) => {
    const selected = state[key] === option;
    return `<button type="button" data-key="${key}" data-value="${option}" aria-pressed="${selected}">${escapeHtml(format(option))}</button>`;
  }).join("")}</div></fieldset>`;
}

function strokeControl() {
  return `<fieldset class="control control-stroke"><legend>Stroke width</legend>
    <div class="stroke-control-row">
      <input data-stroke-range type="range" min="${ICON_CONTRACT.strokeRange.min}" max="${ICON_CONTRACT.strokeRange.max}" step="${ICON_CONTRACT.strokeRange.step}" value="${state.stroke}" aria-label="Stroke width" />
      <output data-stroke-output>${state.stroke.toFixed(2)}</output>
    </div>
    <p class="stroke-help"><span>${ICON_CONTRACT.strokeRange.min}</span><span>Lucide default 2</span><span>${ICON_CONTRACT.strokeRange.max.toFixed(1)}</span></p>
  </fieldset>`;
}

function groupSelect() {
  const collections = GROUP_COLLECTIONS.map((collection) => `<optgroup label="${escapeHtml(collection.label)}">${collection.groups.map((group) => `<option value="${group.id}"${state.groupId === group.id ? " selected" : ""}>${escapeHtml(group.label)}</option>`).join("")}</optgroup>`).join("");
  const facets = FACETS.map((facet) => `<option value="${facet.id}"${state.groupId === facet.id ? " selected" : ""}>${escapeHtml(facet.label)}</option>`).join("");
  return `<label class="control control-group"><span>Browse</span><select data-group-select aria-label="Icon family or use-case facet"><option value="all"${state.groupId === "all" ? " selected" : ""}>All</option>${collections}<optgroup label="Use-case facets">${facets}</optgroup></select></label>`;
}

function searchControl() {
  return `<label class="control control-search"><span>Search</span><input type="search" data-search-input value="${escapeHtml(state.query)}" placeholder="Name, slug, meaning…" aria-label="Search icons within the selected browse scope" /></label>`;
}

function colorControls() {
  const labels = { monochrome: "Monochrome", hierarchical: "Hierarchical", palette: "Palette" };
  const colorInputs = ICON_CONTRACT.layerNames.map((layer) => {
    const disabled = layer === "primary" && state.inheritColor;
    const hidden = state.colorMode !== "palette" && layer !== "primary";
    const displayedColor = layer === "primary" && state.inheritColor ? THEME_TEXT[state.theme] : state.colors[layer];
    return `<label class="color-swatch${hidden ? " is-hidden" : ""}"><span>${labels[layer] ?? layer[0].toUpperCase() + layer.slice(1)}</span><input type="color" data-color-layer="${layer}" value="${displayedColor}"${disabled ? " disabled" : ""} /></label>`;
  }).join("");
  return `<div class="color-controls" aria-label="Color controls">
    <label class="control control-color-mode"><span>Color mode</span><select data-color-mode>${ICON_CONTRACT.colorModes.map((mode) => `<option value="${mode}"${state.colorMode === mode ? " selected" : ""}>${labels[mode]}</option>`).join("")}</select></label>
    <label class="inherit-toggle"><input type="checkbox" data-inherit-color${state.inheritColor ? " checked" : ""} /><span>Primary inherits currentColor</span></label>
    <div class="color-swatches">${colorInputs}</div>
    <div class="contrast-status" data-contrast-status aria-live="polite"><span class="contrast-dot"></span><span>Checking contrast…</span></div>
  </div>`;
}

function specimen(icon, index) {
  const selected = state.selectedSlug === icon.slug;
  const labels = state.labels === "show"
    ? `<span class="specimen-title">${escapeHtml(icon.name)}</span><span class="specimen-detail">${escapeHtml(`${icon.name} → ${icon.loreName}`)}</span>`
    : `<span class="specimen-title blind-label">Icon ${index + 1}</span><span class="specimen-detail" aria-hidden="true">&nbsp;</span>`;
  return `<article class="specimen${selected ? " is-selected" : ""}">
    <button type="button" class="specimen-select" data-select-icon="${icon.slug}" aria-label="Select ${escapeHtml(icon.name)}" aria-pressed="${selected}">
      <span class="icon-stage">${iconSvg(icon, state.size, state.stroke, state.labels === "show" ? icon.name : "")}</span>
      ${labels}
    </button>
  </article>`;
}

function selectionBar() {
  const icon = state.selectedSlug ? iconBySlug[state.selectedSlug] : null;
  if (!icon) return `<div class="selection-bar is-empty"><p>Select an icon to copy or download.</p></div>`;
  return `<div class="selection-bar">
    <div class="selection-preview">${iconSvg(icon, 32, state.stroke)}<div><strong>${escapeHtml(icon.name)}</strong><code>${icon.slug}</code></div></div>
    <div class="selection-actions" aria-label="Export selected icon">
      <button type="button" class="action-primary" data-export-action="copy-svg">Copy SVG</button>
      <button type="button" data-export-action="download-svg">Download SVG</button>
      <button type="button" data-export-action="download-png">Download PNG</button>
    </div>
    <output data-export-status role="status" aria-live="polite"></output>
  </div>`;
}

function contextRow(slug, label, size) {
  return `<div class="context-row">${iconSvg(iconBySlug[slug], size, state.stroke)}<span>${label}</span><code>${size}px</code></div>`;
}

function calibrationSpecimen(icon) {
  const labels = state.labels === "show"
    ? `<h3>${escapeHtml(icon.name)}</h3><p>${escapeHtml(icon.cue)}</p>`
    : `<h3>Blind specimen</h3><p aria-hidden="true">&nbsp;</p>`;
  return `<article class="calibration-specimen">
    <div class="calibration-large">${iconSvg(icon, 128, state.stroke, state.labels === "show" ? `${icon.name} at 128 pixels` : "")}</div>
    ${labels}
    <div class="calibration-scale">
      <span>${iconSvg(icon, 16, state.stroke)}<code>16</code></span>
      <span>${iconSvg(icon, 64, state.stroke)}<code>64</code></span>
      <span>${iconSvg(icon, 128, state.stroke)}<code>128</code></span>
    </div>
  </article>`;
}

function render() {
  const group = FILTER_BY_ID[state.groupId];
  const scope = state.groupId === "all"
    ? icons
    : group.kind === "facet"
      ? group.slugs.map((slug) => iconBySlug[slug])
      : icons.filter((icon) => icon.groupId === state.groupId);
  const visible = searchIcons(scope, state.query, ICON_METADATA_BY_SLUG);
  const calibrationIcons = group.calibration.map((slug) => iconBySlug[slug]);
  app.dataset.theme = state.theme;
  app.dataset.labels = state.labels;
  app.innerHTML = `<div class="shell${state.selectedSlug ? " has-selection" : ""}">
    <header class="page-header">
      <div class="identity">${iconSvg(iconBySlug.agent, 32, state.stroke)}<div><h1>${LIBRARY_META.name}</h1><p>${LIBRARY_META.tagline}</p></div></div>
      <a class="repo-link" href="https://github.com/gotalab/runes-icons" target="_blank" rel="noreferrer" aria-label="Open the Runes GitHub repository in a new tab" title="GitHub repository">${githubMarkSvg(18)}</a>
    </header>
    <section class="toolbar" aria-label="Preview controls">
      ${control("Icon size", "size", ICON_CONTRACT.inspectionSizes)}
      ${strokeControl()}
      ${control("Preview", "theme", ["light", "dark"], (value) => value[0].toUpperCase() + value.slice(1))}
      ${control("Labels", "labels", ["show", "hide"], (value) => value[0].toUpperCase() + value.slice(1))}
      ${groupSelect()}
      ${searchControl()}
      ${colorControls()}
    </section>
    <section aria-labelledby="set-heading">
      <div class="section-heading"><div><h2 id="set-heading">Representative set</h2><p>${visible.length} icons · ${group.description}</p></div><code>${ICON_CONTRACT.width} × ${ICON_CONTRACT.height} grid · ${ICON_CONTRACT.linecap} cap · ${ICON_CONTRACT.linejoin} join</code></div>
      ${selectionBar()}
      <div class="icon-grid">${visible.length ? visible.map(specimen).join("") : `<p class="empty-state">No icons match “${escapeHtml(state.query)}” in this browse scope.</p>`}</div>
    </section>
    <section class="calibration" aria-labelledby="calibration-heading">
      <div class="section-heading"><div><h2 id="calibration-heading">${group.calibrationTitle}</h2><p>${group.calibrationDescription}</p></div><code>16 / 64 / 128px</code></div>
      <div class="calibration-grid">${calibrationIcons.map(calibrationSpecimen).join("")}</div>
    </section>
    <section class="context" aria-labelledby="context-heading">
      <div class="section-heading"><div><h2 id="context-heading">Readability in context</h2><p>The same metaphors at common UI and diagram sizes.</p></div><code data-context-stroke>Stroke ${state.stroke}</code></div>
      <div class="context-grid">
        <div class="context-group"><h3>Navigation · 16px</h3>${contextRow("home", "Home", 16)}${contextRow("search", "Search", 16)}${contextRow("settings", "Settings", 16)}</div>
        <div class="context-group"><h3>Agent architecture · 20px</h3>${contextRow("model", "Foundation model", 20)}${contextRow("orchestrator", "Orchestrator", 20)}${contextRow("handoff", "Handoff", 20)}</div>
        <div class="context-group"><h3>Loop engineering · 24px</h3>${contextRow("goal", "Goal", 24)}${contextRow("loop", "Feedback loop", 24)}${contextRow("human-gate", "Human gate", 24)}</div>
        <div class="context-group"><h3>Cloud and plugins · 32px</h3>${contextRow("cloud-agent", "Cloud agent", 32)}${contextRow("plugin", "Plugin bundle", 32)}${contextRow("mcp-server", "MCP server", 32)}</div>
      </div>
    </section>
    <footer><span>${LIBRARY_META.name} v${LIBRARY_META.displayVersion} · ${icons.length} representative icons</span><span>Utility-led, with restrained traces of forgotten magical technology.</span></footer>
  </div>`;

  app.querySelectorAll("button[data-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const { key, value } = button.dataset;
      state[key] = key === "size" || key === "stroke" ? Number(value) : value;
      render();
    });
  });

  app.querySelectorAll("[data-select-icon]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSlug = button.dataset.selectIcon;
      render();
      app.querySelector(`[data-select-icon="${state.selectedSlug}"]`)?.focus({ preventScroll: true });
    });
  });

  app.querySelectorAll("[data-export-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const icon = iconBySlug[state.selectedSlug];
      const status = app.querySelector("[data-export-status]");
      if (!icon || !status) return;
      button.disabled = true;
      status.dataset.result = "pending";
      status.textContent = "Preparing…";
      try {
        if (button.dataset.exportAction === "copy-svg") {
          await copyText(exportSvg(icon));
          status.textContent = `Copied ${icon.slug}.svg`;
        } else if (button.dataset.exportAction === "download-svg") {
          downloadBlob(new Blob([`${exportSvg(icon)}\n`], { type: "image/svg+xml" }), `${icon.slug}.svg`);
          status.textContent = `Downloaded ${icon.slug}.svg`;
        } else {
          downloadBlob(await pngBlob(icon), `${icon.slug}-${state.size}.png`);
          status.textContent = `Downloaded ${icon.slug}-${state.size}.png`;
        }
        status.dataset.result = "success";
      } catch (error) {
        status.dataset.result = "error";
        status.textContent = error.message;
      } finally {
        button.disabled = false;
      }
    });
  });

  const strokeRange = app.querySelector("[data-stroke-range]");
  strokeRange.addEventListener("input", () => {
    state.stroke = Number(strokeRange.value);
    app.querySelector("[data-stroke-output]").value = state.stroke.toFixed(2);
    app.querySelector("[data-context-stroke]").textContent = `Stroke ${state.stroke}`;
    app.querySelectorAll("svg").forEach((svg) => svg.setAttribute("stroke-width", state.stroke));
  });

  app.querySelector("[data-group-select]").addEventListener("change", (event) => {
    state.groupId = event.target.value;
    render();
  });

  app.querySelector("[data-search-input]").addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
    const input = app.querySelector("[data-search-input]");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });


  app.querySelector("[data-color-mode]").addEventListener("change", (event) => {
    state.colorMode = event.target.value;
    render();
  });

  app.querySelector("[data-inherit-color]").addEventListener("change", (event) => {
    state.inheritColor = event.target.checked;
    render();
  });

  app.querySelectorAll("[data-color-layer]").forEach((input) => {
    input.addEventListener("input", () => {
      state.colors[input.dataset.colorLayer] = input.value;
      render();
    });
  });

  updateContrastStatus();
}

function parseColor(value) {
  const hex = value.trim().match(/^#([\da-f]{6})$/i)?.[1];
  if (hex) return [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
  const rgb = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  return rgb?.length === 3 ? rgb : [0, 0, 0];
}

function blend(foreground, background, opacity) {
  return foreground.map((channel, index) => channel * opacity + background[index] * (1 - opacity));
}

function luminance(rgb) {
  const channels = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function updateContrastStatus() {
  const styles = getComputedStyle(app);
  const background = parseColor(styles.getPropertyValue("--rune-bg"));
  const inherited = parseColor(styles.getPropertyValue("--rune-text"));
  const primary = state.inheritColor ? inherited : parseColor(state.colors.primary);
  let samples = [primary];
  if (state.colorMode === "hierarchical") {
    const renderedOpacities = [...app.querySelectorAll("svg [stroke-opacity]")].map((node) => Number(node.getAttribute("stroke-opacity"))).filter(Number.isFinite);
    samples = [primary, ...renderedOpacities.map((opacity) => blend(primary, background, opacity))];
  } else if (state.colorMode === "palette") {
    const renderedLayerColors = [...app.querySelectorAll("svg [stroke]")].map((node) => node.getAttribute("stroke")).filter((value) => value && value !== "currentColor").map(parseColor);
    samples = [primary, ...renderedLayerColors];
  }
  const minimum = Math.min(...samples.map((sample) => contrastRatio(sample, background)));
  const passes = minimum >= 3;
  const status = app.querySelector("[data-contrast-status]");
  status.dataset.result = passes ? "pass" : "warn";
  status.lastElementChild.textContent = `${minimum.toFixed(1)}:1 minimum · ${passes ? "UI contrast passes" : "check low-contrast layer"}`;
}

render();
