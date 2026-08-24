import { c, diamond, l, layer, p, poly, rect } from "./primitives.js";
import { nestedAgent } from "./agent-primitives.js";

export const pluginProtocolIcons = [
  {
    name: "Skill",
    slug: "skill",
    groupId: "plugins-protocol",
    loreName: "Grimoire",
    cue: "rune page",
    nodes: [p("M4 4.5c3-1 5-.5 8 1.5v14c-3-2-5-2.5-8-1.5Z"), p("M20 4.5c-3-1-5-.5-8 1.5v14c3-2 5-2.5 8-1.5Z"), p("m8 9 2 2-2 2-2-2 2-2Z")],
  },
  {
    name: "Plugin",
    slug: "plugin",
    groupId: "plugins-protocol",
    loreName: "Reliquary",
    cue: "portable bundle with three components",
    nodes: [rect(3, 4, 18, 16, 3), layer("secondary", rect(5.5, 9, 2.5, 6, 1)), layer("tertiary", rect(10.75, 7, 2.5, 10, 1)), layer("secondary", rect(16, 10, 2.5, 5, 1))],
  },
  {
    name: "Manifest",
    slug: "manifest",
    groupId: "plugins-protocol",
    loreName: "Registry Page",
    cue: "package record with seal",
    nodes: [p("M5 2.5h9l5 5v14H5Z"), p("M14 2.5v5h5"), l(8, 11, 16, 11), l(8, 15, 12, 15), p("m16 14 2 2-2 2-2-2 2-2Z")],
  },
  {
    name: "MCP Server",
    slug: "mcp-server",
    groupId: "plugins-protocol",
    loreName: "Portal Engine",
    cue: "two server tiers around a portal core",
    nodes: [rect(4, 4, 16, 6, 2), rect(4, 14, 16, 6, 2), p("m12 5.5 1.5 1.5-1.5 1.5-1.5-1.5 1.5-1.5Z"), c(8, 17, 0.75), l(11, 17, 17, 17)],
  },
  {
    name: "MCP Resource",
    slug: "mcp-resource",
    groupId: "plugins-protocol",
    loreName: "Context Relic",
    cue: "document held inside a portal",
    nodes: [c(12, 12, 9), p("M8 6h6l3 3v9H8Z"), p("M14 6v3h3"), l(10, 12, 15, 12), l(10, 15, 14, 15)],
  },
  {
    name: "Client Extension",
    slug: "client-extension",
    groupId: "plugins-protocol",
    loreName: "Host Sigil",
    cue: "host frame with attached module",
    nodes: [rect(3, 5, 13, 14, 2), rect(18, 9, 3, 6, 1), p("m9 9 3 3-3 3-3-3 3-3Z")],
  },
  {
    name: "Plugin Install",
    slug: "plugin-install",
    groupId: "plugins-protocol",
    loreName: "Bind Bundle",
    cue: "bundle receiving a descending component",
    nodes: [rect(4, 11, 16, 9, 2), l(12, 2, 12, 9.5), poly("8.5 6 12 9.5 15.5 6"), p("m8 14 2 2-2 2-2-2 2-2Z")],
  },
  {
    name: "Agent Card",
    slug: "agent-card",
    groupId: "plugins-protocol",
    loreName: "Identity Tablet",
    cue: "agent identity and capability record",
    nodes: [rect(3, 5, 18, 14, 2), ...nestedAgent(8, 12), l(13, 9, 18, 9), l(13, 12, 18, 12), l(13, 15, 16, 15)],
  },
  {
    name: "A2A Task",
    slug: "a2a-task",
    groupId: "plugins-protocol",
    loreName: "Shared Quest",
    cue: "stateful task coordinated between two compact Agent constructs",
    nodes: [layer("secondary", rect(2.5, 4, 5, 6, 1.5)), layer("secondary", rect(16.5, 4, 5, 6, 1.5)), p("M5 2.5V4M19 2.5V4"), diamond(5, 7, 1.2), diamond(19, 7, 1.2), layer("secondary", p("M7.5 7c2.5 3 6.5 3 9 0")), l(12, 9.25, 12, 12), rect(9, 12, 6, 9, 1.25), p("m10.5 16.5 1 1 2-2")],
  }
];
