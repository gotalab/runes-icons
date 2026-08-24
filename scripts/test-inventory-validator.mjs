import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(resolve(projectRoot, "scripts/fixtures/expansion-inventory.md"), "utf8");
const temporaryRoot = await mkdtemp(join(tmpdir(), "runes-inventory-negative-"));
const row = (slug) => source.match(new RegExp("^- \\[[ x]\\] `" + slug + "`.*$", "m"))?.[0];
const replaceRow = (content, slug, transform) => content.replace(row(slug), transform(row(slug)));

const cases = [
  { name: "duplicate candidate", content: source.replace("`arrow-up`", "`arrow-left`") },
  {
    name: "unresolved complete inventory",
    content: replaceRow(source, "arrow-left", (line) => line.replace("- [x]", "- [ ]").replace("state:verified", "state:pending")),
    args: ["--complete"],
  },
  { name: "missing alias target", content: source.replace("`success-circle` — decision:alias:done", "`success-circle` — decision:alias:no-such-icon") },
  { name: "alias chain", content: source.replace("`success-circle` — decision:alias:done", "`success-circle` — decision:alias:funnel-analysis") },
  {
    name: "wave swap preserving aggregate counts",
    content: replaceRow(replaceRow(source, "arrow-left", (line) => line.replace("wave:T2", "wave:T3")), "embedding", (line) => line.replace("wave:T3", "wave:T2")),
  },
  {
    name: "family swap preserving aggregate counts",
    content: replaceRow(replaceRow(source, "arrow-left", (line) => line.replace("family:core-actions", "family:people-communication")), "users", (line) => line.replace("family:people-communication", "family:core-actions")),
  },
  { name: "malformed candidate row", content: replaceRow(source, "arrow-left", (line) => line.replace("; family:core-actions", "")) },
  { name: "decision drift", content: source.replace("`success-circle` — decision:alias:done", "`success-circle` — decision:new:success-circle") },
  { name: "wrong source family", content: source, args: ["--source-override=arrow-left:people-communication"] },
  { name: "invalid family", content: replaceRow(source, "arrow-left", (line) => line.replace("family:core-actions", "family:not-a-family")) },
];

let failed = false;
for (const testCase of cases) {
  const path = join(temporaryRoot, `${testCase.name.replaceAll(" ", "-")}.md`);
  await writeFile(path, testCase.content);
  const result = spawnSync(process.execPath, [resolve(projectRoot, "scripts/validate-inventory.mjs"), `--inventory=${path}`, ...(testCase.args ?? [])], { cwd: projectRoot, encoding: "utf8" });
  if (result.status === 0) {
    console.error(`ERROR negative control passed unexpectedly: ${testCase.name}`);
    failed = true;
  } else {
    console.log(`Rejected ${testCase.name}.`);
  }
}

if (failed) process.exit(1);
console.log(`Validated ${cases.length} inventory negative controls.`);
