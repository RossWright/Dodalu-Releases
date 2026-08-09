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

  // Prefer a concrete Setup.exe when the feed has been published.
  const download = document.getElementById("download-setup");
  if (!download) {
    return;
  }

  fetch("feed/")
    .then((response) => (response.ok ? response.text() : Promise.reject()))
    .then((html) => {
      const match = html.match(/href="([^"]*Setup\.exe)"/i);
      if (match?.[1]) {
        download.setAttribute("href", new URL(match[1], new URL("feed/", window.location.href)).href);
      }
    })
    .catch(() => {
      // Keep the /feed/ fallback until the first pack is published.
    });
})();
