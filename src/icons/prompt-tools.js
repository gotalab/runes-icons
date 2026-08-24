import { c, l, layer, p, poly, rect } from "./primitives.js";

export const promptToolIcons = [
  {
    name: "Artifact",
    slug: "artifact",
    groupId: "prompt-tools",
    loreName: "Relic",
    cue: "crafted magical relic",
    nodes: [p("m5 19 7.5-7.5"), p("m13 7 2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"), p("M4 20 2.5 18.5 5 16l3 3-2.5 2.5Z")],
  },
  {
    name: "Message",
    slug: "message",
    groupId: "prompt-tools",
    loreName: "Dispatch",
    cue: "marked dispatch bubble",
    nodes: [layer("secondary", p("M4 5h16v12H9l-5 4V5Z")), poly("8 9 11 12 8 15"), layer("tertiary", p("m15 10 2 2-2 2-2-2 2-2Z"))],
  },
  {
    name: "Instruction",
    slug: "instruction",
    groupId: "prompt-tools",
    loreName: "Directive",
    cue: "authoritative page with a top rune",
    nodes: [rect(4, 3, 16, 18, 2), p("m12 5 2 2-2 2-2-2 2-2Z"), l(8, 12, 16, 12), l(8, 15, 16, 15), l(8, 18, 13, 18)],
  },
  {
    name: "Prompt Template",
    slug: "prompt-template",
    groupId: "prompt-tools",
    loreName: "Incantation Form",
    cue: "reusable frame with a variable slot",
    nodes: [rect(3, 4, 18, 16, 2), p("M7 8H5v8h2"), p("M17 8h2v8h-2"), p("m12 9 3 3-3 3-3-3 3-3Z")],
  },
  {
    name: "Tool",
    slug: "tool",
    groupId: "prompt-tools",
    loreName: "Mechanism",
    cue: "practical wrench with a rune pivot",
    nodes: [p("M15 3a5 5 0 0 0-4 7l-7 7 3 3 7-7a5 5 0 0 0 7-4l-3 1-3-3Z")],
  },
  {
    name: "Tool Call",
    slug: "tool-call",
    groupId: "prompt-tools",
    loreName: "Invoke",
    cue: "input entering an executable module",
    nodes: [rect(8, 5, 12, 14, 2), p("m14 9 3 3-3 3-3-3 3-3Z"), l(2, 12, 6.5, 12), poly("4 9.5 6.5 12 4 14.5")],
  },
  {
    name: "Tool Result",
    slug: "tool-result",
    groupId: "prompt-tools",
    loreName: "Return",
    cue: "output leaving an executable module",
    nodes: [rect(4, 5, 13, 14, 2), p("m10.5 9 3 3-3 3-3-3 3-3Z"), l(17, 12, 22, 12), poly("19.5 9.5 22 12 19.5 14.5")],
  },
  {
    name: "Computer Use",
    slug: "computer-use",
    groupId: "prompt-tools",
    loreName: "Operated Surface",
    cue: "pointer acting directly inside a computer surface",
    nodes: [layer("secondary", rect(3.5, 4, 17, 14, 2)), p("M8 7v7l2-2 2.25 3 1.75-1.25-2-2.75H15Z"), layer("secondary", p("M12 18v3M8 21h8"))],
  }
];

export const icons = promptToolIcons;
