// Add custom JS here if needed
document.addEventListener("DOMContentLoaded", () => {
  // 1. Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Smooth scroll for nav links
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  // 3. Scrollspy: highlight nav link for section in view
  const sections = document.querySelectorAll("[data-section]");
  const linkMap = {};

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      linkMap[href.slice(1)] = link; // e.g. "about" -> <a>
    }
  });

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = linkMap[id];
          if (!link) return;

          if (entry.isIntersecting) {
            // Remove active from all
            navLinks.forEach(l => l.classList.remove("active"));
            // Add active to current
            link.classList.add("active");
          }
        });
      },
      {
        root: null,
        threshold: 0.4
      }
    );

    sections.forEach(section => observer.observe(section));
  }
});
