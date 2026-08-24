import { l, p, rect } from "./primitives.js";

const icon = (name, slug, loreName, cue, nodes) => ({ name, slug, groupId: "media-playback", loreName, cue, nodes });
const speaker = () => p("M4 10h4l4-4v12l-4-4H4Z");

export const icons = [
  icon("Play", "play", "Begin", "one conventional forward playback triangle", [p("M8 5 19 12 8 19Z")]),
  icon("Pause", "pause", "Hold", "two equal playback hold bars", [rect(6.5, 5, 3.5, 14, 1), rect(14, 5, 3.5, 14, 1)]),
  icon("Stop", "stop", "Still", "one bounded playback stop square", [rect(6, 6, 12, 12, 2)]),
  icon("Skip Back", "skip-back", "Previous Mark", "backward playback triangle separated from one previous boundary", [l(4.5, 5, 4.5, 19), p("M19 5 8 12 19 19Z")]),
  icon("Skip Forward", "skip-forward", "Next Mark", "forward playback triangle separated from one next boundary", [p("M5 5 16 12 5 19Z"), l(19.5, 5, 19.5, 19)]),
  icon("Volume High", "volume-high", "Resonance", "conventional speaker with two separated sound-wave arcs", [speaker(), p("M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11")]),
  icon("Volume Off", "volume-off", "Silence", "conventional speaker with one detached mute cross", [speaker(), p("M16 10l4 4M20 10l-4 4")]),
  icon("Headphones", "headphones", "Listening Circlet", "familiar listening arch with two balanced ear cups", [p("M4 13v-2a8 8 0 0 1 16 0v2"), rect(4, 12, 4, 7, 2), rect(16, 12, 4, 7, 2)]),
];
