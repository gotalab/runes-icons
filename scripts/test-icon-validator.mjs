import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cases = [
  { name: "invalid icon family", argument: "--inject-invalid-family", expected: "unknown group not-a-family" },
  { name: "invalid icon layer", argument: "--inject-invalid-layer", expected: "unknown color layer not-a-layer" },
  { name: "unknown facet ID", argument: "--inject-unknown-facet-id", expected: "unknown facet ID not-a-facet" },
  { name: "missing facet icon", argument: "--inject-missing-facet-slug", expected: "missing released icon not-an-icon" },
  { name: "duplicate facet member", argument: "--inject-duplicate-facet-member", expected: "duplicate facet member goal" },
  { name: "alias facet member", argument: "--inject-alias-facet-member", expected: "alias slug approval-request must resolve to human-gate" },
  { name: "missing released alias target", argument: "--inject-missing-alias-target", expected: "released alias approval-request targets missing icon not-an-icon" },
  { name: "deprecated alias collision", argument: "--inject-deprecated-alias-collision", expected: "deprecated alias agent collides with a canonical icon" },
  { name: "invalid metadata tag", argument: "--inject-invalid-metadata-tag", expected: "icon home: invalid metadata tag Not A Tag" },
  { name: "missing modifier contract", argument: "--inject-missing-modifier-contract", expected: "compound icon user-plus is missing modifier contract" },
  { name: "duplicate canonical geometry", argument: "--inject-duplicate-geometry", expected: "duplicate canonical geometry: home, search" },
  { name: "out-of-bounds node", argument: "--inject-out-of-bounds-node", expected: "icon home: node 0 line leaves the 24px canvas" },
  { name: "zero-length line", argument: "--inject-zero-length-line", expected: "icon home: node 0 is a zero-length line" },
  { name: "duplicate SVG node", argument: "--inject-duplicate-node", expected: "icon home: contains duplicate SVG nodes" },
  { name: "duplicate semantic cue", argument: "--inject-duplicate-cue", expected: "duplicate semantic cues:" },
  { name: "missing semantic member", argument: "--inject-missing-semantic-member", expected: "semantic group agent-control targets missing icon not-an-icon" },
  { name: "duplicate semantic member", argument: "--inject-duplicate-semantic-member", expected: "semantic group agent-control has duplicate member agent-as-tool" },
  { name: "missing concept kind", argument: "--inject-missing-concept-kind", expected: "semantic group agent-control member handoff has no concept kind" },
];

let failed = false;
for (const testCase of cases) {
  const result = spawnSync(process.execPath, [resolve(projectRoot, "scripts/validate-icons.mjs"), testCase.argument], { cwd: projectRoot, encoding: "utf8" });
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0 || !output.includes(testCase.expected)) {
    console.error(`ERROR ${testCase.name} was not rejected with ${testCase.expected}`);
    failed = true;
  } else {
    console.log(`Rejected ${testCase.name}.`);
  }
}

if (failed) process.exit(1);
console.log(`Validated ${cases.length} icon negative controls.`);
