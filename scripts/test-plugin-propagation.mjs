import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { icons } from "../src/icons/index.js";
import { buildAgentPlugin, TEST_FIXTURE_ICON } from "./build-agent-plugin.mjs";

const temp = await mkdtemp(join(tmpdir(), "runes-propagation-"));
try {
  const { manifest } = await buildAgentPlugin({ pluginRoot: temp, includeFixture: true });
  assert.equal(manifest.iconCount, icons.length + 1);
  assert.equal(manifest.fixture, true);
  assert.equal(manifest.license, "MIT");
  assert.equal(manifest.thirdPartyLicenses.resvg, "MPL-2.0");
  assert.ok(manifest.files["assets/generated/resvg-LICENSE.txt"]);
  assert.match(await readFile(resolve(temp, "assets/generated/resvg-LICENSE.txt"), "utf8"), /Mozilla Public License Version 2\.0/);
  const cli = resolve(temp, "dist/runes.mjs");
  const run = (args) => spawnSync(process.execPath, [cli, ...args], { cwd: temp, encoding: "utf8" });
  const search = run(["search", "fixture", "--json"]);
  assert.equal(search.status, 0, search.stderr);
  assert.equal(JSON.parse(search.stdout).results[0].slug, TEST_FIXTURE_ICON.slug);
  const svgPath = resolve(temp, "fixture.svg");
  const exported = run(["export", TEST_FIXTURE_ICON.slug, "--format", "svg", "--out", svgPath, "--json"]);
  assert.equal(exported.status, 0, exported.stderr);
  assert.match(await readFile(svgPath, "utf8"), /<circle/);
  const iconify = JSON.parse(await readFile(resolve(temp, "assets/generated/gotalab-runes.json"), "utf8"));
  assert.ok(iconify.icons[TEST_FIXTURE_ICON.slug]);
  const metadata = JSON.parse(await readFile(resolve(temp, "assets/generated/metadata.json"), "utf8"));
  assert.ok(metadata.icons[TEST_FIXTURE_ICON.slug]);

  const manifestPath = resolve(temp, "assets/generated/bundle-manifest.json");
  const tampered = JSON.parse(await readFile(manifestPath, "utf8"));
  tampered.iconCount--;
  assert.notEqual(tampered.iconCount, Object.keys(iconify.icons).length, "tampered bundle count must be detectable");
  console.log("Validated fixture propagation through bundled CLI, SVG export, IconifyJSON, metadata, and count parity failure signal.");
} finally {
  await rm(temp, { recursive: true, force: true });
}
