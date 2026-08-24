import { c, l, p } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "location-navigation", loreName, cue, nodes });

export const icons = [
  icon("Map Pin", "map-pin", "Place Marker", "familiar place pin with one centered location point", [p("M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"), c(12, 9, 2)]),
  icon("Map", "map", "Folded Territory", "three-panel folded map with each shared seam drawn once", [p("M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z"), l(9, 3, 9, 18), l(15, 6, 15, 21)]),
  icon("Globe", "globe", "World Sphere", "world circle with sparse latitude and longitude guides", [c(12, 12, 9), p("M3.75 9h16.5M3.75 15h16.5M12 3c-3 3-4 6-4 9s1 6 4 9M12 3c3 3 4 6 4 9s-1 6-4 9")]),
  icon("Compass", "compass", "Bearing Dial", "round bearing dial carrying one asymmetric directional needle", [c(12, 12, 9), p("M16 8 13.5 13.5 8 16l2.5-5.5Z")]),
  icon("Navigation", "navigation", "Heading", "upright heading pointer with a distinct trailing axis", [p("M12 3 17 15 12 13 7 15Z"), l(12, 13, 12, 21)]),
  icon("Locate", "locate", "Position Fix", "centered position ring with four detached crosshair guides", [c(12, 12, 3), c(12, 12, 0.75), p("M12 3v4M12 17v4M3 12h4M17 12h4")]),
];
