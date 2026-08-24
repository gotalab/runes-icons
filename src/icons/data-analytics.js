import { c, diamond, l, layer, p, poly, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "data-analytics", loreName, cue, nodes });

export const icons = [
  icon("Line Chart", "chart-line", "Measured Path", "non-monotonic trace on one familiar plot corner", [layer("secondary", p("M4 4v16h16")), poly("6.75 16 10 11 14 13 19 7")]),
  icon("Bar Chart", "chart-bar", "Measured Columns", "three unequal bars aligned beside one familiar plot axis", [layer("secondary", l(4, 4, 4, 20)), l(8, 14, 8, 19), l(13, 9, 13, 19), l(18, 12, 18, 19)]),
  icon("Dashboard", "dashboard", "Observation Board", "asymmetric analytic workspace with three unequal regions", [layer("secondary", rect(3.5, 4, 17, 16, 2)), layer("secondary", p("M13 6.75v10.5M15.75 12h2")), diamond(8, 12, 1.25)]),
  icon("Gauge", "gauge", "Current Measure", "semicircular scale with one current-state needle", [layer("secondary", p("M4 16a8 8 0 0 1 16 0")), c(12, 16, 1.25), l(13.39, 13.92, 14.91, 11.63)]),
  icon("Trending Up", "trending-up", "Rising Signal", "bare rising direction with one shallow setback", [p("M4 18 9 13 13 15.5 19.5 7.5M16 7.5h3.5v3.5")]),
  icon("Query", "query", "Selected Rows", "structured fields with one selected predicate emitted through an open port into a result record", [layer("secondary", p("M12.5 8V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2")), layer("secondary", p("M5.5 8h4.5M5.5 16H10")), p("M5.5 10.75v2.5M5.5 12h5"), l(12.5, 12, 15.5, 12), poly("14.5 11 15.5 12 14.5 13"), rect(18.5, 9, 3, 6, 1), l(19.25, 12, 20.75, 12)]),
  icon("Metric", "metric", "Named Value", "one named value inside a compact analytic plate", [layer("secondary", rect(4, 4, 16, 16, 2)), l(7, 8, 13, 8), diamond(12, 13, 1.5), l(9, 17.25, 15, 17.25)]),
  icon("Dimension", "dimension", "Facet Branch", "one grouping junction branching through a shared categorical trunk", [diamond(6, 12, 1.25), l(8.5, 12, 10.5, 12), l(11.75, 6, 11.75, 18), p("M13 6h3.5M13 12h3.5M13 18h3.5"), c(19, 6, 1.25), c(19, 12, 1.25), c(19, 18, 1.25)]),
  icon("Measure", "measure", "Aggregation Basis", "several numeric rails aggregated through one explicit sum gate", [p("M3 6h3.25M3 12h3.25M3 18h3.25"), layer("secondary", p("M9 6h4l-3 6 3 6H9")), l(14.25, 12, 21, 12)]),
  icon("Semantic Layer", "semantic-layer", "Meaning Plane", "physical fields mapped through one continuous meaning spine into a business metric", [layer("secondary", rect(4, 2.5, 16, 5, 1.5)), layer("secondary", rect(4, 16.5, 16, 5, 1.5)), l(7, 5, 12, 5), p("M7 19h3M13 19h4"), l(12, 8.75, 12, 15.25), l(10.75, 12, 13.25, 12)]),
  icon("Cube", "cube", "Analytic Volume", "isometric multidimensional volume with four clean face guides around an open center", [layer("secondary", p("M12 3 20 7v10l-8 4-8-4V7Z")), p("M12 5.75v3.75M6.24 8.6 10 11.29M17.76 8.6 14 11.29M12 14.5v3.75")]),
  icon("Cohort", "cohort", "Shared Entry", "peer populations aligned after one common entry gate", [layer("secondary", p("M7 5.75v12.5M5 3h4")), c(17, 7, 1.25), c(17, 12, 1.25), c(17, 17, 1.25), p("M8.25 7h6.25M8.25 12h6.25M8.25 17h6.25")]),
  icon("Segment", "segment", "Selected Population", "local subset bracketed inside a larger free population", [c(5, 7, 1.25), c(9, 17, 1.25), c(11, 6, 1.25), c(16, 9, 1.25), layer("tertiary", p("M15 5h6v9h-6"))]),
  icon("Correlation", "correlation", "Associated Measure", "sparse observations forming one undirected association pattern", [layer("secondary", p("M4 4v16h16")), c(7.5, 16, 0.75), c(10.5, 13, 0.75), c(14, 11, 0.75), c(18, 7, 0.75)]),
  icon("Distribution", "distribution", "Population Shape", "one symmetric density contour over a detached baseline", [layer("secondary", l(3, 20.5, 21, 20.5)), p("M4 17.5c3 0 3-10.5 8-10.5s5 10.5 8 10.5")]),
  icon("Anomaly", "anomaly", "Broken Cadence", "regular trace with one isolated spike and immediate return", [poly("3 15 7 14 10 15 12 5 14 15 18 14 21 15")]),
  icon("Forecast", "forecast", "Possible Futures", "observed history separated by a Now boundary from one estimate and its future bounds", [
    layer("secondary", l(3, 20, 21, 20)),
    layer("secondary", p("M13 4v2M13 9v2M13 14v2M13 19v1")),
    poly("4 16 7 13 9.5 14.5 11.75 11"),
    p("M14.25 11.25 17 10 20.5 7.5"),
    layer("secondary", p("M14.25 8.5 17 7 20.5 5.5M14.25 14 17 14.5 20.5 15.5")),
  ]),
  icon("Variance", "variance", "Spread From Mean", "several observations deviating above and below one mean rail", [layer("secondary", l(3, 12, 21, 12)), c(6, 7, 0.75), c(12, 17, 0.75), c(18, 8, 0.75), p("M6 9v1.75M12 13.25V15M18 10v.75")]),
  icon("Confidence Interval", "confidence-interval", "Bounded Estimate", "one plotted estimate with capped bounds above a separate scale axis", [layer("secondary", l(4, 18, 20, 18)), layer("secondary", p("M5 7v6M19 7v6")), p("M6.25 10H9.5M14.5 10h3.25"), c(12, 10, 1.25)]),
  icon("Statistical Significance", "statistical-significance", "Threshold Passage", "observed value clearly beyond one null threshold", [c(5, 12, 1.25), layer("secondary", l(12, 4, 12, 20)), diamond(18, 12, 1.25), p("M7.5 12h3.25M13.25 12h2.25")]),
  icon("Sample Size", "sample-size", "Counted Population", "sample observations paired with one explicit count hash", [c(5, 7, 1.25), c(8, 12, 1.25), c(5, 17, 1.25), layer("secondary", p("M15 5l-1.5 14M19 5l-1.5 14M12.75 9h8M12.25 15h8"))]),
  icon("Notebook", "notebook", "Analysis Ledger", "bound analytic notebook with one code cue and one result rail", [layer("secondary", rect(5, 3, 15, 18, 2)), layer("secondary", p("M3 7h.75M3 12h.75M3 17h.75")), poly("9 8 12 11 9 14"), l(14, 15, 17, 15)]),
  icon("Pivot Table", "pivot-table", "Rotated Crosstab", "reduced cross-tab with one smooth row-to-column pivot path", [layer("secondary", rect(4, 4, 16, 16, 2)), layer("secondary", p("M5.25 9h2.5M10.25 9h8.5M9 5.25v13.5")), layer("tertiary", p("M11.5 16h2.75a2.25 2.25 0 0 0 2.25-2.25V12l-1.5 1.5"))]),
];
