/* Basic enhancements for the portfolio (no frameworks) */
(function () {
  // ---- 1) Clean URL: if someone lands on /index.html, show "/" in the address bar
  (function cleanIndexUrl() {
    const { pathname, search, hash } = window.location;
    if (pathname.toLowerCase().endsWith("/index.html")) {
      const cleanPath = pathname.replace(/index\.html$/i, "");
      window.history.replaceState(null, "", cleanPath + search + hash);
    }
  })();

  // ---- 2) Active nav highlighting (supports Home as "/" OR "index.html")
  const pathname = window.location.pathname.toLowerCase();
  const currentPage = pathname.endsWith("/")
    ? "index.html"
    : (pathname.split("/").pop() || "index.html");

  function normalizeHref(href) {
    if (!href) return "";
    href = href.toLowerCase().trim();

    // Treat "/", "./", "" as Home (index.html)
    if (href === "/" || href === "./" || href === "") return "index.html";

    // If someone uses "/index.html"
    if (href.endsWith("/index.html")) return "index.html";

    // If link is "/about.html" -> "about.html"
    if (href.startsWith("/")) href = href.split("/").pop() || "index.html";

    return href;
  }

  document.querySelectorAll("a[data-nav]").forEach((a) => {
    const hrefRaw = a.getAttribute("href") || "";
    const href = normalizeHref(hrefRaw);

    if (href === currentPage) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });

  // ---- 3) Footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // ---- 4) Small parallax for hero
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener(
      "pointermove",
      (e) => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        hero.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0)`;
      },
      { passive: true }
    );

    window.addEventListener("pointerleave", () => {
      hero.style.transform = "translate3d(0,0,0)";
    });
  }
})();
