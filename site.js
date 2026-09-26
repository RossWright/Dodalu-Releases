(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("dodalu-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  const updateTheme = () => {
    const isDark = root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", `Use ${isDark ? "light" : "dark"} mode`);
      button.setAttribute("title", `Use ${isDark ? "light" : "dark"} mode`);
      button.querySelector("[data-theme-icon]")?.replaceChildren(isDark ? "☀" : "☾");
    });
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#11151a" : "#edf0f4");
  };

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const isDark = root.dataset.theme === "dark" ||
        (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
      root.dataset.theme = isDark ? "light" : "dark";
      localStorage.setItem("dodalu-theme", root.dataset.theme);
      updateTheme();
    });
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);
  updateTheme();

  document.querySelectorAll("[data-year], #year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const feedBase = new URL("feed/", window.location.href);
  const downloadTargets = [
    { id: "download-win-exe-beta", pattern: /href="([^"]*Setup\.exe)"/i },
    { id: "download-linux-appimage-beta", pattern: /href="([^"]*\.AppImage)"/i },
    { id: "download-linux-deb-beta", pattern: /href="([^"]*\.deb)"/i },
  ];
  const setVersion = (channel, version) => {
    const bubble = document.querySelector(`[data-version-channel="${channel}"]`);
    if (bubble && version) bubble.textContent = version;
  };

  if (downloadTargets.some(({ id }) => document.getElementById(id))) {
    fetch(feedBase)
      .then((response) => response.ok ? response.text() : Promise.reject())
      .then((html) => {
        downloadTargets.forEach(({ id, pattern }) => {
          const link = document.getElementById(id);
          const match = html.match(pattern);
          if (link && match?.[1]) link.href = new URL(match[1], feedBase).href;
        });
      })
      .catch(() => {
        // Static fallbacks point at the current published packages.
      });

    [
      ["win-beta", "releases.win-beta.json"],
      ["linux-beta", "releases.linux-beta.json"],
    ].forEach(([channel, file]) => {
      fetch(new URL(file, feedBase))
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((release) => setVersion(channel, release.Assets?.[0]?.Version))
        .catch(() => {
          // Keep the version rendered with the current static page.
        });
    });
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    let current = 0;
    let timer;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches && !document.hidden) {
        timer = window.setInterval(() => show(current + 1), 5000);
      }
    };
    const choose = (index) => {
      show(index);
      start();
    };

    previous?.addEventListener("click", () => choose(current - 1));
    next?.addEventListener("click", () => choose(current + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => choose(index)));
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) start();
    });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    show(0);
    start();
  });

  const dialog = document.querySelector("[data-media-dialog]");
  if (dialog) {
    const image = dialog.querySelector("[data-media-image]");
    const video = dialog.querySelector("[data-media-video]");
    const heading = dialog.querySelector("[data-media-heading]");
    const text = dialog.querySelector("[data-media-text]");
    let opener;

    document.querySelectorAll("[data-media]").forEach((button) => {
      button.addEventListener("click", () => {
        const source = button.dataset.media;
        const isVideo = button.dataset.mediaType === "video";
        opener = button;
        heading.textContent = button.dataset.mediaTitle || "";
        text.textContent = button.dataset.mediaCopy || "";
        image.hidden = isVideo;
        video.hidden = !isVideo;
        if (isVideo) {
          video.src = source;
          video.load();
        } else {
          image.src = source;
          image.alt = button.dataset.mediaTitle || "Dodalu feature screenshot";
        }
        dialog.showModal();
      });
    });

    const close = () => {
      video.pause();
      video.removeAttribute("src");
      dialog.close();
      opener?.focus();
    };
    dialog.querySelector("[data-media-close]")?.addEventListener("click", close);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      close();
    });
  }

  const windowsHelpDialog = document.querySelector("[data-windows-help-dialog]");
  const windowsHelpOpener = document.querySelector("[data-windows-help-open]");
  if (windowsHelpDialog && windowsHelpOpener) {
    const closeWindowsHelp = () => {
      windowsHelpDialog.close();
      windowsHelpOpener.focus();
    };
    windowsHelpOpener.addEventListener("click", () => windowsHelpDialog.showModal());
    windowsHelpDialog.querySelector("[data-windows-help-close]")?.addEventListener("click", closeWindowsHelp);
    windowsHelpDialog.addEventListener("click", (event) => {
      if (event.target === windowsHelpDialog) closeWindowsHelp();
    });
    windowsHelpDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeWindowsHelp();
    });
  }
})();
