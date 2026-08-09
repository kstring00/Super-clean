#!/usr/bin/env node
// Build: content.json + src/styles.css + decorative CSS + src/render.mjs  ->  dist/
// Zero dependencies. Run with `npm run build`.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { renderPage } from "./src/render.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

let content;
try {
  content = JSON.parse(readFileSync(join(root, "content.json"), "utf8"));
} catch (err) {
  console.error(
    "\ncontent.json could not be read as JSON, so the site was not rebuilt.\n" +
      "Usually this is a missing comma, or a quote that was deleted by accident.\n" +
      err.message +
      "\n"
  );
  process.exit(1);
}
const css = [
  readFileSync(join(root, "src", "styles.css"), "utf8"),
  readFileSync(join(root, "src", "hero-bubbles.css"), "utf8"),
  readFileSync(join(root, "src", "neon-wave.css"), "utf8"),
  readFileSync(join(root, "src", "footer-machines.css"), "utf8"),
].join("\n\n");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "assets", "img"), join(dist, "img"), { recursive: true });

const html = renderPage(content, css);
writeFileSync(join(dist, "index.html"), html, "utf8");

console.log(`built dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);

// Facts nobody has confirmed yet. These render as nothing until they are set,
// so the build lists them rather than letting them go quietly missing.
const unconfirmed = [
  ["pricing.selfService", content.pricing?.selfService],
  ["pricing.washAndFold", content.pricing?.washAndFold],
  ["washAndFold.turnaround", content.washAndFold?.turnaround],
  ["washAndFold.dropOffCutoff", content.washAndFold?.dropOffCutoff],
  ["lastWashTime", content.lastWashTime],
  ["payment.methods", content.payment?.methods],
  ["machineSizes", content.machineSizes],
].filter(([, v]) => v === null || v === undefined || v.length === 0);

if (content.hours?.verified !== true) {
  console.log("TODO_CONFIRM_WITH_OWNER: hours (rendered, but unverified)");
}
for (const [path] of unconfirmed) {
  console.log(`TODO_CONFIRM_WITH_OWNER: ${path} (not rendered)`);
}
