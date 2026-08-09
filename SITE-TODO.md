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

4. ~~**Custom domain DNS**~~ — `dodalu.com` / `www` on GitHub Pages (HTTPS enforced).
5. **Favicon set** — add `favicon.ico` + Apple touch icon from `art/logo.png`
   / `new_icon.png` (multiple sizes).
6. ~~**Download button accuracy**~~ — `site.js` resolves Setup / AppImage / `.deb`
   from `/feed/index.html`.
7. **Privacy / contact** — only if you care before launch (footer link).
8. **Optional second screenshot** — Agents flyout / MCP registration for the
   “Agents stay outside” section (replace the mascot panel or sit beside it).

## Nice later

9. Short looped demo (silent WebM/MP4) of moving a card + opening a doc.
10. ~~Linux download row~~ — homepage + `/feed/` list Windows Setup, AppImage, `.deb`.
11. License / pricing blurb once Lemon (or similar) is live.
12. Self-host fonts if you want zero Google Fonts dependency.
13. Snap Store listing (classic snap packs locally via `pack-snap.sh`).

## Publish checklist

- [x] Enable Pages: branch `main`, folder `/`
- [x] Push this site (homepage + assets)
- [x] Tag-driven beta CI publishes `/feed/`
- [x] Attach custom domain in repo Settings → Pages
