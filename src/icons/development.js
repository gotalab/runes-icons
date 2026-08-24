import { c, l, layer, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "development", loreName, cue, nodes });

export const icons = [
  icon("Code", "code", "Source Runes", "bare symmetric programming delimiters without a file boundary", [poly("9 4 6.5 4 6.5 9 4.5 12 6.5 15 6.5 20 9 20"), poly("15 4 17.5 4 17.5 9 19.5 12 17.5 15 17.5 20 15 20")]),
  icon("Terminal", "terminal", "Command Chamber", "interactive terminal window with a deliberately inset title rail, prompt, and cursor", [layer("secondary", rect(3, 4, 18, 16, 2)), layer("secondary", l(5.75, 8, 18.25, 8)), poly("7 11 9.5 13.5 7 16"), l(12.5, 16, 17, 16)]),
  icon("Command", "command", "Single Invocation", "one executable command mark without an interactive surface", [poly("5 7 10 12 5 17"), l(13, 17, 19, 17)]),
  icon("Bug", "bug", "Fault Beetle", "symmetric software defect with a compact insect silhouette", [layer("secondary", rect(8.5, 6.5, 7, 11, 3.5)), p("M10 7 7.25 3.75M14 7l2.75-3.25M8.5 9.25 4.5 7M8.5 14.75 4.5 17M15.5 9.25l4-2.25M15.5 14.75l4 2.25")]),
  icon("Package", "package", "Bound Parcel", "folded parcel silhouette carrying one independent shipping label", [layer("secondary", p("M4 8l4-3h8l4 3v12H4Z")), rect(9, 11, 6, 4, 1)]),
  icon("Server", "server", "Compute Tower", "two conventional compute bays inside one host boundary", [layer("secondary", rect(4, 4, 16, 16, 2)), l(6.75, 12, 17.25, 12), c(7, 8, 0.5), c(7, 16, 0.5), p("M10.25 8h7M10.25 16h7")]),
  icon("Cloud", "cloud", "Remote Boundary", "shared conventional cloud-family boundary with intentional lobe shoulders and no interior modifier", [p("M6 18h12a4 4 0 0 0 .5-8 6.5 6.5 0 0 0-12-2A5 5 0 0 0 6 18Z")]),
  icon("Container", "container", "Runtime Vessel", "corner-defined isolation boundary containing one minimal process invocation", [layer("secondary", p("M8 4H4v4M16 4h4v4M4 16v4h4M20 16v4h-4")), poly("7.5 9.5 10 12 7.5 14.5"), l(13, 14.5, 16.5, 14.5)]),
];
