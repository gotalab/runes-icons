export const MODIFIER_KINDS = Object.freeze({
  add: Object.freeze({ suffix: "plus", meaning: "add or create" }),
  remove: Object.freeze({ suffix: "minus", meaning: "remove from a collection without implying destruction" }),
  confirm: Object.freeze({ suffix: "check", meaning: "accepted, recognized, or complete" }),
  validate: Object.freeze({ suffix: "check", meaning: "run or represent a domain validation operation" }),
});

export const COMPOUND_ICON_MODIFIERS = Object.freeze({
  "user-plus": Object.freeze({ noun: "user", modifier: "add" }),
  "user-minus": Object.freeze({ noun: "user", modifier: "remove" }),
  "user-check": Object.freeze({ noun: "user", modifier: "confirm" }),
  "file-plus": Object.freeze({ noun: "file", modifier: "add" }),
  "file-minus": Object.freeze({ noun: "file", modifier: "remove" }),
  "file-check": Object.freeze({ noun: "file", modifier: "confirm" }),
  "folder-plus": Object.freeze({ noun: "folder", modifier: "add" }),
  "clipboard-check": Object.freeze({ noun: "clipboard", modifier: "confirm" }),
  "type-check": Object.freeze({ noun: "type", modifier: "validate" }),
});
