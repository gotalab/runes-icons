import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validator = resolve(projectRoot, "scripts/validate-rendered-geometry.mjs");
const updater = resolve(projectRoot, "scripts/update-render-baseline.mjs");
const cases = [
  { name: "blank render", argument: "--inject-blank", expected: "home/compact: rendered blank" },
  { name: "clipped render", argument: "--inject-clipped", expected: "home/compact: rendered pixels leave the 24px canvas" },
  { name: "pixel drift", argument: "--inject-render-drift", expected: "home/compact: rendered pixel hash differs from baseline" },
];

let failed = false;
const unreviewedUpdate = spawnSync(process.execPath, [updater], { cwd: projectRoot, encoding: "utf8" });
if (unreviewedUpdate.status === 0 || !`${unreviewedUpdate.stdout}\n${unreviewedUpdate.stderr}`.includes("Refusing to update render baseline without --accept")) {
  console.error("ERROR unreviewed render baseline update was not rejected");
  failed = true;
} else {
  console.log("Rejected unreviewed render baseline update.");
}
for (const testCase of cases) {
  const result = spawnSync(process.execPath, [validator, testCase.argument], { cwd: projectRoot, encoding: "utf8" });
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0 || !output.includes(testCase.expected)) {
    console.error(`ERROR ${testCase.name} was not rejected with ${testCase.expected}`);
    failed = true;
  } else {
    console.log(`Rejected ${testCase.name}.`);
  }
}
if (failed) process.exit(1);
console.log(`Validated ${cases.length} rendered-geometry negative controls.`);
