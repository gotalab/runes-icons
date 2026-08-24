import { c, l, layer, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "security-release", loreName, cue, nodes });

export const icons = [
  icon("Branch Protection", "branch-protection", "Guarded Branch", "one source history passing through an explicit lock gate before it can branch", [c(4, 12, 1.25), l(5.25, 12, 8.5, 12), layer("secondary", p("M10 9V7.5a1.5 1.5 0 0 1 3 0V9")), layer("secondary", rect(8.5, 9, 6, 6, 1)), layer("secondary", c(11.5, 12, 0.5)), c(20, 8, 1.25), c(20, 16, 1.25), p("M14.5 12h1c1.5 0 1.5-4 3.25-4M14.5 12h1c1.5 0 1.5 4 3.25 4")]),
  icon("Key", "key", "Access Key", "conventional mechanical key with one open bow and one practical tooth", [c(7, 12, 3), p("M10 12h6v3h2v-3h3")]),
  icon("Lock", "lock", "Closed Ward", "closed shackle and bounded body with one centered keyhole", [p("M8 10V7a4 4 0 0 1 8 0v3"), rect(5, 10, 14, 11, 2), c(12, 15, 1), l(12, 16, 12, 18)]),
  icon("Unlock", "unlock", "Open Ward", "matching lock body with one visibly open shackle", [p("M8 10V7a4 4 0 0 1 7-2"), rect(5, 10, 14, 11, 2), c(12, 15, 1), l(12, 16, 12, 18)]),
  icon("Fingerprint", "fingerprint", "Identity Ridges", "three broad nested biometric ridges with a distinct central trace", [p("M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"), p("M7.5 18v-6a4.5 4.5 0 0 1 9 0v5"), p("M10.5 20v-8a1.5 1.5 0 0 1 3 0v6")]),
  icon("Identity", "identity", "Named Principal", "one person silhouette inside a deliberately broken subject seal", [p("M7 4.5A8 8 0 0 0 4.5 8M17 4.5A8 8 0 0 1 19.5 8M4.5 16a8 8 0 0 0 15 0"), c(12, 8.25, 2), p("M8 17c.75-2.25 2-3.25 4-3.25s3.25 1 4 3.25")]),
  icon("Permission", "permission", "Granted Passage", "one accepted capability pass held in the opening between two gate halves", [p("M7 4H4v16h3M17 4h3v16h-3"), layer("secondary", rect(9.5, 9, 5, 6, 1.5)), layer("secondary", poly("10.75 12 11.75 13 13 11"))]),
  icon("Secret", "secret", "Hidden Value", "protected value field containing three conventional masked segments", [rect(3, 6, 18, 12, 2), c(7, 12, 1), c(12, 12, 1), c(17, 12, 1)]),
  icon("Audit Log", "audit-log", "Witness Ledger", "bounded chronological ledger with one spine and three ordered event rows", [rect(4, 3, 16, 18, 2), l(8, 7, 8, 17), c(8, 8, 0.75), c(8, 12, 0.75), c(8, 16, 0.75), l(11.5, 8, 17.5, 8), l(11.5, 12, 16.5, 12), l(11.5, 16, 17.5, 16)]),
  icon("Policy", "policy", "Bound Rules", "policy document grouping three enforceable clauses under one rule rail", [p("M5 3h10l4 4v14H5Z"), p("M15 3v4h4"), p("M9 9H7v8h2"), l(11.75, 10, 16.5, 10), l(11.75, 13, 16.5, 13), l(11.75, 16, 16.5, 16)]),
  icon("Input Guardrail", "input-guardrail", "Entry Ward", "incoming request meeting a guard boundary before the protected subject", [l(3, 12, 6.5, 12), poly("4.5 10 6.5 12 4.5 14"), layer("secondary", p("M9.5 6H8v12h1.5")), rect(12.25, 8, 8.25, 8, 2)]),
  icon("Output Guardrail", "output-guardrail", "Exit Ward", "protected subject meeting a guard boundary before final output leaves", [rect(3.5, 8, 8.25, 8, 2), layer("secondary", p("M14.5 6H16v12h-1.5")), l(17.5, 12, 21, 12), poly("19 10 21 12 19 14")]),
  icon("Tool Guardrail", "tool-guardrail", "Invocation Ward", "tool invocation held between two guard boundary halves", [layer("secondary", p("M8 4H4v16h4M16 4h4v16h-4")), p("M13.5 7a3 3 0 0 0-2 4l-4 4 2 2 4-4a3 3 0 0 0 4-2l-2 1-2-2Z")]),
];
