# Dodalu public site — asset & content TODOs

The site in this repo is ready to push for GitHub Pages. Replace placeholders
before calling the marketing page “done.”

## Must replace

1. **`assets/hero-board.png` (or `.webp`)** — real Windows screenshot of Dodalu
   with a filled board (3–4 columns, a few tags, docs pane optional).
   - Ideal size ~1600×1000 or 1920×1200, compressed WebP/PNG under ~400KB.
   - Then point `index.html` hero `<img>` at it and delete the SVG placeholder
     (or keep SVG as fallback).
2. **`assets/og-share.png`** — Open Graph / Twitter share image **1200×630**.
   - Start from `assets/og-share.svg` or a composed board crop + wordmark.
   - Already referenced by `index.html` meta `og:image`.
3. **Compress `assets/mascot.png`** — copied from `happy_robot.png` (~1.8MB).
   - Export a ~300px WebP/PNG under ~150KB for the Agents section.

## Should do

4. **Custom domain DNS** — point `dodalu.com` (and ideally `www`) at GitHub Pages;
   confirm HTTPS after the `CNAME` file is live.
5. **Favicon set** — add `favicon.ico` + Apple touch icon from `art/logo.png`
   / `new_icon.png` (multiple sizes).
6. **Download button accuracy** — after first `publish.bat`, confirm
   `site.js` resolves the Setup.exe name; adjust feed `index.html` if needed.
7. **Privacy / contact** — only if you care before launch (footer link).
8. **Optional second screenshot** — Agents flyout / MCP registration for the
   “Agents stay outside” section (replace the mascot panel or sit beside it).

## Nice later

9. Short looped demo (silent WebM/MP4) of moving a card + opening a doc.
10. ~~Linux download row when AppImage packs exist~~ — `tools/publish-feed.sh` lists Setup / AppImage / `.deb` in `/feed/index.html`.
11. License / pricing blurb once Lemon (or similar) is live.
12. Self-host fonts if you want zero Google Fonts dependency.

## Publish checklist

- [ ] Enable Pages: branch `main`, folder `/`
- [ ] Push this site (homepage + assets)
- [ ] Run `publish.bat <version>` from private Dodalu repo
- [ ] Commit/push feed artifacts
- [ ] Attach custom domain in repo Settings → Pages
