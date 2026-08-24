import assert from "node:assert/strict";
import { validateIconSet } from "@iconify/utils";
import { LIBRARY_META } from "../src/catalog.js";
import { createRunesApplication, runesApplication } from "../src/runes-application.js";

const exported = runesApplication.iconifyJson();
const validated = validateIconSet(structuredClone(exported), { fix: false, prefix: true });
assert.equal(validated.prefix, "gotalab-runes");
assert.equal(validated.width, 24);
assert.equal(validated.height, 24);
assert.equal(Object.keys(validated.icons).length, runesApplication.icons.length);
assert.equal(validated.info.total, runesApplication.icons.length);
assert.equal(validated.info.version, LIBRARY_META.version);
assert.equal(validated.info.license.spdx, "MIT");
assert.equal(validated.aliases["approval-request"].parent, "human-gate");
for (const [slug, icon] of Object.entries(validated.icons)) {
  assert.ok(!icon.body.includes("<svg"), `${slug} must contain Iconify body only`);
  assert.ok(icon.body.includes('stroke="currentColor"'), `${slug} must remain monochrome currentColor`);
}
const metadata = runesApplication.metadataJson();
assert.equal(metadata.version, LIBRARY_META.version);
assert.equal(metadata.license, "MIT");
assert.equal(metadata.iconCount, Object.keys(metadata.icons).length);
assert.equal(metadata.iconCount, Object.keys(validated.icons).length);
const defaultApplication = createRunesApplication();
assert.equal(defaultApplication.icons.length, runesApplication.icons.length);
assert.equal(defaultApplication.info("agent").canonicalSlug, "agent");
console.log(`Validated IconifyJSON schema, aliases, currentColor bodies, and metadata parity for ${metadata.iconCount} icons.`);
