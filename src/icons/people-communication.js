import { c, l, p, poly, rect } from "./primitives.js";
import { checkMark, minusMark, plusMark } from "./modifier-primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "people-communication", loreName, cue, nodes });
const person = () => [c(9, 7.5, 3), p("M3.5 20a5.5 5.5 0 0 1 11 0")];

export const icons = [
  icon("Users", "users", "Party", "two distinct people sharing a group", [c(8, 8, 3), p("M2.5 20a5.5 5.5 0 0 1 11 0"), c(16.5, 9, 2.5), p("M14 15.5a5 5 0 0 1 7.5 4.5")]),
  icon("User Plus", "user-plus", "Recruit", "person with an explicit add action", [...person(), ...plusMark(18.5, 10, 3)]),
  icon("User Minus", "user-minus", "Dismiss", "person with an explicit remove action", [...person(), ...minusMark(18.5, 10, 3)]),
  icon("User Check", "user-check", "Recognized", "person with a confirmation mark", [...person(), ...checkMark(18.5, 10, 6)]),
  icon("Contact", "contact", "Correspondent", "person recorded inside a contact page", [rect(4, 3, 16, 18, 2), c(10, 9, 2.5), p("M6.5 16a3.5 3.5 0 0 1 7 0"), l(15.5, 8, 18, 8), l(15.5, 12, 18, 12)]),
  icon("ID Card", "id-card", "Credential", "identity card with portrait and fields", [rect(3, 5, 18, 14, 2), c(8, 10, 2), p("M5.5 16a2.5 2.5 0 0 1 5 0"), l(13, 9, 18, 9), l(13, 13, 18, 13), l(13, 16, 16, 16)]),
  icon("Mail", "mail", "Letter", "closed envelope with clear fold", [rect(3, 5, 18, 14, 2), poly("4 7 12 13 20 7")]),
  icon("Mail Open", "mail-open", "Opened Letter", "open envelope exposing its message", [p("M3 10 12 3l9 7v11H3Z"), poly("3 11 12 17 21 11"), p("M7 10V7h10v3")]),
  icon("Inbox", "inbox", "Receiving Tray", "incoming tray with central landing notch", [p("M4 4h16l2 10v6H2v-6Z"), p("M4 14h4l2 3h4l2-3h4")]),
  icon("Send", "send", "Dispatch", "paper plane moving outward", [p("M3 11 21 3l-7 18-3-7Z")]),
  icon("Reply", "reply", "Answer", "leftward response returning to sender", [poly("10 7 4 12 10 17"), p("M5 12h8a7 7 0 0 1 7 7")]),
  icon("Forward", "forward", "Relay", "rightward response sent onward", [poly("14 7 20 12 14 17"), p("M19 12h-8a7 7 0 0 0-7 7")]),
  icon("At Sign", "at-sign", "Address Mark", "addressed identity inside a communication orbit", [c(12, 12, 3), p("M15 12v1.5a2.5 2.5 0 0 0 5 0V12a8 8 0 1 0-2.3 5.7")]),
  icon("Link", "link", "Bond", "two interlocking chain segments", [p("m9.5 14.5-1 1a4 4 0 0 1-5.7-5.7l3-3a4 4 0 0 1 5.7 0l1 1"), p("m14.5 9.5 1-1a4 4 0 0 1 5.7 5.7l-3 3a4 4 0 0 1-5.7 0l-1-1"), l(8.5, 15.5, 15.5, 8.5)]),
  icon("Unlink", "unlink", "Sever Bond", "broken chain crossed by a clean separation", [p("M8 16.5a4 4 0 0 1-5.2-6.1l3-3A4 4 0 0 1 10 6.5"), p("M16 7.5a4 4 0 0 1 5.2 6.1l-3 3A4 4 0 0 1 14 17.5"), l(5, 5, 19, 19)]),
  icon("Phone", "phone", "Call", "familiar handset following a call path", [p("M5 3h4l2 5-2.5 2a15 15 0 0 0 5.5 5.5L16 13l5 2v4a2 2 0 0 1-2 2C10.2 21 3 13.8 3 5a2 2 0 0 1 2-2Z")]),
  icon("Video", "video", "Vision Call", "camera frame with integrated outbound lens", [p("M5 6h9a2 2 0 0 1 2 2v2l5-3v10l-5-3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z")]),
  icon("Microphone", "microphone", "Voice", "voice capsule with a single clean recording stem", [rect(8, 3, 8, 11, 4), p("M5 10v2a7 7 0 0 0 14 0v-2"), l(12, 18.5, 12, 21.5)]),
  icon("Chat Group", "chat-group", "Council", "two optically separated conversation bubbles", [p("M3 4h9v7H7l-3 3v-3H3Z"), p("M12 14h9v6h-1v2l-3-2h-5Z"), l(5, 7.5, 10, 7.5), l(14, 17, 19, 17)]),
  icon("Announcement", "announcement", "Proclamation", "megaphone projecting one clear message", [p("M4 10v4h4l8 4V6l-8 4Z"), p("M8.5 15.5 10 20h3"), p("M19 9a5 5 0 0 1 0 6")]),
];
