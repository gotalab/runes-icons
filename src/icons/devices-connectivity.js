import { c, l, p, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "devices-connectivity", loreName, cue, nodes });

export const icons = [
  icon("Laptop", "laptop", "Portable Surface", "familiar portable screen above a deliberately separated keyboard base", [rect(4, 5, 16, 11, 2), p("M3 19.5h18l-1 2H4Z")]),
  icon("Keyboard", "keyboard", "Input Board", "bounded keyboard with two sparse key rows and one space rail", [rect(3, 6, 18, 12, 2), p("M6 10h1M9 10h1M12 10h1M15 10h1M18 10h.25M6 13h1M9 13h1M12 13h1M15 13h1M18 13h.25"), l(8, 16, 16, 16)]),
  icon("Mouse", "mouse", "Pointer Vessel", "conventional rounded mouse with a divided upper control and centered wheel", [rect(7, 3, 10, 18, 5), l(12, 3, 12, 9), l(8.5, 10, 15.5, 10), l(12, 5, 12, 7)]),
  icon("Wi-Fi", "wifi", "Wireless Reach", "three centered generic wireless signal arcs above one receiver point", [p("M4 10a11 11 0 0 1 16 0M7 13a7 7 0 0 1 10 0M10 16a3 3 0 0 1 4 0"), c(12, 19, 0.75)]),
  icon("Device Pairing", "device-pairing", "Paired Surfaces", "two neutral devices joined by one explicit non-branded pairing link", [rect(3, 7, 6, 10, 1.5), rect(15, 7, 6, 10, 1.5), c(11, 12, 0.75), c(13, 12, 0.75), l(11.75, 12, 12.25, 12)]),
  icon("Battery", "battery", "Stored Charge", "familiar battery body, terminal, and one visible charge bar", [rect(3, 7, 16, 10, 2), p("M19 10h2v4h-2"), l(7, 10, 7, 14)]),
  icon("Power", "power", "Wake Current", "standard open power ring with one centered activation stem", [l(12, 3, 12, 11), p("M7 6a8 8 0 1 0 10 0")]),
  icon("Plug", "plug", "Current Link", "two-prong plug flowing through one continuous body into its cord", [p("M9 3v5M15 3v5M7 8v3a5 5 0 0 0 10 0V8M12 16v5")]),
];
