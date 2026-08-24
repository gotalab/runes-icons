#!/usr/bin/env node
import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { LIBRARY_META } from "./catalog.js";
import { runesApplication } from "./runes-application.js";
import { renderPng } from "./render-png.js";

const EXIT = Object.freeze({ usage: 2, notFound: 3, unavailable: 4, validation: 5, internal: 10 });

class CliError extends Error {
  constructor(message, { code = EXIT.validation, reason = "validation_failed", nextCommands = [] } = {}) {
    super(message);
    this.code = code;
    this.reason = reason;
    this.nextCommands = nextCommands;
  }
}

const hash = (data) => createHash("sha256").update(data).digest("hex");
const flagName = (token) => token.slice(2);

function parseArgs(argv) {
  const first = argv[0];
  const command = first === "--help" || first === "-h"
    ? "help"
    : first === "--version" || first === "-v"
      ? "version"
      : first ?? "help";
  const positionals = [];
  const flags = {};
  for (let index = 1; index < argv.length; index++) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      positionals.push(token);
      continue;
    }
    const equal = token.indexOf("=");
    if (equal !== -1) {
      flags[token.slice(2, equal)] = token.slice(equal + 1);
      continue;
    }
    const name = flagName(token);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      flags[name] = next;
      index++;
    } else {
      flags[name] = true;
    }
  }
  return { command, positionals, flags };
}

const asNumber = (value, fallback, label) => {
  if (value === undefined) return fallback;
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) throw new CliError(`${label} must be a positive number`, { code: EXIT.usage, reason: "invalid_argument" });
  return number;
};

const jsonEnabled = (flags) => flags.json === true || flags.receipt === "json";

function printResult(value, flags) {
  if (jsonEnabled(flags)) {
    process.stdout.write(`${JSON.stringify(value)}\n`);
    return;
  }
  for (const [key, field] of Object.entries(value)) {
    if (field === undefined || field === null || field === "") continue;
    if (Array.isArray(field)) {
      process.stdout.write(`${key}:\n`);
      for (const item of field) process.stdout.write(`- ${typeof item === "string" ? item : JSON.stringify(item)}\n`);
    } else if (typeof field === "object") {
      process.stdout.write(`${key}: ${JSON.stringify(field)}\n`);
    } else {
      process.stdout.write(`${key}: ${field}\n`);
    }
  }
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function writeArtifact(outputPath, data, { force = false } = {}) {
  const absolutePath = resolve(outputPath);
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  if (await exists(absolutePath)) {
    const current = await readFile(absolutePath);
    if (current.equals(buffer)) return { status: "unchanged", path: absolutePath, bytes: buffer.length, sha256: hash(buffer) };
    if (!force) throw new CliError(`Refusing to overwrite ${absolutePath} without --force`, { reason: "output_exists", nextCommands: [`runes export ... --out ${JSON.stringify(outputPath)} --force`] });
  }
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, buffer);
  return { status: "written", path: absolutePath, bytes: buffer.length, sha256: hash(buffer) };
}

function requireSelector(positionals, command) {
  const selector = positionals[0];
  if (!selector) throw new CliError(`${command} requires an icon slug or alias`, { code: EXIT.usage, reason: "missing_selector", nextCommands: ["runes search QUERY"] });
  return selector;
}

function requireOutput(flags, command) {
  if (!flags.out) throw new CliError(`${command} requires --out PATH`, { code: EXIT.usage, reason: "missing_output" });
  return String(flags.out);
}

const help = `Runes CLI · @gotalab/runes

Usage:
  runes search QUERY [--family ID] [--limit N] [--json]
  runes info SLUG_OR_ALIAS [--json]
  runes export SLUG_OR_ALIAS --format svg|png --out PATH [--size N] [--stroke N] [--color VALUE] [--force] [--json]
  runes copy SLUG_OR_ALIAS [--format svg] [--stdout] [--json]
  runes open SLUG_OR_ALIAS [--print-only] [--json]
  runes export-set --format iconify-json|metadata-json --out PATH [--force] [--json]

Read-only: search, info. File writes: export, export-set. Clipboard write: copy. App launch: open.
Default output is a compact receipt. Use --json for automation and copy --stdout only when raw SVG is required.
`;

async function clipboardWrite(content) {
  if (process.env.RUNES_CLIPBOARD_COMMAND) {
    const result = spawnSync(process.env.RUNES_CLIPBOARD_COMMAND, [], { input: content, encoding: "utf8" });
    if (result.status === 0) return process.env.RUNES_CLIPBOARD_COMMAND;
  }
  const commands = process.platform === "darwin"
    ? [["pbcopy", []]]
    : process.platform === "win32"
      ? [["clip", []]]
      : [["wl-copy", []], ["xclip", ["-selection", "clipboard"]]];
  for (const [command, args] of commands) {
    const result = spawnSync(command, args, { input: content, encoding: "utf8" });
    if (result.status === 0) return command;
  }
  throw new CliError("No supported clipboard command is available", { code: EXIT.unavailable, reason: "clipboard_unavailable", nextCommands: ["runes export SLUG --format svg --out PATH"] });
}

function launchUrl(url) {
  const commands = process.platform === "darwin"
    ? [["open", [url]]]
    : process.platform === "win32"
      ? [["cmd", ["/c", "start", "", url]]]
      : [["xdg-open", [url]]];
  const [command, args] = commands[0];
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new CliError("Could not open the Runes gallery", { code: EXIT.unavailable, reason: "open_unavailable", nextCommands: [`Open ${url}`] });
}

async function main(argv) {
  const { command, positionals, flags } = parseArgs(argv);
  if (command === "help" || flags.help) {
    process.stdout.write(help);
    return;
  }
  if (command === "version" || flags.version) {
    printResult({ namespace: "@gotalab/runes", version: LIBRARY_META.version }, flags);
    return;
  }
  if (command === "search") {
    const query = positionals.join(" ").trim();
    if (!query) throw new CliError("search requires QUERY", { code: EXIT.usage, reason: "missing_query" });
    const results = runesApplication.search(query, { family: flags.family, limit: asNumber(flags.limit, 10, "limit") }).map((icon) => ({ slug: icon.slug, name: icon.name, family: icon.groupId }));
    printResult({ status: results.length ? "matched" : "not_found", count: results.length, results, next_commands: results[0] ? [`runes info ${results[0].slug} --json`] : [] }, flags);
    if (!results.length) process.exitCode = EXIT.notFound;
    return;
  }
  if (command === "info") {
    const selector = requireSelector(positionals, command);
    const resolved = runesApplication.info(selector);
    if (!resolved) throw new CliError(`Unknown icon: ${selector}`, { code: EXIT.notFound, reason: "not_found", nextCommands: [`runes search ${JSON.stringify(selector)}`] });
    printResult({ status: "found", requested: selector, slug: resolved.canonicalSlug, name: resolved.icon.name, family: resolved.icon.groupId, lore_name: resolved.icon.loreName, cue: resolved.icon.cue, aliases: resolved.metadata.aliases, tags: resolved.metadata.tags, concept_kind: resolved.metadata.conceptKind, next_commands: [`runes export ${resolved.canonicalSlug} --format svg --out PATH`] }, flags);
    return;
  }
  if (command === "export") {
    const selector = requireSelector(positionals, command);
    const outputPath = requireOutput(flags, command);
    const format = String(flags.format ?? "svg");
    if (!["svg", "png"].includes(format)) throw new CliError("export --format must be svg or png", { code: EXIT.usage, reason: "invalid_format" });
    const size = asNumber(flags.size, format === "png" ? 128 : 24, "size");
    const strokeWidth = asNumber(flags.stroke, 1.25, "stroke");
    const rendered = runesApplication.renderSvg(selector, { size, strokeWidth, color: flags.color ?? "currentColor", colorMode: flags["color-mode"] ?? "monochrome", title: flags.title ? String(flags.title) : "", pretty: format === "svg" });
    if (!rendered) throw new CliError(`Unknown icon: ${selector}`, { code: EXIT.notFound, reason: "not_found" });
    const data = format === "png" ? await renderPng(rendered.svg) : `${rendered.svg}\n`;
    printResult({ ...(await writeArtifact(outputPath, data, { force: flags.force === true })), slug: rendered.canonicalSlug, format, size, stroke_width: strokeWidth }, flags);
    return;
  }
  if (command === "copy") {
    const selector = requireSelector(positionals, command);
    const format = String(flags.format ?? "svg");
    if (format !== "svg") throw new CliError("copy currently supports only --format svg", { code: EXIT.usage, reason: "invalid_format" });
    const rendered = runesApplication.renderSvg(selector, { size: asNumber(flags.size, 24, "size"), strokeWidth: asNumber(flags.stroke, 1.25, "stroke"), pretty: true });
    if (!rendered) throw new CliError(`Unknown icon: ${selector}`, { code: EXIT.notFound, reason: "not_found" });
    if (flags.stdout === true) {
      process.stdout.write(`${rendered.svg}\n`);
      return;
    }
    const commandUsed = await clipboardWrite(rendered.svg);
    printResult({ status: "copied", slug: rendered.canonicalSlug, format, bytes: Buffer.byteLength(rendered.svg), sha256: hash(rendered.svg), clipboard_command: commandUsed }, flags);
    return;
  }
  if (command === "open") {
    const selector = requireSelector(positionals, command);
    const resolved = runesApplication.info(selector);
    if (!resolved) throw new CliError(`Unknown icon: ${selector}`, { code: EXIT.notFound, reason: "not_found" });
    const url = new URL(process.env.RUNES_GALLERY_URL ?? "http://127.0.0.1:4173/");
    url.searchParams.set("icon", resolved.canonicalSlug);
    url.searchParams.set("size", String(flags.size ?? 128));
    if (flags["print-only"] !== true) launchUrl(url.href);
    printResult({ status: flags["print-only"] === true ? "ready" : "opened", slug: resolved.canonicalSlug, url: url.href }, flags);
    return;
  }
  if (command === "export-set") {
    const outputPath = requireOutput(flags, command);
    const format = String(flags.format ?? "iconify-json");
    const data = format === "iconify-json"
      ? runesApplication.iconifyJson()
      : format === "metadata-json"
        ? runesApplication.metadataJson()
        : null;
    if (!data) throw new CliError("export-set --format must be iconify-json or metadata-json", { code: EXIT.usage, reason: "invalid_format" });
    printResult({ ...(await writeArtifact(outputPath, `${JSON.stringify(data)}\n`, { force: flags.force === true })), format, icon_count: runesApplication.icons.length }, flags);
    return;
  }
  throw new CliError(`Unknown command: ${command}`, { code: EXIT.usage, reason: "unknown_command", nextCommands: ["runes help"] });
}

main(process.argv.slice(2)).catch((error) => {
  const cliError = error instanceof CliError ? error : new CliError(error.message, { code: EXIT.internal, reason: "internal_error" });
  if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify({ status: "error", reason: cliError.reason, message: cliError.message, next_commands: cliError.nextCommands })}\n`);
  else {
    process.stderr.write(`error: ${cliError.message}\n`);
    if (cliError.nextCommands.length) process.stderr.write(`next_commands:\n${cliError.nextCommands.map((command) => `- ${command}`).join("\n")}\n`);
  }
  process.exitCode = cliError.code;
});
