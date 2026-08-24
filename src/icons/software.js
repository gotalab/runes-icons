import { c, l, p, poly, rect } from "./primitives.js";

export const softwareIcons = [
  {
    name: "Workflow",
    slug: "workflow",
    groupId: "software",
    loreName: "Ritual",
    cue: "ritual circuit",
    nodes: [c(6, 6, 2), c(18, 6, 2), c(12, 18, 2), p("M8 6h8M17 8l-4 8M7 8l4 8"), p("m12 10 1.5 1.5L12 13l-1.5-1.5L12 10Z")],
  },
  {
    name: "Database",
    slug: "database",
    groupId: "software",
    loreName: "Archive Well",
    cue: "layered archive well",
    nodes: [p("M5 7c0-2 3.1-3.5 7-3.5S19 5 19 7v10c0 2-3.1 3.5-7 3.5S5 19 5 17Z"), p("M5 7c0 2 3.1 3.5 7 3.5S19 9 19 7"), p("M5 12c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5")],
  },
  {
    name: "API",
    slug: "api",
    groupId: "software",
    loreName: "Portal",
    cue: "paired gate",
    nodes: [p("M7.5 18.5A7 7 0 0 1 7.5 5.5"), p("M16.5 5.5a7 7 0 0 1 0 13"), c(5, 12, 1.5), c(19, 12, 1.5), p("m12 3 2 2-2 2-2-2 2-2Z"), l(6.5, 12, 17.5, 12)],
  },
  {
    name: "Git Branch",
    slug: "git-branch",
    groupId: "software",
    loreName: "World Tree",
    cue: "living fork",
    nodes: [c(6, 5, 2), c(18, 7, 2), c(18, 17, 2), c(8, 20, 2), p("M6 7v5c0 3 2 5 5 5h5"), p("M8 18v-3c0-4 2-8 8-8"), p("m12 11 1.5 1.5L12 14l-1.5-1.5L12 11Z")],
  },
  {
    name: "Shield",
    slug: "shield",
    groupId: "software",
    loreName: "Ward",
    cue: "barrier sigil",
    nodes: [p("M12 2.5 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6Z"), p("M12 7v2M12 15v2M8 12h2M14 12h2"), p("m12 9 3 3-3 3-3-3 3-3Z")],
  },
  {
    name: "Deploy",
    slug: "deploy",
    groupId: "software",
    loreName: "Summon",
    cue: "ascending gate",
    nodes: [p("M4 19c0-1.5 3-2.5 8-2.5s8 1 8 2.5-3 2.5-8 2.5-8-1-8-2.5Z"), p("M12 10V3"), poly("8 7 12 3 16 7"), p("m12 11.5 1.5 1.5-1.5 1.5-1.5-1.5 1.5-1.5Z")],
  }
];
