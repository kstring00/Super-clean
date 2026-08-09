#!/usr/bin/env node
// Build: content.json + src/styles.css + src/render.mjs  ->  dist/
// Zero dependencies. Run with `npm run build`.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { renderPage } from "./src/render.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

const content = JSON.parse(readFileSync(join(root, "content.json"), "utf8"));
const css = readFileSync(join(root, "src", "styles.css"), "utf8");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "assets", "img"), join(dist, "img"), { recursive: true });

const html = renderPage(content, css);
writeFileSync(join(dist, "index.html"), html, "utf8");

console.log(`built dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
