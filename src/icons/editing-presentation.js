import { c, l, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "editing-presentation", loreName, cue, nodes });

export const icons = [
  icon("Print", "print", "Impress", "printer with separated input and output paper", [p("M6 8V3h12v5"), p("M4 18v-6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2V18h-3M7 18H4"), rect(7, 14, 10, 7, 1), c(17, 12, 0.6), l(9, 17, 15, 17), l(9, 19, 14, 19)]),
  icon("Presentation", "presentation", "Lecture Board", "presentation board on a stand with one shared leg junction", [rect(3, 3, 18, 13, 2), l(12, 16, 12, 19), poly("8 21 12 19 16 21"), p("M7 12V9l3 1 3-4 4 3")]),
  icon("Projector", "projector", "Light Engine", "standing projector with lens and three deliberately separated light rays", [rect(3, 8, 15, 9, 2), c(13.5, 12.5, 2.5), c(6.5, 12.5, 0.6), l(7, 17, 6, 20), l(14, 17, 15, 20), l(19.5, 10, 21.5, 8), l(19.5, 12.5, 21.5, 12.5), l(19.5, 15, 21.5, 17)]),
  icon("Slides", "slides", "Deck", "stacked slide pages with consistently rounded and connected visible corners", [rect(6, 4, 14, 14, 2), p("M6 7h-.5A1.5 1.5 0 0 0 4 8.5v10A1.5 1.5 0 0 0 5.5 20h11A1.5 1.5 0 0 0 18 18.5V18"), l(9, 8, 17, 8), poly("9 15 11 12 13 14 16 10 18 12")]),
  icon("Image", "image", "Scene", "landscape frame with sun and horizon", [rect(3, 4, 18, 16, 2), c(16, 9, 1.5), poly("4 18 9 12 13 16 16 13 20 18")]),
  icon("Camera", "camera", "Capture", "camera body with centered lens", [p("M3 7h5l2-3h4l2 3h5v13H3Z"), c(12, 13, 4), c(18, 10, 0.6)]),
  icon("Crop", "crop", "Trim", "two crossing crop boundaries with equal visible overhangs", [p("M6 3v13a2 2 0 0 0 2 2h13"), p("M3 6h13a2 2 0 0 1 2 2v13")]),
  icon("Palette", "palette", "Pigments", "artist palette with four color wells", [p("M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h8A9 9 0 0 0 12 3Z"), c(7.5, 9, 1), c(11, 6.5, 1), c(15, 7, 1), c(8, 14, 1)]),
  icon("Pen Tool", "pen-tool", "Vector Quill", "bezier pen nib with clean control gaps", [p("m12 3 6 6-6 12L6 9Z"), l(12, 3, 12, 12.5), c(12, 14, 1), l(6, 9, 3.8, 6.8), l(18, 9, 20.2, 6.8), c(3, 6, 1), c(21, 6, 1)]),
  icon("Type", "type", "Letterform", "capital letterform with a restrained lower terminal", [l(5, 5, 19, 5), l(12, 5, 12, 19), l(9, 19, 15, 19)]),
  icon("Bold", "bold", "Heavy Type", "bold letter with one continuous outline and one shared middle stroke", [p("M14 12a4 4 0 0 0 0-8H7v16h7a4 4 0 0 0 0-8Z"), l(7, 12, 14, 12)]),
  icon("Italic", "italic", "Slanted Type", "slanted text stem with terminals", [l(10, 4, 18, 4), l(6, 20, 14, 20), l(14, 4, 10, 20)]),
  icon("Underline", "underline", "Underlined Type", "letter curve over a separate baseline", [p("M6 4v8a6 6 0 0 0 12 0V4"), l(5, 21, 19, 21)]),
  icon("List", "list", "Index", "three bullets aligned to text lines", [c(5, 6, 0.8), c(5, 12, 0.8), c(5, 18, 0.8), l(9, 6, 20, 6), l(9, 12, 20, 12), l(9, 18, 20, 18)]),
  icon("Table", "table", "Grid", "two-dimensional data grid", [rect(3, 4, 18, 16, 1), l(3, 9, 21, 9), l(9, 4, 9, 20), l(15, 4, 15, 20), l(3, 14.5, 21, 14.5)]),
  icon("Columns", "columns", "Vertical Sections", "three equal vertical layout areas", [rect(3, 4, 18, 16, 1), l(9, 4, 9, 20), l(15, 4, 15, 20)]),
  icon("Rows", "rows", "Horizontal Sections", "three equal horizontal layout areas", [rect(3, 4, 18, 16, 1), l(3, 9.3, 21, 9.3), l(3, 14.7, 21, 14.7)]),
  icon("Align Left", "align-left", "Left Rule", "text lines sharing a left edge", [l(4, 5, 20, 5), l(4, 9.5, 15, 9.5), l(4, 14, 20, 14), l(4, 18.5, 13, 18.5)]),
  icon("Fullscreen", "fullscreen", "Expand View", "four corners opening outward", [p("M9 4H4v5M15 4h5v5M20 15v5h-5M9 20H4v-5")]),
  icon("Screen Share", "screen-share", "Shared View", "screen with an outward sharing arrow", [rect(3, 4, 18, 13, 2), l(8, 21, 16, 21), l(12, 17, 12, 21), p("M9 12l3-3 3 3M12 9v6")]),
  icon("Align Center", "align-center", "Centered Rule", "text lines sharing one optical center with familiar length rhythm", [l(4, 5, 20, 5), l(7, 9.5, 17, 9.5), l(4, 14, 20, 14), l(8, 18.5, 16, 18.5)]),
  icon("Align Right", "align-right", "Right Rule", "text lines sharing one right edge with familiar length rhythm", [l(4, 5, 20, 5), l(9, 9.5, 20, 9.5), l(4, 14, 20, 14), l(11, 18.5, 20, 18.5)]),
  icon("Align Justify", "align-justify", "Even Rule", "four equal text lines spanning one justified measure", [l(4, 5, 20, 5), l(4, 9.5, 20, 9.5), l(4, 14, 20, 14), l(4, 18.5, 20, 18.5)]),
  icon("Ordered List", "list-ordered", "Numbered Index", "two explicit numeric-order marks aligned to their text rows", [p("M4 5h1v4M4 13h2l-2 4h2"), l(9, 7, 20, 7), l(9, 15, 20, 15)]),
  icon("Checklist", "list-checks", "Checked Index", "three accepted marks aligned to three text rows", [poly("3.5 5.5 5 7 7.5 4.5"), poly("3.5 11.5 5 13 7.5 10.5"), poly("3.5 17.5 5 19 7.5 16.5"), l(10, 6, 20, 6), l(10, 12, 20, 12), l(10, 18, 20, 18)]),
  icon("Strikethrough", "strikethrough", "Crossed Type", "letterform curve crossed once by a single editing rail", [p("M16 6c-1-1.5-2.5-2-4.5-2-3 0-5 1.5-5 4 0 2 1.5 3 5 4s5 2 5 4-2 4-5 4c-2.5 0-4-.75-5-2"), l(3, 12, 21, 12)]),
];
