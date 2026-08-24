import { c, l, p, poly, rect } from "./primitives.js";
import { checkMark, minusMark, plusMark } from "./modifier-primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "files-content", loreName, cue, nodes });
const file = (...content) => [p("M5 2.5h9l5 5v14H5Z"), p("M14 2.5v5h5"), ...content];
const clipboard = (...content) => [rect(5, 4, 14, 17, 2), p("M9 5V3h6v2"), ...content];

export const icons = [
  icon("File Plus", "file-plus", "New Page", "file with a centered add modifier", file(...plusMark(12, 14, 3))),
  icon("File Minus", "file-minus", "Remove Page", "file with a centered remove modifier", file(...minusMark(12, 14, 3))),
  icon("File Check", "file-check", "Approved Page", "file with a confirmation mark", file(...checkMark(12, 14, 7, { elbowOffset: -1, drop: 2.5, rise: 2.5 }))),
  icon("File Code", "file-code", "Source Page", "file containing paired code brackets", file(poly("10 11 7.5 14 10 17"), poly("14 11 16.5 14 14 17"))),
  icon("File Text", "file-text", "Written Page", "file with readable text lines", file(l(8, 11, 16, 11), l(8, 14, 16, 14), l(8, 17, 13, 17))),
  icon("File Image", "file-image", "Picture Page", "file with a simple landscape", file(c(13.5, 11.5, 0.65), poly("8.5 17 11 13.5 15.5 17"))),
  icon("File Audio", "file-audio", "Sound Page", "file carrying a clear single musical note", file(c(11, 16.25, 1.75), p("M12.75 16.25V10l3.75 1.5"))),
  icon("File Video", "file-video", "Moving Page", "file with a play frame", file(rect(8, 10, 8, 7, 1), poly("11 12 14 13.5 11 15"))),
  icon("Files", "files", "Pages", "multiple related documents presented as a content collection", [p("M8 3h9l4 4v14H8Z"), p("M17 3v4h4"), p("M7.25 18H4V6h2.5"), l(11, 11, 17, 11), l(11, 15, 17, 15)]),
  icon("Folder Open", "folder-open", "Open Archive", "open folder with aligned rear wall and front leaf", [p("M3 6h7l2 2h9v2"), p("M3 10h18l-2.5 10H5Z")]),
  icon("Folder Plus", "folder-plus", "New Archive", "folder with a clear add modifier", [p("M3 6h7l2 2h9v11H3Z"), ...plusMark(12, 14, 3)]),
  icon("Archive", "archive", "Vault Box", "storage box with separated labeled lid", [rect(4, 9.5, 16, 11.5, 2), rect(3, 3, 18, 5, 1), l(9, 13, 15, 13)]),
  icon("Clipboard", "clipboard", "Carried Record", "board with a top clasp and lines", clipboard(l(8, 10, 16, 10), l(8, 14, 16, 14), l(8, 18, 13, 18))),
  icon("Clipboard Check", "clipboard-check", "Verified Record", "clipboard with an accepted mark", clipboard(...checkMark(12.25, 14, 7.5, { elbowOffset: -1.25, drop: 2.5, rise: 3 }))),
  icon("Paperclip", "paperclip", "Fastener", "single continuous attachment loop", [p("m9 17 7.5-7.5a3 3 0 0 0-4.2-4.2L4.8 12.8a5 5 0 0 0 7.1 7.1l7-7a2 2 0 0 0-2.8-2.8l-7 7")]),
  icon("Import", "import", "Bring Within", "arrow entering an open application boundary", [p("M12 4H4v16h8"), p("M20 12H9"), poly("12 9 9 12 12 15")]),
  icon("Export", "export", "Send Beyond", "arrow leaving an open application boundary", [p("M12 4H4v16h8"), p("M9 12h11"), poly("17 9 20 12 17 15")]),
  icon("Scan", "scan", "Read Mark", "four scan corners around one reading beam", [p("M8 4H4v4M16 4h4v4M20 16v4h-4M8 20H4v-4"), l(7, 12, 17, 12)]),
  icon("QR Code", "qr-code", "Matrix Seal", "three locator squares and a sparse matrix", [rect(3, 3, 6, 6, 1), rect(15, 3, 6, 6, 1), rect(3, 15, 6, 6, 1), p("M13 13h3v3h-3ZM18 13h3M13 18h3v3M18 18h3v3")]),
  icon("Book Open", "book-open", "Open Tome", "two readable pages separated at the gutter", [p("M3 5h5a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H3Z"), p("M21 5h-5a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h5Z")]),
];
