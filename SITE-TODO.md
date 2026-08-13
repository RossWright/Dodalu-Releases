# Dodalu public site — asset & content TODOs

Marketing homepage lives at repo root (`index.html`). Velopack packages live
under `/feed/` and are overwritten by release CI — do not put marketing assets
there.

## Done

1. ~~**Hero / product screenshots**~~ — real board, welcome, and docs-pane shots
   from Dodalu-Sample (`assets/hero-board.*`, `welcome.*`, `docs-pane.*`).
2. ~~**`assets/og-share.png`**~~ — 1200×630 crop from the board screenshot.
3. ~~**Compress `assets/mascot.png`**~~ — ~90KB PNG + WebP.
4. ~~**Custom domain DNS**~~ — `dodalu.com` / `www` on GitHub Pages.
5. ~~**Download button accuracy**~~ — `site.js` resolves Setup / AppImage / `.deb`
   from `/feed/index.html`.
6. ~~**License / pricing blurb**~~ — Buy link → `https://pay.dodalu.com/`.

## Should do

7. **Favicon set** — add `favicon.ico` + Apple touch icon from `art/logo.png`
   / `new_icon.png` (multiple sizes).
8. **Privacy / contact** — only if you care before launch (footer link).
9. **Optional Agents flyout screenshot** — MCP registration for the
   “Agents stay outside” section (replace or sit beside the mascot panel).

## Nice later

10. Short looped demo (silent WebM/MP4) of moving a card + opening a doc.
11. Self-host fonts if you want zero Google Fonts dependency.
12. Snap Store listing (classic snap packs locally via `pack-snap.sh`).

## Publish checklist

- [x] Enable Pages: branch `main`, folder `/`
- [x] Push this site (homepage + assets)
- [x] Tag-driven beta CI publishes `/feed/`
- [x] Attach custom domain in repo Settings → Pages
