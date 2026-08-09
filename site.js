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

  // Prefer concrete package hrefs when the feed index has been published.
  const targets = [
    { id: "download-setup", pattern: /href="([^"]*Setup\.exe)"/i },
    { id: "download-appimage", pattern: /href="([^"]*\.AppImage)"/i },
    { id: "download-deb", pattern: /href="([^"]*\.deb)"/i },
  ];

  if (!targets.some((t) => document.getElementById(t.id))) {
    return;
  }

  const feedBase = new URL("feed/", window.location.href);
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
