/* Basic enhancements for the portfolio (no frameworks) */
(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Highlight active nav links
  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Small parallax for hero
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      hero.style.transform = `translate3d(${dx * 6}px, ${dy * 6}px, 0)`;
    }, { passive: true });

    window.addEventListener("pointerleave", () => hero.style.transform = "translate3d(0,0,0)");
  }
})();
