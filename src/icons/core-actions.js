import { c, l, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "core-actions", loreName, cue, nodes });

export const icons = [
  icon("Arrow Left", "arrow-left", "Return", "direct backward direction", [p("M19 12H5"), poly("10 7 5 12 10 17")]),
  icon("Arrow Up", "arrow-up", "Ascend", "direct upward direction", [p("M12 19V5"), poly("7 10 12 5 17 10")]),
  icon("Arrow Down", "arrow-down", "Descend", "direct downward direction", [p("M12 5v14"), poly("7 14 12 19 17 14")]),
  icon("Chevron Left", "chevron-left", "Previous", "compact previous indicator", [poly("15 6 9 12 15 18")]),
  icon("Chevron Right", "chevron-right", "Next", "compact next indicator", [poly("9 6 15 12 9 18")]),
  icon("Chevron Up", "chevron-up", "Rise", "compact upward indicator", [poly("6 15 12 9 18 15")]),
  icon("Chevron Down", "chevron-down", "Lower", "compact downward indicator", [poly("6 9 12 15 18 9")]),
  icon("Minus", "minus", "Diminish", "single subtraction stroke", [l(5, 12, 19, 12)]),
  icon("X", "x", "Close", "unambiguous close mark", [l(6, 6, 18, 18), l(18, 6, 6, 18)]),
  icon("Save", "save", "Preserve", "familiar disk with stored field", [p("M4 3.5h13l3 3v14H4Z"), p("M8 5v4.5h8V5"), rect(8, 14, 8, 6.5, 1)]),
  icon("Edit", "edit", "Revise", "practical pencil with a clean tip", [p("m4 20 4.5-1 10-10-3.5-3.5-10 10Z"), l(13.8, 6.7, 17.3, 10.2)]),
  icon("Copy", "copy", "Duplicate", "one source document duplicated into a second offset document", [rect(8, 8, 12, 12, 2), p("M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h.5")]),
  icon("Trash", "trash", "Discard", "bin with separated lid and body", [p("M4 6h16M9 6V4h6v2"), p("M7.5 7.5l.8 13h7.4l.8-13"), l(10, 10, 10.5, 17), l(14, 10, 13.5, 17)]),
  icon("Download", "download", "Receive", "downward transfer into a tray", [p("M12 3v11"), poly("8 10 12 14 16 10"), p("M4 17v3h16v-3")]),
  icon("Upload", "upload", "Send Up", "upward transfer out of a tray", [p("M12 14V3"), poly("8 7 12 3 16 7"), p("M4 17v3h16v-3")]),
  icon("Refresh", "refresh", "Renew", "two balanced return arcs", [p("M20 7v5h-5"), p("M4 17v-5h5"), p("M18.5 9A7 7 0 0 0 6 7l-2 3"), p("M5.5 15A7 7 0 0 0 18 17l2-3")]),
  icon("Undo", "undo", "Rewind", "left return into prior state", [p("M9 7 4 12h9a6 6 0 0 1 6 6"), l(4, 12, 9, 17)]),
  icon("Redo", "redo", "Reapply", "right return into next state", [p("M15 7 20 12h-9a6 6 0 0 0-6 6"), l(20, 12, 15, 17)]),
  icon("Filter", "filter", "Sieve", "familiar funnel with output stem", [p("M3 5h18l-7 8v6l-4 2v-8Z")]),
  icon("External Link", "external-link", "Beyond", "outbound arrow leaving a frame", [p("M13 5H5v14h14v-8"), poly("14 5 19 5 19 10"), l(11, 13, 17.5, 6.5)]),
  icon("Share", "share", "Relay", "one source node distributing toward two explicit recipients", [c(5, 12, 1.5), c(18, 6, 1.5), c(18, 18, 1.5), l(6.5, 11.3, 16.5, 6.7), l(6.5, 12.7, 16.5, 17.3)]),
  icon("Log In", "log-in", "Enter", "rightward account entry arrow meeting one fixed door slab", [p("M14 4h6v16h-6"), l(4, 12, 15, 12), poly("12 9 15 12 12 15")]),
  icon("Log Out", "log-out", "Depart", "leftward account exit arrow leaving one fixed door slab", [p("M14 4h6v16h-6"), l(4, 12, 15, 12), poly("7 9 4 12 7 15")]),
  icon("Zoom In", "zoom-in", "Closer View", "conventional view lens with one centered add mark", [c(10, 10, 6), l(14.25, 14.25, 20, 20), l(7, 10, 13, 10), l(10, 7, 10, 13)]),
  icon("Zoom Out", "zoom-out", "Wider View", "conventional view lens with one centered remove mark", [c(10, 10, 6), l(14.25, 14.25, 20, 20), l(7, 10, 13, 10)]),
  icon("Move", "move", "Reposition", "four equal directional rails leaving one shared center", [p("M12 3v18M3 12h18"), poly("9 6 12 3 15 6"), poly("9 18 12 21 15 18"), poly("6 9 3 12 6 15"), poly("18 9 21 12 18 15")]),
];
