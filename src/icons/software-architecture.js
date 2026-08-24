import { c, l, layer, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "software-architecture", loreName, cue, nodes });

export const icons = [
  icon("Architecture", "architecture", "System Atlas", "bounded system map containing three heterogeneous units separated consistently from one orthogonal skeleton", [layer("secondary", rect(2.5, 2.5, 19, 19, 3)), rect(4.5, 5.5, 5, 4, 1), c(17, 7.5, 1.25), rect(10, 15, 6, 3.5, 1), p("M11 7.5h3.25M17 10.25v2.25h-4v1")]),
  icon("Component", "component", "Replaceable Unit", "one rounded replaceable unit with two widened symmetric exposed ports", [layer("secondary", p("M6 9.25V7h12v2.25M6 14.75V17h12v-2.25")), l(3, 12, 6, 12), l(18, 12, 21, 12)]),
  icon("Module", "module", "Private Capsule", "closed code capsule with one inset private seam and no exposed ports", [layer("secondary", rect(4, 5, 16, 14, 2)), l(9, 8, 9, 16), p("M12 9h5M12 14h3.5")]),
  icon("Layer", "layer", "Responsibility Strata", "three separated horizontal responsibility slabs without a side wall", [rect(4, 3.5, 16, 3, 1), rect(4, 10.5, 16, 3, 1), rect(4, 17.5, 16, 3, 1)]),
  icon("Boundary", "boundary", "Guarded Perimeter", "single empty perimeter with one deliberate centered gate gap", [layer("secondary", p("M4 4h16v6M20 14v6H4V4"))]),
  icon("Interface", "interface", "Contract Surface", "mirrored facing contract brackets containing two equal undirected rails", [layer("secondary", p("M6 5H3v14h3M18 5h3v14h-3")), l(8, 9, 16, 9), l(8, 15, 16, 15)]),
  icon("Dependency", "dependency", "Directed Reliance", "two separated units with one complete directional relation stopping before the target", [rect(3, 8, 5, 8, 1), rect(17, 8, 4, 8, 1), p("M9.25 12h5M12.25 10l2 2-2 2")]),
  icon("Coupling", "coupling", "Bound Units", "two open-sided units joined through three explicit parallel ports", [layer("secondary", p("M7.5 7.5V6H2.5v12h5v-1.5M16.5 7.5V6h5v12h-5v-1.5")), p("M7.5 9h9M7.5 12h9M7.5 15h9")]),
  icon("Cohesion", "cohesion", "Inner Accord", "one enclosure holding three mutually related members with deliberate equal link gaps", [layer("secondary", rect(3.5, 4, 17, 16, 2)), c(8, 9, 1), c(16, 9, 1), c(12, 15, 1), p("M10.75 9h2.5M9.4 11.1 10.6 12.9M14.6 11.1 13.4 12.9")]),
  icon("Abstraction", "abstraction", "Simplified Form", "heterogeneous concrete marks collected by one coherent skeleton into a simpler upper outline", [c(5, 18, 1), rect(10, 17, 4, 3, 1), p("M18 17 20 20h-4Z"), layer("secondary", rect(9, 3.5, 6, 5, 1.5)), p("M5 14.5h13M5 14.5v1M12 9.75v5.75M18 14.5v1")]),
  icon("Adapter", "adapter", "Contract Translator", "vertically mismatched open ports translated by one stepped continuous bridge", [layer("secondary", p("M6 5H3v6h3M18 13h3v6h-3")), p("M6 8h6v8h6")]),
  icon("Gateway", "gateway", "Access Portal", "system frame with a widened left aperture crossed by one separated ingress arrow", [layer("secondary", p("M4 8V4h16v16M4 20v-7M8 20v-6h8v6")), p("M2.5 10.5H17M15 8.5l2 2-2 2")]),
  icon("Repository", "repository", "Record Shelf", "non-cylinder shelf separated from one visibly removable access card", [layer("secondary", p("M4 5h11v14H4Z")), p("M6 9h6.5M6 13h6.5M6 17h5"), rect(18.25, 9, 3, 6, 1)]),
  icon("Service", "service", "Responsibility Pulse", "one responsibility block with symmetric open ports and one continuous central operation pulse", [layer("secondary", p("M6 9.25V6h12v3.25M6 14.75V18h12v-3.25")), p("M3 12h7l2-2 2 4 2-2h5")]),
  icon("Domain Model", "domain-model", "Bounded Meaning", "rounded bounded context with an identity ring and value plate separated by a deliberate relation gap", [layer("secondary", rect(3, 4, 18, 16, 2)), c(7, 12, 1.5), l(11.5, 12, 13, 12), rect(16, 9, 3, 6, 1)]),
  icon("Entity", "entity", "Identity Record", "one object card with a fixed identity ring and supporting fields", [layer("secondary", rect(4, 4, 16, 16, 2)), c(9, 9, 1.5), p("M12 9h5M7 13h10M7 17h7")]),
  icon("Value Object", "value-object", "Equal Values", "two identical value plates separated from two equality rails and no identity anchor", [layer("secondary", rect(2.5, 6, 5, 12, 1.5)), layer("secondary", rect(16.5, 6, 5, 12, 1.5)), l(10.5, 10, 13.5, 10), l(10.5, 14, 13.5, 14)]),
  icon("Event Driven", "event-driven", "Pulse Handler", "one event pulse separated cleanly from an open-port handler and output tick", [c(4, 12, 1), p("M4 7v1.5M4 15.5V17"), l(6.5, 12, 9, 12), layer("secondary", p("M9 10V8h7v2M9 14v2h7v-2")), p("M17.5 12h3M20.5 10.5v3")]),
  icon("State Machine", "state-machine", "Transition Engine", "two lowered state cells with complete forward and spacious loopback transitions", [rect(3, 10, 5, 6, 1), rect(16, 10, 5, 6, 1), p("M9.25 13h5M12.25 11.25l2 1.75-2 1.75"), layer("secondary", p("M18.5 7C17 3.5 8 3.5 5.5 7M7.4 6.33 5.5 7 5.52 5"))]),
  icon("Decision Record", "decision-record", "Chosen Path", "folded record page containing one clean option fork and one selected diamond endpoint", [layer("secondary", p("M4 3h10l5 5v13H4Z")), p("M14 3v5h5"), c(8, 13, 1), p("M10.5 12.5 13.5 10M10.5 13.5 13.5 16"), c(16.5, 10, 1), p("M16.5 14.5 18 16 16.5 17.5 15 16Z")]),
];
