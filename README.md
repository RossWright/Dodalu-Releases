# Dodalu public site + update feed

GitHub Pages publishes this repo as **dodalu.com** (marketing site) and the
Velopack package feed.

| Path | Purpose |
|------|---------|
| `/` | Product website (`index.html`, `styles.css`, `assets/`) |
| `/feed/` | Velopack packages + `releases.*.json` + downloads index |

Asset / content checklist: **[SITE-TODO.md](SITE-TODO.md)**.
CI/CD (private source → this feed): see `docs/CICD.md` in `RossWright/Dodalu`.

## First-time Pages setup

1. Settings → Pages → Deploy from branch **main** / **/** (root).
2. Custom domain: `dodalu.com` (this repo includes a `CNAME` file).
3. Enforce HTTPS after DNS checks green.
4. Until DNS is live: `https://rosswright.github.io/Dodalu-Releases/`.

DNS (apex A/AAAA + www CNAME) is documented in the source repo’s `docs/CICD.md`.

## Publishing a new app build

**Preferred:** push a `v*-beta*` tag on private `RossWright/Dodalu`; Actions packs
`win-beta` + `linux-beta` and commits `/feed/` here.

**Local:** from the Dodalu source repo run `publish.bat <version> [channel]` or
`tools/publish-feed.sh` after packing. That refreshes `/feed/` only and does
**not** overwrite the marketing site. Then commit and push this repo.
