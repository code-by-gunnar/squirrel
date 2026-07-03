# 🐿️ Squirrel — landing page

The marketing site for [Squirrel](https://github.com/code-by-gunnar/squirrel.app), a
personal, self-hosted subscription tracker.

Live at **https://code-by-gunnar.github.io/squirrel/**

## How it works

The deployed page is a single self-contained `index.html` (fonts, logo and
screenshots inlined as data URIs), so GitHub Pages serves it with no build step.
It's generated from the sources in `src/`:

```
src/
  template.html   # the page markup + CSS (edit copy/design here)
  build.cjs       # inlines assets and writes ../index.html
  assets/         # brand fonts + squirrel mark (from the app)
  shots/          # app screenshots
```

## Rebuild after an edit

```bash
node src/build.cjs
```

Then commit the regenerated `index.html`. To refresh the screenshots, drop new
PNGs into `src/shots/` (keeping the same filenames) and rebuild.
