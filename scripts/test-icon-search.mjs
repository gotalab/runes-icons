import assert from "node:assert/strict";
import { ICON_METADATA_BY_SLUG } from "../src/catalog.js";
import { icons } from "../src/icons/index.js";
import { searchIcons } from "../src/search-icons.js";

const slugs = (query) => searchIcons(icons, query, ICON_METADATA_BY_SLUG).map((icon) => icon.slug);
assert.equal(slugs("agent")[0], "agent", "exact canonical name must rank first");
assert.equal(slugs("approval-request")[0], "human-gate", "exact alias must resolve to its canonical target");
assert.deepEqual(slugs("memoization").slice(0, 2).sort(), ["prompt-cache", "semantic-cache"], "shared tag must find both cache canonicals");
assert.equal(slugs("saved-model")[0], "model-checkpoint", "explicit tag must find model checkpoint");
assert.equal(slugs("copy")[0], "copy", "exact canonical must outrank cue matches");
assert.equal(slugs("bounded work delegation")[0], "delegation", "multi-token semantic query must match across cue and tags");
assert.ok(slugs("return").includes("tool-result"), "lore search remains available below canonical and tag matches");
console.log("Validated deterministic icon search ranking and semantic metadata queries.");
