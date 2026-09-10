(() => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  const platformButtons = Array.from(document.querySelectorAll(".platform-btn"));
  const panelIds = ["win", "linux", "mac"];

  const setPlatform = (name) => {
    for (const key of panelIds) {
      const panel = document.getElementById(`panel-${key}`);
      if (!panel) {
        continue;
      }
      const open = Boolean(name) && key === name;
      panel.classList.toggle("is-open", open);
      if (open) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    }
    platformButtons.forEach((btn) => {
      const active = Boolean(name) && btn.getAttribute("data-platform") === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-expanded", active ? "true" : "false");
    });
  };

  platformButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-platform");
      if (!name) {
        return;
      }
      setPlatform(btn.classList.contains("is-active") ? null : name);
    });
  });

  const feedBase = new URL("feed/", window.location.href);
  const targets = [
    { id: "download-win-beta", pattern: /href="([^"]*Setup\.exe)"/i },
    { id: "download-linux-appimage-beta", pattern: /href="([^"]*\.AppImage)"/i },
    { id: "download-linux-deb-beta", pattern: /href="([^"]*\.deb)"/i },
    { id: "download-mac-beta", pattern: /href="([^"]*osx-(?:arm64|x64)[^"]*\.zip)"/i },
  ];

  fetch(feedBase.href)
    .then((response) => (response.ok ? response.text() : Promise.reject()))
    .then((html) => {
      for (const target of targets) {
        const el = document.getElementById(target.id);
        if (!el) {
          continue;
        }
        const match = html.match(target.pattern);
        if (match?.[1]) {
          el.setAttribute("href", new URL(match[1], feedBase).href);
        }
      }
    })
    .catch(() => {
      // Keep the /feed/ fallback until packages are published.
    });
})();
