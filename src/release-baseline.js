export const V0_2_BASELINE = Object.freeze({
  slugs: Object.freeze([
    "home", "search", "menu", "plus", "check", "arrow-right", "settings", "user", "calendar", "bell", "file", "folder",
    "workflow", "database", "api", "git-branch", "shield", "deploy",
    "agent", "agent-trio", "orchestrator", "handoff", "agent-as-tool", "agent-swarm", "parallel-agents", "model", "reasoning", "memory",
    "artifact", "message", "instruction", "prompt-template", "tool", "tool-call", "tool-result",
    "goal", "done", "loop", "monitor", "trigger", "evaluate", "evidence", "repair", "retry", "checkpoint", "stop-condition", "human-gate",
    "local-agent", "cloud-agent", "remote-task", "background-run", "cloud-sandbox", "environment", "worktree", "sync-back",
    "skill", "plugin", "manifest", "mcp-server", "mcp-resource", "client-extension", "plugin-install", "agent-card", "a2a-task",
  ]),
  checkPath: "M4.5 12.5 9.5 17.5 19.5 6.5",
  layeredSequences: Object.freeze({
    agent: Object.freeze(["primary", "primary", "tertiary"]),
    memory: Object.freeze(["primary", "secondary", "secondary", "tertiary"]),
    "cloud-agent": Object.freeze(["secondary", "primary", "tertiary"]),
    goal: Object.freeze(["secondary", "tertiary", "primary"]),
    message: Object.freeze(["secondary", "primary", "tertiary"]),
    plugin: Object.freeze(["primary", "secondary", "tertiary", "secondary"]),
  }),
});
