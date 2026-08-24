import { c, diamond, l, layer, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "protocol-extensions", loreName, cue, nodes });

export const icons = [
  icon("MCP Host", "mcp-host", "Host Chamber", "one enclosing host managing two open-port client bays through a shared host spine", [layer("secondary", rect(3, 4, 18, 16, 2)), p("M9.5 7H6v3h3.5v-.5M9.5 7v.5M9.5 14H6v3h3.5v-.5M9.5 14v.5"), p("M9.5 8.5h5.75M9.5 15.5h5.75M15.25 7v10")]),
  icon("MCP Client", "mcp-client", "Protocol Adapter", "one host-side bracket facing an open-port adapter and server socket", [layer("secondary", p("M5.25 6H3.5v12h1.75")), p("M15 8H8v8h7v-2.5M15 8v2.5"), p("M15 12h5M20 10h1.5v4H20")]),
  icon("MCP App", "mcp-app", "Embedded Pane", "interactive protocol pane with one content surface, status rail, and quiet portal tab", [layer("secondary", rect(3, 4, 18, 16, 2)), rect(5.75, 7, 12.5, 6, 1.5), l(7, 16, 13, 16), diamond(17, 16, 0.75)]),
  icon("MCP Extension", "mcp-extension", "Protocol Annex", "open protocol ring bridged through one open port to a clearly separated capability module", [layer("secondary", p("M16.5 8A8 8 0 1 0 16.5 16")), l(15.5, 12, 18.5, 12), p("M18.5 11V10H21v4h-2.5v-1")]),
  icon("MCP Task", "mcp-task", "Protocol Work Handle", "open protocol endpoint feeding one open-port asynchronous task card", [layer("secondary", p("M6 9H3.5v6H6")), l(6, 12, 11.5, 12), layer("secondary", p("M11.5 10V6h9v12h-9v-4")), c(15, 9.25, 0.5), p("M14 13h3.75M14 16h3.5")]),
  icon("MCP Discovery", "mcp-discovery", "Capability Scan", "open protocol ring beside a search lens focusing one of two equal capability sockets", [layer("secondary", p("M6.5 8.5a3.5 3.5 0 1 0 0 7")), c(13, 12, 3.5), l(15.5, 14.5, 17.5, 16.5), c(20, 7, 1), c(20, 17, 1)]),
  icon("Resource Template", "resource-template", "Parameterized Relic", "folded resource sheet dominated by two open parameter brackets, a URI rail, and a small protocol port", [layer("secondary", p("M4 3h9l4 4v14H4Z")), p("M13 3v4h4"), p("M9 9H6.75v4H9M11.75 9H14v4h-2.25"), l(6.75, 17, 13.5, 17), layer("tertiary", p("M19.75 15H21v4h-1.25"))]),
  icon("Connector", "connector", "Joined Terminals", "two open terminal sockets joined by one continuous bridge and structural clasp", [layer("secondary", p("M5.5 9H3v6h2.5M18.5 9H21v6h-2.5")), p("M5.5 12H10l2-2 2 2h4.5")]),
  icon("Hook", "hook", "Lifecycle Callback", "one lifecycle rail and returning callback path terminating in an open socket", [layer("secondary", p("M3 6.5H21M12 6.5v7a4 4 0 0 1-4 4H5.25")), p("M5.25 15H3v5h2.25")]),
  icon("Slash Command", "slash-command", "Command Entry", "user-invoked slash entry field with a separate execution chevron", [layer("secondary", rect(3, 6, 18, 12, 2)), l(7.5, 15, 10, 9), poly("14 9.5 16.5 12 14 14.5")]),
  icon("Plugin Marketplace", "plugin-marketplace", "Extension Storefront", "compact storefront containing two equal well-separated package tiles", [layer("secondary", p("M4 8 6 4h12l2 4v12H4Z")), rect(7, 11, 3, 6, 1), rect(14, 11, 3, 6, 1)]),
  icon("Plugin Update", "plugin-update", "Version Renewal", "one compact installed package card receiving a separate continuous two-wing version arrow", [layer("secondary", rect(4, 8, 10, 11, 2)), p("M7 12h2M7 15h4.5"), layer("tertiary", p("M9 5C13 2.5 16 3.5 17 6.5L19 8 17 9.75"))]),
  icon("Deferred Tool", "deferred-tool", "Latched Mechanism", "recognizable wrench held beside an open capability latch", [p("M12 4a4.5 4.5 0 0 0-3.5 6.5L3 16l3 3 5.5-5.5A4.5 4.5 0 0 0 17 9l-2.5.75-3-3Z"), layer("secondary", p("M18.5 5H21v14h-2.5"))]),
  icon("Tool Search", "tool-search", "Sought Mechanism", "one continuous magnifier containing a single continuous reduced wrench cue", [layer("secondary", p("M13.743 13.743A6 6 0 0 1 5.257 5.257A6 6 0 0 1 13.743 13.743L20 20")), poly("7 12 11 8 10.25 6.75 12.5 8")]),
  icon("Tool Choice", "tool-choice", "Selected Mechanism", "compact open-jaw wrench beside two large radio options with one visibly selected", [p("M10.5 4a4 4 0 0 0-3 6L3 14.5l3 3 4.5-4.5A4 4 0 0 0 16 9.5l-2.25.75-2.5-2.5Z"), layer("secondary", c(19.25, 7, 1.5)), layer("secondary", c(19.25, 17, 1.5)), c(19.25, 17, 0.5)]),
];
