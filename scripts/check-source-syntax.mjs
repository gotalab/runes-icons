import { readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(projectRoot, "src");

async function walk(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".js")) files.push(path);
  }
  return files.sort();
}

const files = await walk(sourceRoot);
const failures = [];
for (const path of files) {
  const result = spawnSync(process.execPath, ["--check", path], { cwd: projectRoot, encoding: "utf8" });
  if (result.status !== 0) failures.push({ path, output: `${result.stdout}\n${result.stderr}`.trim() });
}

if (failures.length) {
  for (const failure of failures) console.error(`ERROR ${failure.path}\n${failure.output}`);
  process.exit(1);
}

console.log(`Syntax checked ${files.length} source modules.`);
