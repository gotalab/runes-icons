import { c, l, p, poly } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "status-time-view", loreName, cue, nodes });

export const icons = [
  icon("Info", "info", "Notice", "information inside a calm circle", [c(12, 12, 9), l(12, 11, 12, 17), c(12, 7.5, 0.6)]),
  icon("Help Circle", "help-circle", "Guidance", "question inside a support circle", [c(12, 12, 9), p("M9.5 9a2.7 2.7 0 1 1 3.4 2.6c-.9.4-.9 1.2-.9 2"), c(12, 17, 0.6)]),
  icon("Warning", "warning", "Caution", "risk inside a stable warning triangle", [p("M12 3 22 20H2Z"), l(12, 9, 12, 14), c(12, 17, 0.6)]),
  icon("Error", "error", "Failure", "failure cross inside a circle", [c(12, 12, 9), l(8.5, 8.5, 15.5, 15.5), l(15.5, 8.5, 8.5, 15.5)]),
  icon("Loader", "loader", "Await", "eight balanced progress rays", [l(12, 2.5, 12, 5), l(12, 19, 12, 21.5), l(2.5, 12, 5, 12), l(19, 12, 21.5, 12), l(5.3, 5.3, 7, 7), l(17, 17, 18.7, 18.7), l(18.7, 5.3, 17, 7), l(7, 17, 5.3, 18.7)]),
  icon("More Horizontal", "more-horizontal", "More Across", "three horizontal options", [c(5, 12, 1), c(12, 12, 1), c(19, 12, 1)]),
  icon("More Vertical", "more-vertical", "More Down", "three vertical options", [c(12, 5, 1), c(12, 12, 1), c(12, 19, 1)]),
  icon("Eye", "eye", "Observe", "visible eye with centered focus", [p("M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z"), c(12, 12, 2.5)]),
  icon("Eye Off", "eye-off", "Conceal", "visibility eye crossed by concealment", [p("M4.5 7.5C3.2 9 2.5 12 2.5 12s3.5 6 9.5 6c1.5 0 2.8-.4 4-1"), p("M9 6.4A9 9 0 0 1 12 6c6 0 9.5 6 9.5 6a12 12 0 0 1-2 2.6"), l(3, 3, 21, 21)]),
  icon("Clock", "clock", "Time", "plain clock with hour and minute", [c(12, 12, 9), p("M12 7v5l3 2")]),
  icon("Timer", "timer", "Countdown", "hourglass with a controlled open waist", [l(7, 3, 17, 3), l(7, 21, 17, 21), p("M8 3c0 4 2 6 3.25 8.25M8 21c0-4 2-6 3.25-8.25"), p("M16 3c0 4-2 6-3.25 8.25M16 21c0-4-2-6-3.25-8.25")]),
  icon("Stopwatch", "stopwatch", "Elapsed", "stopwatch with one clean top trigger", [c(12, 13, 8), l(12, 5, 12, 2), l(9, 2, 15, 2), p("M12 9v4l3 2")]),
  icon("History", "history", "Chronicle", "counterclockwise return around past time", [p("M6.5 9 6.3 6.3 3.5 6.5"), p("M6.3 6.3A8 8 0 1 1 4 12"), p("M12 8v4l3 2")]),
  icon("Bookmark", "bookmark", "Keep", "page marker with a retained notch", [p("M6 3h12v18l-6-4-6 4Z")]),
  icon("Star", "star", "Favor", "five-point preference marker", [p("m12 2.5 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.2-.9Z")]),
  icon("Pin", "pin", "Hold Fast", "pushpin fixing an item in place", [p("M8 3h8l-1 6 3 3v2H6v-2l3-3Z"), l(12, 14, 12, 22)]),
  icon("Flag", "flag", "Mark", "flag marking a point or state", [p("M5 22V4h11l3 3-3 3H5")]),
  icon("Tag", "tag", "Label", "classification tag with attachment hole", [p("M3 12V4h8l10 10-7 7Z"), c(7.5, 8.5, 1)]),
  icon("Sort", "sort", "Order", "opposed arrows defining order", [p("M8 4v16"), poly("4.5 7.5 8 4 11.5 7.5"), p("M16 20V4"), poly("12.5 16.5 16 20 19.5 16.5")]),
  icon("Sun", "sun", "Daylight", "central daylight disc with eight detached rays", [c(12, 12, 4), l(12, 2.5, 12, 4.5), l(12, 19.5, 12, 21.5), l(2.5, 12, 4.5, 12), l(19.5, 12, 21.5, 12), l(5, 5, 6.75, 6.75), l(17.25, 17.25, 19, 19), l(19, 5, 17.25, 6.75), l(6.75, 17.25, 5, 19)]),
  icon("Moon", "moon", "Night", "single crescent created by one continuous night contour", [p("M18 17a8 8 0 1 1-8-12 6 6 0 0 0 8 12Z")]),
];
