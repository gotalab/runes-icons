import { c, diamond, l, layer, p, poly, rect } from "./primitives.js";
import { nestedAgent, roleAgent } from "./agent-primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "agent-roles", loreName, cue, nodes });

export const icons = [
  icon("Planner Agent", "planner-agent", "Quest Planner", "construct agent composing an ordered route", [
    ...roleAgent(),
    c(14, 7, 1),
    c(17.5, 12, 1),
    c(21, 17, 1),
    l(14.7, 7.7, 16.8, 11.2),
    l(18.2, 12.8, 20.3, 16.3),
  ]),
  icon("Worker Agent", "worker-agent", "Quest Worker", "construct agent acting on one bounded task", [
    ...roleAgent(),
    layer("secondary", rect(14, 7, 7.5, 10, 1.5)),
    poly("15.5 12 17 13.5 20 10"),
  ]),
  icon("Reviewer Agent", "reviewer-agent", "Quest Reviewer", "construct agent paired with one accepted review mark", [...roleAgent(), layer("secondary", c(18, 12, 3.5)), poly("16.2 12 17.5 13.3 20 10.5")]),
  icon("Researcher Agent", "researcher-agent", "Lore Seeker", "construct agent paired with one clear search lens", [...roleAgent(), layer("secondary", c(17.5, 10.5, 3)), l(19.6, 12.6, 21.5, 14.5)]),
  icon("Coding Agent", "coding-agent", "Rune Coder", "construct agent paired with balanced code brackets", [...roleAgent(), layer("secondary", poly("17 8 14 12 17 16")), layer("secondary", poly("18.5 8 21.5 12 18.5 16"))]),
  icon("Browser Agent", "browser-agent", "Window Walker", "construct agent inside a browser surface", [layer("secondary", rect(3.5, 4, 17, 16, 2)), layer("secondary", l(4.25, 8, 19.75, 8)), layer("secondary", c(6, 6, 0.5)), ...nestedAgent(12, 14)]),
  icon("Realtime Agent", "realtime-agent", "Living Channel", "construct agent inside two live signal arcs", [...roleAgent(12, 12), layer("secondary", p("M4.5 7a8 8 0 0 0 0 10M19.5 7a8 8 0 0 1 0 10"))]),
  icon("Agent Team", "agent-team", "Fellowship", "three peer agent cores inside one shared team boundary", [layer("secondary", rect(3, 6, 18, 12, 3)), layer("secondary", p("M7 8.5v1M12 8.5v1M17 8.5v1")), diamond(7, 12.5, 1.5), diamond(12, 12.5, 1.5), diamond(17, 12.5, 1.5)]),
  icon("Subagent", "subagent", "Inner Familiar", "parent construct agent linked through a branch node to a smaller isolated child agent", [
    ...roleAgent(),
    l(11.5, 12, 13.75, 12),
    c(14.5, 12, 0.75),
    layer("secondary", p("M19 7.5V9")),
    layer("secondary", rect(16.5, 9, 5, 6, 1.5)),
    diamond(19, 12, 1.4),
  ]),
  icon("Delegation", "delegation", "Entrusted Quest", "construct agent dispatching one bounded task", [...roleAgent(), l(11.5, 12, 14, 12), poly("12.8 10.8 14 12 12.8 13.2"), layer("secondary", rect(15.5, 8, 6, 8, 1.25)), p("M17 11h3M17 13.5h2")]),
  icon("Routing", "routing", "Path Choice", "construct agent selecting specialized destinations", [...roleAgent(), l(11.5, 12, 12.75, 12), layer("secondary", c(14, 12, 1.25)), l(14.88, 11.12, 19.6, 6.9), l(15.25, 12, 19.5, 12), l(14.88, 12.88, 19.6, 17.1), c(20.5, 6, 1), c(20.5, 12, 1), c(20.5, 18, 1)]),
  icon("Agent Session", "agent-session", "Audience Record", "construct agent inside a persisted conversation session", [layer("secondary", rect(3.5, 4, 17, 16, 2)), layer("secondary", p("M6.5 8h3.5M6.5 16h3.5")), ...nestedAgent(15, 12)]),
  icon("Agent State", "agent-state", "Bound State", "construct agent captured with resumable state markers", [...nestedAgent(12, 12), layer("secondary", c(12, 12, 8)), layer("secondary", c(12, 3.25, 0.7)), layer("secondary", c(20.75, 12, 0.7)), layer("secondary", c(12, 20.75, 0.7)), layer("secondary", c(3.25, 12, 0.7))]),
  icon("Plan", "plan", "Quest Plan", "ordered steps joined by an intended path", [c(5, 6, 1.5), c(12, 12, 1.5), c(19, 18, 1.5), p("M6.5 6h3a2.5 2.5 0 0 1 2.5 2.5v2M13.5 12h3a2.5 2.5 0 0 1 2.5 2.5v2")]),
  icon("Task", "task", "Quest", "one bounded unit with completion field", [rect(4.5, 3.5, 15, 17, 2), rect(7, 7, 4, 4, 1), l(13, 9, 17, 9), l(7, 15, 17, 15), l(7, 18, 14, 18)]),
  icon("Task Queue", "task-queue", "Quest Line", "ordered task cards waiting for execution", [rect(6, 3, 14, 5, 1), rect(4.5, 9.5, 14, 5, 1), rect(3, 16, 14, 5, 1), l(9, 5.5, 17, 5.5), l(7.5, 12, 15.5, 12), l(6, 18.5, 14, 18.5)]),
  icon("Trace", "trace", "Run Chronicle", "execution events connected on a timeline", [p("M6 3v1.5M6 7.5v3M6 13.5v3M6 19.5V21"), c(6, 6, 1.5), c(6, 12, 1.5), c(6, 18, 1.5), l(7.5, 6, 16, 6), l(7.5, 12, 19.5, 12), l(7.5, 18, 14, 18)]),
  icon("Benchmark", "benchmark", "Trial Standard", "results compared against a fixed baseline", [l(3.5, 20.5, 20.5, 20.5), rect(5, 11, 4, 8, 1), rect(10.75, 6, 4, 13, 1), rect(16.5, 9, 4, 10, 1), layer("secondary", l(3.5, 4.5, 20.5, 4.5))]),
];
