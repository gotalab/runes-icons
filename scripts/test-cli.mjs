import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { LIBRARY_META } from "../src/catalog.js";
import { createRunesApplication } from "../src/runes-application.js";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
const cli = resolve(projectRoot, "bin/runes.mjs");
const run = (args, options = {}) => spawnSync(process.execPath, [cli, ...args], { cwd: projectRoot, encoding: "utf8", ...options });
const jsonRun = (args, expectedStatus = 0) => {
  const result = run([...args, "--json"]);
  assert.equal(result.status, expectedStatus, `${args.join(" ")}\n${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout);
};

const temp = await mkdtemp(join(tmpdir(), "runes-cli-"));
try {
  for (const flag of ["--help", "-h"]) {
    const help = run([flag]);
    assert.equal(help.status, 0);
    assert.match(help.stdout, /Runes CLI/);
  }
  for (const flag of ["--version", "-v"]) {
    const version = run([flag, "--json"]);
    assert.equal(version.status, 0);
    assert.equal(JSON.parse(version.stdout).version, LIBRARY_META.version);
  }

  const search = jsonRun(["search", "agent", "--limit", "3"]);
  assert.equal(search.results[0].slug, "agent");
  assert.equal(search.results.length, 3);

  const aliasInfo = jsonRun(["info", "approval-request"]);
  assert.equal(aliasInfo.slug, "human-gate");
  assert.ok(!aliasInfo.tags.includes("undefined"));

  const svgPath = join(temp, "agent.svg");
  const svgReceipt = jsonRun(["export", "agent", "--format", "svg", "--out", svgPath]);
  assert.equal(svgReceipt.status, "written");
  assert.match(await readFile(svgPath, "utf8"), /viewBox="0 0 24 24"/);
  assert.equal(jsonRun(["export", "agent", "--format", "svg", "--out", svgPath]).status, "unchanged");
  await writeFile(svgPath, "different");
  assert.equal(jsonRun(["export", "agent", "--format", "svg", "--out", svgPath], 5).reason, "output_exists");
  assert.equal(jsonRun(["export", "agent", "--format", "svg", "--out", svgPath, "--force"]).status, "written");

  const pngPath = join(temp, "agent.png");
  const pngReceipt = jsonRun(["export", "agent", "--format", "png", "--size", "128", "--out", pngPath]);
  assert.equal(pngReceipt.bytes > 100, true);
  assert.deepEqual([...((await readFile(pngPath)).subarray(0, 8))], [137, 80, 78, 71, 13, 10, 26, 10]);

  const iconifyPath = join(temp, "runes.json");
  const iconifyReceipt = jsonRun(["export-set", "--format", "iconify-json", "--out", iconifyPath]);
  const iconify = JSON.parse(await readFile(iconifyPath, "utf8"));
  assert.equal(iconify.prefix, "gotalab-runes");
  assert.equal(Object.keys(iconify.icons).length, iconifyReceipt.icon_count);
  assert.equal(iconify.aliases["approval-request"].parent, "human-gate");
  assert.equal(iconify.info.license.spdx, "MIT");

  const metadataPath = join(temp, "metadata.json");
  const metadataReceipt = jsonRun(["export-set", "--format", "metadata-json", "--out", metadataPath]);
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  assert.equal(metadata.namespace, "@gotalab/runes");
  assert.equal(metadata.version, LIBRARY_META.version);
  assert.equal(metadata.license, "MIT");
  assert.equal(metadata.iconCount, metadataReceipt.icon_count);

  const open = jsonRun(["open", "agent", "--print-only"]);
  assert.match(open.url, /icon=agent/);
  assert.match(open.url, /size=128/);

  const raw = run(["copy", "agent", "--stdout"]);
  assert.equal(raw.status, 0);
  assert.match(raw.stdout, /^<svg/);
  assert.equal(jsonRun(["search", "definitely-not-an-icon"], 3).status, "not_found");

  const fixture = { name: "Fixture Beacon", slug: "fixture-beacon", groupId: "core", loreName: "Fixture", cue: "test-only beacon", nodes: [["circle", { cx: 12, cy: 12, r: 4 }]] };
  const fixtureMetadata = { schemaVersion: 1, canonicalSlug: fixture.slug, family: fixture.groupId, aliases: [], deprecatedNames: [], tags: [fixture.slug, fixture.groupId, "fixture"], introducedVersion: "0.2.0", stability: "experimental", conceptKind: null, searchTerms: ["fixture beacon", fixture.slug, "fixture"] };
  const fixtureApp = createRunesApplication({ catalogIcons: [fixture], metadataBySlug: { [fixture.slug]: fixtureMetadata } });
  assert.equal(fixtureApp.search("fixture")[0].slug, fixture.slug);
  assert.match(fixtureApp.renderSvg(fixture.slug).svg, /<circle/);
  assert.ok(fixtureApp.iconifyJson().icons[fixture.slug]);
  assert.ok(fixtureApp.metadataJson().icons[fixture.slug]);
  console.log("Validated CLI search/info/export/copy/open/export-set and catalog-driven fixture propagation.");
} finally {
  await rm(temp, { recursive: true, force: true });
}
