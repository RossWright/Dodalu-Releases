Dodalu for macOS (2026.0.0-beta.15, osx-arm64)
=========================================

This build is unsigned (not notarized by Apple).

1. Unzip this archive in Finder (you should see Dodalu.app).
2. Right-click Dodalu.app → Open → Open.
   Do not double-click first; Gatekeeper often blocks that.
3. If macOS says the app is damaged, that is Gatekeeper, not a corrupt download.
   In Terminal:

     xattr -cr /path/to/Dodalu.app

   Then right-click → Open again.
4. Optional: drag Dodalu.app into /Applications. Deleting the .app is uninstall.
5. Skip in-app updates. This zip is not a Velopack update channel.

Apple Silicon Macs (M1–M4) need the osx-arm64 zip. Intel Macs need osx-x64.
