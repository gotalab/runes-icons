# Runes Icon Language

Status: v0.2 preview

This is the human-readable design authority for Runes. It defines the visual language, visual grammar, semantic grammar, construction rules, and review standard that keep the library coherent as it grows.

Runes is an original icon language for everyday product interfaces, software and data diagrams, AI and agent systems, and presentation material: **practical icons with traces of forgotten magical technology**.

The practical test is simple: an icon must read as its modern meaning at 16px with a label, remain distinct from its closest neighbors at 24px, and reveal at most one restrained worldbuilding cue at larger sizes.

## Authority

Runes keeps one human design authority and several machine-enforced contracts:

1. `ICON_LANGUAGE.md` defines intent, judgment, composition, and review.
2. `src/icon-contract.js` enforces the SVG canvas, stroke, size, color, and node rules.
3. `src/semantic-contract.js` records high-confusion meanings that must remain distinct.
4. Family source files under `src/icons/` own icon geometry.
5. Validators and render baselines enforce repeatable facts; they do not decide beauty or recognition.

When prose and enforced source disagree, treat the mismatch as a defect. Do not silently choose one authority and leave the other stale.

## Principles

### Decision order

1. **Meaning before worldbuilding.** Preserve a familiar modern silhouette when a fantasy cue conflicts with recognition.
2. **One system, not a themed sticker pack.** Core, AI, data, and software families vary in worldbuilding intensity but share geometry, stroke, naming, color, accessibility, and review rules.
3. **Depth where ordinary libraries are weak.** Use conventional grammar for everyday UI and invest original semantic work in AI, agents, data, analytics, protocols, and software relationships.
4. **Canonical concepts before icon count.** Merge or alias synonyms and visually indistinguishable variants instead of forcing separate drawings.
5. **Precision is the character.** Runes gains flavor from proportion, metaphor, and restrained structure—not wobble, copied ornament, or random asymmetry.
6. **Bounded families preserve authorship.** Keep ownership small enough for a person or agent to review without loading the whole library. The current validator caps a released family at 30 icons.

### Non-negotiables

- Geometry is original. Do not copy icon paths, vendor logos, or protected fictional symbols.
- Monochrome `currentColor` is the default. Layered color is optional and never the only meaning carrier.
- Existing public meanings do not silently change. Migrations, aliases, and merges remain explicit and validated.
- Every released icon exists in source, gallery, and standalone SVG output.
- A high icon count never excuses duplicate geometry, ambiguous meaning, or unresolved review findings.

### Acceptable tradeoffs

- Prefer fewer canonicals plus useful aliases when two concepts cannot remain meaningfully different at 16–24px.
- A specialist icon may need a label at 16px when it is distinct at 24px and coherent in a real diagram.
- Spend more primitives on genuinely structural AI, data, or software concepts; keep ordinary controls simpler.
- Defer extra weights, animation, framework wrappers, and optical masters until the core language is stable.

## Visual language

### Design thesis

**Utility first, remembered as magic second.**

- Familiar silhouette and practical meaning outrank lore.
- Use one worldbuilding cue per icon; never stack crystals, runes, stars, scrollwork, and ornament.
- Core icons remain nearly conventional. Software, data, and AI icons may carry progressively more of the world language.
- Aim for quiet ancient technology, not high-fantasy decoration.

### Worldbuilding intensity

These ratios guide judgment; they are not scores.

| Layer | Direction |
| --- | --- |
| Core | about 95% utility / 5% worldbuilding |
| Software Engineering | about 85% utility / 15% worldbuilding |
| AI & Models | about 80% utility / 20% worldbuilding |
| Agents & Harness | about 80–85% utility / 15–20% worldbuilding |
| Data & Analytics | about 85% utility / 15% worldbuilding |
| Lore / Display | about 60% utility / 40% worldbuilding |

Core and software icons dominate daily use, so the complete library should feel roughly 80% utility and 20% worldbuilding.

### World vocabulary

Lore names are descriptive metadata, never replacements for modern public names.

| Modern concept | Runes language | Visual cue |
| --- | --- | --- |
| Model | Oracle Core | framed AI core |
| Reasoning | Divination Loop | recurrent thought path |
| Agent | Familiar Construct | construct head with an oracle core |
| Agent trio | Triad | equilateral agent cores |
| Agent swarm | Constellation | irregular non-central cluster |
| Memory | Crystal | one faceted vertical crystal |
| Skill | Grimoire | open book with one rune |
| Message | Dispatch | marked communication bubble |
| Instruction | Directive | authoritative page |
| Prompt template | Incantation Form | reusable variable slots |
| Tool | Mechanism | practical executable function |
| Artifact | Relic | tangible produced object |
| Loop | Return Path | agent/environment exchange |
| Goal | Destination | nested target |
| Human gate | Approval | person at the loop opening |
| Cloud agent | Remote Tower | agent core in a remote boundary |
| Plugin | Reliquary | portable component bundle |
| MCP server | Portal Engine | capability provider, not a logo |
| Workflow | Ritual | closed triangular circuit |
| Database | Archive Well | familiar cylinder with a structural cap |
| API | Portal | paired gates and a direct link |
| Git branch | World Tree | living fork with terminal nodes |
| Security | Ward | shield crossed by a barrier sigil |
| Deploy | Summon | upward movement through a ground ring |

### Fantasy cues

- The modern meaning must survive after mentally removing the fantasy cue.
- A diamond rune is a connective motif, not a universal AI badge.
- Place a diamond only where a clasp, core, lens, cap, or junction could structurally exist.
- Avoid decorative sparkles, floating particles, zodiac clutter, ornamental borders, faux scripts, generic magic circles, brains, and mascot shorthand.
- Crystal is reserved for memory, stored energy, and a few structural cores. Do not turn every object into a crystal.

### Brand marks

Runes describes concepts; it does not replace official identities.

- Use an official logo when identifying a protocol, company, product, or vendor itself.
- Use a Runes icon when explaining the generic role something plays in a system.
- The official MCP logo identifies Model Context Protocol; `mcp-server` and `mcp-resource` describe architecture roles.
- Do not redraw an official logo in the Runes style or distribute it as part of the Runes MIT icon set.

## Visual grammar

### Geometry

- Canvas: `24 × 24`.
- Default stroke: `1.25`.
- Inspection range: `0.5–3` in `0.25` increments.
- Caps and joins: round.
- Default fill: none.
- Default color: `currentColor`.
- Primary geometry should stay inside the optical boundary `2.5–21.5`.
- Aim for 2–4 main primitives. Add more only when the familiar object or structural concept requires them.
- Keep functional gaps and enclosed negative spaces at least about `1.5` viewBox units at the default stroke.
- Prefer `0°`, `45°`, and `90°` angle families for Core icons. Other angles must support the metaphor.

### Construction

- Build symmetric icons from a declared center axis and mirrored coordinates.
- Use mathematical radial construction for gears, portals, circles, and repeated mechanisms.
- Draw a shared edge once. Nested frames must not double-paint the same boundary.
- A connector terminates once at the visible boundary of its target; it never continues underneath another shape.
- Draw a continuous connection as one path when possible. Avoid overlapping round caps at a junction.
- Arrow shaft, head, and target form one clear direction with one clean meeting point.
- Optical alignment outranks mathematical alignment. Adjust by `0.25–0.5` units when a diagonal, curve, cap, or asymmetric silhouette looks off-center.
- Do not use line wobble, unequal repeated elements, or random offsets to simulate hand-drawn character.

### Apparent weight

A shared numeric stroke does not guarantee shared visual weight.

- Judge total ink density and negative space before changing `stroke-width`.
- Dense intersections, small rings, close parallel strokes, and nested dots appear heavier.
- Simplify internal lines before thinning a whole family.
- Compare neighbors at the same rendered size and color, not only as enlarged source geometry.

### Color grammar

Runes is monochrome-first. Layered color reveals internal structure without turning icons into illustrations.

- **Monochrome:** every stroke uses one color. This is the default for UI and exported SVG.
- **Hierarchical:** secondary and tertiary layers use opacity `0.68` and `0.50` while retaining the primary color.
- **Palette:** primary, secondary, and tertiary layers may use independent colors for larger diagrams and presentations.
- A layer must describe a real role such as boundary, mechanism, core, or signal.
- Attach a layer to its SVG node with `layer()`; do not maintain a separate node-index list.
- Never encode state using color alone.
- Essential graphical information must retain at least `3:1` contrast against its surface.

The initial layered calibration set is `agent`, `memory`, `cloud-agent`, `goal`, `message`, and `plugin`.

### Agent grammar

Agent uses an identity-first construct head with one antenna and an internal core. It is not a mascot, animal, skull, hooded figure, generic human, brain, or device screen.

| Concept | Required distinction |
| --- | --- |
| Agent | rounded construct head, antenna, internal core |
| Model | impersonal processor frame with hardware terminals |
| Agent trio | exact equilateral peers |
| Agent swarm | irregular non-central cluster |
| Orchestrator | explicit governed hub and spokes |
| Handoff | active control moves from one agent to another |
| Agent as Tool | agent core inside callable brackets |
| Parallel Agents | aligned independent execution lanes |

Role variants keep the same Agent identity in a fixed left-hand slot. Planner, Worker, Reviewer, Researcher, and Coding change only the right-hand role signal; the Agent head does not shrink or move between them.

Relationship icons use separate grammar:

- Handoff transfers active control between two agents.
- Subagent points to an isolated child core.
- Delegation dispatches one bounded task.
- Routing fans from a decision point toward destinations.
- Agent Team places peer cores inside one shared boundary.

### Noun and modifier grammar

Compound icons use a stable noun plus a stable modifier. The noun may tune placement optically but may not redefine the modifier.

- `plus` means add or create.
- `minus` means remove from a collection without implying destruction.
- `check` means accepted, recognized, or complete when it modifies a noun.
- A conventional operation such as `type-check` records `validate` explicitly rather than pretending to be a success state.
- Compound names ending in `-plus`, `-minus`, or `-check` require an entry in `src/modifier-contract.js`.

Never scale a complete icon down to become a modifier. Recompose it from fewer, larger primitives.

## Semantic grammar

### Names and concepts

- Public names use the modern meaning: `Search`, `Database`, `Agent`, `Deploy`.
- Lore names remain searchable metadata: `Scry`, `Archive Well`, `Familiar`, `Summon`.
- File names and slugs use kebab case.
- Prefer one canonical icon per meaning.
- Ordinary aliases support search without creating new geometry.
- Deprecated names are explicit and may not collide with canonicals or ordinary aliases.
- Tags are normalized search concepts, not hidden ownership or meaning changes.

### Meaning before geometry count

Do not create two canonicals merely because two names exist. A separate icon needs a useful semantic distinction and a shape that survives at its intended size.

High-confusion groups are machine-readable in `src/semantic-contract.js`. Current groups cover:

- Agent control, coordination, and grouping
- Model lifecycle
- Checkpoint kinds
- Cache and retrieval
- Evidence and source
- Product lifecycle
- Work intent
- Confirmation and completion

Contract members use one concept kind: `entity`, `action`, `state`, `artifact`, `relationship`, `container`, `capability`, `metric`, or `pattern`.

### Search order

Search remains deterministic:

1. exact canonical name or slug;
2. exact alias;
3. deprecated name;
4. exact tag;
5. canonical, alias, and tag prefix or partial match;
6. lore name;
7. cue text.

Exact duplicate cues are forbidden because they erase the operational distinction between canonicals. For example, `copy` describes duplication while `files` describes a collection.

## Failure modes and learned rules

These rules encode failures observed while building and reviewing the library. Keep the rule and check; the original session history is not required.

| Failure | Rule | Check |
| --- | --- | --- |
| Equal stroke values still look uneven | Compare apparent ink and negative space, then simplify dense interiors | 128px and neighbor comparison at 24px |
| Separate round-capped lines form a dark knot | Use one continuous path where possible and stop once at the visible boundary | 128px at stroke `0.5`, `1.25`, and `3` |
| Hidden connector lines darken frames and cores | Never draw a connector underneath its target | Inspect every junction and overlap at 128px |
| Nested rectangles double-paint a shared edge | Draw shared boundaries once | Monochrome 128px inspection |
| A mathematically centered icon looks displaced | Apply a documented `0.25–0.5` optical correction | Compare its visual center with family neighbors |
| A scaled-down full icon collapses as a modifier | Recompose the modifier from fewer, larger primitives | 24px without labels, then 16px in context |
| Too many cues make every icon look generically magical | Keep one structural cue and remove decorative diamonds, sparkles, and particles | Mentally remove the cue; the base meaning must survive |
| A coherent metaphor does not communicate cold | Separate semantic review from craftsmanship review | Label-hidden 24px recognition with nearest neighbors |
| Agent reads as workflow, ritual, or device | Preserve the construct identity before adding action or boundary signals | Compare against Model, Workflow, and Tool |
| Closely related concepts collapse to one shape | Merge or alias them unless a durable pairwise distinction exists | `src/semantic-contract.js` plus 24px comparison |
| Detail survives at 128px but disappears at 16px | Reduce detail rather than shrinking the whole drawing | 128px → 24px → realistic 16px review |
| Color carries the only distinction | Restore a monochrome geometry difference | Monochrome review before layered modes |
| A protocol logo is used as an architecture role | Use the official logo for identity and a Runes icon for the generic role | Review labels and brand provenance |
| Automated checks are treated as a beauty verdict | Keep optical balance and recognition as explicit review gates | Require both automated and visual evidence |

## Icon system

### Source ownership

- Each icon belongs to one bounded family file under `src/icons/`.
- Shared primitives encode genuinely shared geometry, not merely similar-looking coordinates.
- `src/family-manifest.js` owns family composition.
- `src/icon-aliases.js`, `src/modifier-contract.js`, and `src/semantic-contract.js` own their respective public contracts.
- Generated SVG, Iconify JSON, gallery output, and private plugin bundles are outputs, never editable sources.

### Metadata

Every released canonical projects machine-readable metadata:

- canonical slug;
- owning family;
- ordinary aliases;
- deprecated names;
- normalized tags;
- introduced version;
- stability;
- search terms;
- concept kind where a high-confusion contract requires it.

### Renderer

The framework-neutral `renderIconSvg` renderer is the current source for gallery and SVG output:

```js
renderIconSvg(iconBySlug.memory, {
  size: 24,
  strokeWidth: 1.25,
  color: "currentColor",
  colorMode: "hierarchical",
  colors: { secondary: "#7c5ce0", tertiary: "#b477c8" },
});
```

Future framework packages must preserve the same size, stroke, color, class, and accessible-title behavior.

### Deterministic validation

Automated validation enforces repeatable facts only.

- Static validation rejects duplicate slugs, names, cues, and geometry; invalid SVG nodes and attributes; canvas violations; zero-length lines; duplicate nodes; invalid metadata; alias collisions; and missing modifier contracts.
- Render validation uses a pinned Resvg version at `16/1.25`, `24/1.25`, `128/1.25`, `128/0.5`, and `128/3`.
- Practical profiles may not render outside the `24 × 24` canvas.
- Stroke `3` is an ultra-bold silhouette inspection, not a promise that every internal gap remains open.
- The checked-in baseline stores pixel hashes, bounding boxes, ink counts, and connected-component counts.
- A geometry baseline changes only after visual review. Never update it merely to make a failing check green.
- Checked-in negative controls prove that invalid inventory, geometry, metadata, blank output, clipping, and pixel drift are rejected.

## Review and acceptance

### Inspection sequence

1. **128px monochrome:** caps, joins, tangents, intersections, overlaps, repeated geometry, visual weight, and negative space.
2. **24px monochrome without labels:** silhouette, optical balance, nearest-neighbor distinction, and cold recognition.
3. **16px in realistic UI context:** practical recognition with a normal label and surrounding interface density.
4. **64–96px:** diagram and presentation behavior.
5. **Color and stroke range:** Light/Dark, monochrome/hierarchical/palette, and stroke `0.5/1.25/3` as applicable.

High-collision icons require a fresh-context review. Record what the symbol was first understood to mean instead of converting confusion into an assumed pass.

### Inspection sizes

- `16px`: compact UI recognition.
- `20–24px`: canonical UI use.
- `32–48px`: diagrams and content emphasis.
- `64–96px`: presentation graphics.
- `128px`: construction audit and large stage symbols.

### Acceptance checks

1. Every icon is identifiable at 16px with stroke `1.25` on light and dark backgrounds when used with an appropriate label.
2. The set feels related at 24px without every icon carrying the same diamond or fantasy cue.
3. Core icons can replace ordinary UI icons without making the interface feel themed or playful.
4. Agent patterns, loops, execution environments, prompt/tool use, and extension/protocol icons form coherent diagrams without vendor logos.
5. Every SVG uses the shared canvas, caps, joins, default color, and adjustable stroke; layered modes never change geometry.
6. No icon depends on a protected franchise symbol, copied prop, or unlicensed brand mark.
7. Enlarging an icon does not reveal accidental asymmetry, line overlap, uneven repetition, or broken connections.
8. Closely related icons satisfy the distinctions in `src/semantic-contract.js` at 24px or larger.
9. Every released family has both recognition review and craftsmanship review; automated validation cannot substitute for either.
10. Representative interface, architecture, data-flow, agent, and presentation compositions remain coherent when icons are used together.
