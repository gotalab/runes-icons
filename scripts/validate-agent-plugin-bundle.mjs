import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { ICON_METADATA_BY_SLUG, LIBRARY_META } from "../src/catalog.js";
import { icons } from "../src/icons/index.js";
import { runesApplication } from "../src/runes-application.js";

const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const pluginRootIndex = process.argv.indexOf("--plugin-root");
const pluginRoot = pluginRootIndex === -1 ? null : resolve(process.argv[pluginRootIndex + 1]);
if (!pluginRoot) throw new Error("--plugin-root PATH is required");
const manifest = JSON.parse(await readFile(resolve(pluginRoot, "assets/generated/bundle-manifest.json"), "utf8"));
assert.equal(manifest.namespace, "@gotalab/runes");
assert.equal(manifest.plugin, "runes");
assert.equal(manifest.version, LIBRARY_META.version);
assert.equal(manifest.license, "MIT");
assert.equal(manifest.thirdPartyLicenses.resvg, "MPL-2.0");
assert.equal(manifest.iconCount, icons.length);
assert.equal(manifest.fixture, false);
assert.ok(manifest.files["assets/generated/resvg-LICENSE.txt"]);
for (const [relativePath, expected] of Object.entries(manifest.files)) {
  const data = await readFile(resolve(pluginRoot, relativePath));
  assert.equal(data.length, expected.bytes, `${relativePath} byte count differs`);
  assert.equal(sha256(data), expected.sha256, `${relativePath} hash differs`);
}
assert.deepEqual(JSON.parse(await readFile(resolve(pluginRoot, "assets/generated/gotalab-runes.json"), "utf8")), runesApplication.iconifyJson());
assert.deepEqual(JSON.parse(await readFile(resolve(pluginRoot, "assets/generated/metadata.json"), "utf8")), runesApplication.metadataJson());
assert.equal(Object.keys(ICON_METADATA_BY_SLUG).length, icons.length);

const cli = resolve(pluginRoot, "dist/runes.mjs");
const run = (args) => spawnSync(process.execPath, [cli, ...args], { cwd: pluginRoot, encoding: "utf8" });
const search = run(["search", "agent", "--limit", "1", "--json"]);
assert.equal(search.status, 0, search.stderr);
assert.equal(JSON.parse(search.stdout).results[0].slug, "agent");
const temp = await mkdtemp(join(tmpdir(), "runes-plugin-"));
try {
  const pngPath = resolve(temp, "agent.png");
  const exported = run(["export", "agent", "--format", "png", "--size", "128", "--out", pngPath, "--json"]);
  assert.equal(exported.status, 0, `${exported.stdout}\n${exported.stderr}`);
  assert.deepEqual([...((await readFile(pngPath)).subarray(0, 8))], [137, 80, 78, 71, 13, 10, 26, 10]);
} finally {
  await rm(temp, { recursive: true, force: true });
}
console.log(`Validated self-contained Agent Plugin bundle parity and CLI execution for ${manifest.iconCount} icons.`);
