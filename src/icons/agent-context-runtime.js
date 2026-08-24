import { c, diamond, l, layer, p, poly, rect } from "./primitives.js";
import { roleAgent } from "./agent-primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "agent-context-runtime", loreName, cue, nodes });

export const icons = [
  icon("Context Injection", "context-injection", "Memory Ingress", "one external packet admitted into a bounded context chamber", [
    layer("secondary", rect(2.5, 9.5, 3.5, 5, 1)),
    poly("8.75 10.5 10.25 12 8.75 13.5"),
    layer("secondary", rect(13.25, 4, 8.25, 16, 2)),
    p("M16 9h2.75M16 15h2.75"),
  ]),
  icon("Context Isolation", "context-isolation", "Separated Chambers", "two context domains stopped by one explicit isolation ward", [
    layer("secondary", rect(3, 5, 6, 14, 1.5)),
    layer("secondary", rect(15, 5, 6, 14, 1.5)),
    l(12, 3, 12, 21),
    p("M5.75 12h.5M17.75 12h.5"),
  ]),
  icon("Conversation State", "conversation-state", "Carried Dialogue", "conversation turns carried with one explicit state marker", [
    layer("secondary", rect(2.5, 4, 6, 6, 2)),
    layer("secondary", rect(15.5, 14, 6, 6, 2)),
    p("M5.25 7h.5M18.25 17h.5"),
    layer("secondary", p("M9.75 7h1M13.25 17h1")),
    layer("tertiary", p("M12 3v6.5M12 14.5V21")),
    diamond(12, 12, 1.25),
  ]),
  icon("Run Context", "run-context", "Execution Chamber", "execution-local metadata and dependencies inside one run boundary", [
    layer("secondary", rect(5, 5, 14, 14, 3)),
    layer("secondary", p("M2.5 9h1.25M14 2.5v1.25M9 20.25v1.25")),
    poly("9 8 13 12 9 16"),
  ]),
  icon("Context Filter", "context-filter", "Admission Sieve", "a context boundary admitting only selected content through a funnel", [
    layer("secondary", rect(3.5, 3.5, 17, 17, 2)),
    p("M7 7.5h10l-3.5 4.5v4h-3v-4Z"),
  ]),
  icon("Context Overflow", "context-overflow", "Limit Spill", "ordered context content exceeding one explicit capacity boundary", [
    layer("secondary", rect(3.5, 3.5, 13, 14, 2)),
    p("M6.25 7h7.5M6.25 11h7.5M6.25 14.75h7.5"),
    layer("tertiary", l(6.25, 20.5, 13.75, 20.5)),
  ]),
  icon("Agent Budget", "agent-budget", "Bound Allowance", "construct agent paired with a capped allowance meter", [
    ...roleAgent(),
    layer("secondary", p("M14 10.5v3M21 10.5v3M14 12h2.7M19.3 12H21")),
    c(18, 12, 1.3),
  ]),
];
