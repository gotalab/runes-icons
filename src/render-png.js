import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { initWasm, Resvg } from "@resvg/resvg-wasm";

let wasmReady;

async function resolveWasmBytes() {
  const configured = process.env.RUNES_RESVG_WASM;
  if (configured) return readFile(configured);
  const bundled = fileURLToPath(new URL("../assets/generated/resvg.wasm", import.meta.url));
  try {
    return await readFile(bundled);
  } catch {
    return readFile(fileURLToPath(import.meta.resolve("@resvg/resvg-wasm/index_bg.wasm")));
  }
}

export async function renderPng(svg) {
  wasmReady ??= initWasm(await resolveWasmBytes());
  await wasmReady;
  const renderer = new Resvg(svg, { font: { loadSystemFonts: false } });
  const image = renderer.render();
  try {
    return Buffer.from(image.asPng());
  } finally {
    image.free();
    renderer.free();
  }
}
