// Builds a single self-contained ../index.html by inlining the fonts, logo and
// screenshots as data URIs into template.html. Run: `node src/build.cjs`
const fs = require("fs");
const path = require("path");

const SRC = __dirname;
const ROOT = path.join(__dirname, "..");
const b64 = (p) => fs.readFileSync(p).toString("base64");

let html = fs.readFileSync(path.join(SRC, "template.html"), "utf8");

const tokens = {
  __FONT_SCHIBSTED__: b64(path.join(SRC, "assets/SchibstedGrotesk-Variable.woff2")),
  __FONT_HANKEN__: b64(path.join(SRC, "assets/HankenGrotesk-Variable.woff2")),
  __LOGO__: b64(path.join(SRC, "assets/icon.svg")),
  __SHOT_DASH__: b64(path.join(SRC, "shots/shot-dashboard.png")),
  __SHOT_SUBS__: b64(path.join(SRC, "shots/shot-subs.png")),
  __SHOT_CAL__: b64(path.join(SRC, "shots/shot-calendar.png")),
  __SHOT_MOBILE__: b64(path.join(SRC, "shots/shot-mobile.png")),
  __SHOT_REPORTS__: b64(path.join(SRC, "shots/shot-reports.png")),
};

for (const [k, v] of Object.entries(tokens)) html = html.split(k).join(v);

// GitHub Pages serves index.html as a full document; ensure a minimal head.
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script>document.documentElement.classList.add('js')</script>
<title>Squirrel — Self-hosted subscription tracker</title>
<meta name="description" content="A self-hosted subscription tracker. See what you spend each month, catch renewals before they hit, and own your data — one small container on your own NAS." />
<link rel="icon" href="data:image/svg+xml;base64,${tokens.__LOGO__}" />
<meta property="og:title" content="Squirrel — Self-hosted subscription tracker" />
<meta property="og:description" content="See what you spend each month, catch renewals before they hit, and own your data." />
<meta property="og:type" content="website" />
</head>
<body>
${html}
</body>
</html>
`;

const out = path.join(ROOT, "index.html");
fs.writeFileSync(out, doc);
const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`built index.html — ${kb}KB`);
const leftover = doc.match(/__[A-Z_]+__/g);
if (leftover) console.log("WARNING unreplaced tokens:", [...new Set(leftover)]);
