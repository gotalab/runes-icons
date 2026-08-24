import { c, l, layer, p, poly, rect } from "./primitives.js";
import { nestedAgent } from "./agent-primitives.js";

export const cloudExecutionIcons = [
  {
    name: "Local Agent",
    slug: "local-agent",
    groupId: "cloud-execution",
    loreName: "Workshop Agent",
    cue: "nested Agent construct inside a local workspace",
    nodes: [rect(3, 4, 18, 15, 2), l(8, 22, 16, 22), l(12, 19, 12, 22), ...nestedAgent(12, 11.5)],
  },
  {
    name: "Cloud Agent",
    slug: "cloud-agent",
    groupId: "cloud-execution",
    loreName: "Remote Tower",
    cue: "nested Agent construct inside a remote boundary",
    nodes: [
      layer("secondary", p("M6 18h12a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12-2A5 5 0 0 0 6 18Z")),
      p("M12 8v1.5M10 9.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 15v-4A1.5 1.5 0 0 1 10 9.5ZM12 11.6 13.4 13 12 14.4 10.6 13Z"),
      layer("tertiary", c(12, 13, 0.35)),
    ],
  },
  {
    name: "Remote Task",
    slug: "remote-task",
    groupId: "cloud-execution",
    loreName: "Distant Quest",
    cue: "trackable task inside a cloud boundary",
    nodes: [p("M6 18h12a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12-2A5 5 0 0 0 6 18Z"), rect(9, 10.5, 6, 4.5, 1), p("m10.5 12.5 1 1 2-2")],
  },
  {
    name: "Background Run",
    slug: "background-run",
    groupId: "cloud-execution",
    loreName: "Continuing Rite",
    cue: "clocked execution outside the foreground",
    nodes: [c(11, 13, 7.5), l(11, 13, 11, 8.5), l(11, 13, 15, 15), p("M18.5 3.5H21V6")],
  },
  {
    name: "Cloud Sandbox",
    slug: "cloud-sandbox",
    groupId: "cloud-execution",
    loreName: "Remote Ward",
    cue: "isolated square inside a cloud boundary",
    nodes: [p("M6 18h12a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12-2A5 5 0 0 0 6 18Z"), rect(8, 10, 8, 6, 1), p("m12 11 2 2-2 2-2-2 2-2Z")],
  },
  {
    name: "Environment",
    slug: "environment",
    groupId: "cloud-execution",
    loreName: "Runtime Chamber",
    cue: "container with a configured core",
    nodes: [p("M12 3 20 7v10l-8 4-8-4V7Z"), p("M4 7l8 5 8-5M12 12v9"), p("m12 6 2 1-2 1-2-1 2-1Z")],
  },
  {
    name: "Worktree",
    slug: "worktree",
    groupId: "cloud-execution",
    loreName: "Branch Chamber",
    cue: "isolated branch inside a workspace frame",
    nodes: [rect(3, 3, 18, 18, 2), c(7, 7, 1.25), c(17, 9, 1.25), c(17, 16, 1.25), p("M7 8.25v4c0 2 2 3 4 3h4.75M8 12c0-2 2-3 7.75-3")],
  },
  {
    name: "Sync Back",
    slug: "sync-back",
    groupId: "cloud-execution",
    loreName: "Return",
    cue: "remote result descending to local state",
    nodes: [p("M7 11h10a3 3 0 0 0 .5-6 5 5 0 0 0-9-1.5A4 4 0 0 0 7 11Z"), rect(4, 17, 16, 4, 1), poly("9.5 13 12 15.5 14.5 13")],
  }
];
