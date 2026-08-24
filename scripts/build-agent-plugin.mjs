import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { ICON_METADATA_BY_SLUG, LIBRARY_META } from "../src/catalog.js";
import { DEPRECATED_ICON_ALIASES, RELEASED_ICON_ALIASES } from "../src/icon-aliases.js";
import { icons } from "../src/icons/index.js";
import { createRunesApplication, ICONIFY_PREFIX, RUNES_NAMESPACE } from "../src/runes-application.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = (data) => createHash("sha256").update(data).digest("hex");

export const TEST_FIXTURE_ICON = Object.freeze({
  name: "Fixture Beacon",
  slug: "fixture-beacon",
  groupId: "core",
  loreName: "Fixture",
  cue: "test-only propagation beacon",
  nodes: Object.freeze([["circle", { cx: 12, cy: 12, r: 4 }]]),
});

const fixtureMetadata = Object.freeze({
  schemaVersion: 1,
  canonicalSlug: TEST_FIXTURE_ICON.slug,
  family: TEST_FIXTURE_ICON.groupId,
  aliases: Object.freeze([]),
  deprecatedNames: Object.freeze([]),
  tags: Object.freeze([TEST_FIXTURE_ICON.slug, TEST_FIXTURE_ICON.groupId, "fixture"]),
  introducedVersion: LIBRARY_META.version,
  stability: "experimental",
  conceptKind: null,
  searchTerms: Object.freeze(["fixture beacon", TEST_FIXTURE_ICON.slug, "fixture"]),
});

function fixtureCatalogPlugin(enabled) {
  if (!enabled) return null;
  return {
    name: "runes-fixture-catalog",
    setup(builder) {
      builder.onResolve({ filter: /^\.\/runtime-catalog\.js$/ }, (args) => args.importer.endsWith("runes-application.js") ? { path: "runes-fixture-catalog", namespace: "runes-fixture" } : null);
      builder.onLoad({ filter: /.*/, namespace: "runes-fixture" }, () => ({
        loader: "js",
        resolveDir: projectRoot,
        contents: `
          import { ICON_METADATA_BY_SLUG } from ${JSON.stringify(resolve(projectRoot, "src/catalog.js"))};
          import { DEPRECATED_ICON_ALIASES, RELEASED_ICON_ALIASES } from ${JSON.stringify(resolve(projectRoot, "src/icon-aliases.js"))};
          import { icons } from ${JSON.stringify(resolve(projectRoot, "src/icons/index.js"))};
          export const catalogIcons = Object.freeze([...icons, ${JSON.stringify(TEST_FIXTURE_ICON)}]);
          export const catalogMetadataBySlug = Object.freeze({ ...ICON_METADATA_BY_SLUG, ${JSON.stringify(TEST_FIXTURE_ICON.slug)}: Object.freeze(${JSON.stringify(fixtureMetadata)}) });
          export const catalogAliases = RELEASED_ICON_ALIASES;
          export const catalogDeprecatedAliases = DEPRECATED_ICON_ALIASES;
        `,
      }));
    },
  };
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value)}\n`);
}

export async function buildAgentPlugin({ pluginRoot, includeFixture = false } = {}) {
  if (!pluginRoot) throw new TypeError("pluginRoot is required");
  const root = resolve(pluginRoot);
  const distDir = resolve(root, "dist");
  const generatedDir = resolve(root, "assets/generated");
  await rm(distDir, { recursive: true, force: true });
  await rm(generatedDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await mkdir(generatedDir, { recursive: true });

  const fixturePlugin = fixtureCatalogPlugin(includeFixture);
  await build({
    entryPoints: [resolve(projectRoot, "src/cli.js")],
    outfile: resolve(distDir, "runes.mjs"),
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    sourcemap: false,
    minify: false,
    plugins: fixturePlugin ? [fixturePlugin] : [],
  });

  const wasmSource = fileURLToPath(import.meta.resolve("@resvg/resvg-wasm/index_bg.wasm"));
  await cp(wasmSource, resolve(generatedDir, "resvg.wasm"));
  const resvgPackageEntry = fileURLToPath(import.meta.resolve("@resvg/resvg-js"));
  await cp(resolve(dirname(resvgPackageEntry), "LICENSE"), resolve(generatedDir, "resvg-LICENSE.txt"));

  const catalogIcons = includeFixture ? [...icons, TEST_FIXTURE_ICON] : icons;
  const metadataBySlug = includeFixture ? { ...ICON_METADATA_BY_SLUG, [TEST_FIXTURE_ICON.slug]: fixtureMetadata } : ICON_METADATA_BY_SLUG;
  const application = createRunesApplication({ catalogIcons, metadataBySlug, aliases: RELEASED_ICON_ALIASES, deprecatedAliases: DEPRECATED_ICON_ALIASES });
  await writeJson(resolve(generatedDir, "gotalab-runes.json"), application.iconifyJson());
  await writeJson(resolve(generatedDir, "metadata.json"), application.metadataJson());

  const generatedFiles = [
    "dist/runes.mjs",
    "assets/generated/resvg.wasm",
    "assets/generated/resvg-LICENSE.txt",
    "assets/generated/gotalab-runes.json",
    "assets/generated/metadata.json",
  ];
  const files = {};
  for (const relativePath of generatedFiles) {
    const data = await readFile(resolve(root, relativePath));
    files[relativePath] = { bytes: data.length, sha256: sha256(data) };
  }
  const manifest = {
    schemaVersion: 1,
    namespace: RUNES_NAMESPACE,
    plugin: "runes",
    version: LIBRARY_META.version,
    license: "MIT",
    thirdPartyLicenses: { resvg: "MPL-2.0" },
    iconifyPrefix: ICONIFY_PREFIX,
    iconCount: application.icons.length,
    fixture: includeFixture,
    files,
  };
  await writeJson(resolve(generatedDir, "bundle-manifest.json"), manifest);
  return { pluginRoot: root, manifest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf("--plugin-root");
  const pluginRoot = rootIndex === -1 ? null : args[rootIndex + 1];
  const result = await buildAgentPlugin({ pluginRoot, includeFixture: args.includes("--fixture") });
  process.stdout.write(`${JSON.stringify(result)}\n`);
}
