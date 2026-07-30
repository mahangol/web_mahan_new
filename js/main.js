/**
 * =========================================================
 * MAHAN WEBSITE — GLOBAL JAVASCRIPT
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initNavbarScrollState();
  initActiveNavigation();
  initScrollAnimations();
  initSmoothScrolling();
  initCurrentYear();
});

/**
 * =========================================================
 * 1. MOBILE NAVIGATION
 * =========================================================
 */

function initMobileNavigation() {
  const toggle = document.querySelector(".navbar-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".navbar-overlay");
  const closeButton = document.querySelector(".mobile-drawer-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggle || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    overlay?.classList.add("is-visible");

    toggle.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    overlay?.classList.remove("is-visible");

    toggle.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeButton?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeDrawer();
    }
  });
}

/**
 * =========================================================
 * 2. NAVBAR SCROLL STATE
 * =========================================================
 */

function initNavbarScrollState() {
  const navbar = document.querySelector(".site-navbar");

  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });
}

/**
 * =========================================================
 * 3. ACTIVE NAVIGATION STATE
 * =========================================================
 */

function initActiveNavigation() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const normalizePath = (path) => {
    return path.split("/").pop() || "index.html";
  };

  const allLinks = document.querySelectorAll(
    ".navbar-link, .mobile-nav-link"
  );

  allLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = normalizePath(href);

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /*
   * The "خشکینو" link points to index.html,
   * therefore both "خانه" and "خشکینو" technically
   * target the same page.
   *
   * The first link is treated as the primary active
   * page navigation item. The second remains available
   * as the section/brand shortcut.
   */

  if (currentPage === "index.html") {
    const homeLinks = document.querySelectorAll(
      'a[href="index.html"]'
    );

    homeLinks.forEach((link, index) => {
      if (index === 0) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }
}

/**
 * =========================================================
 * 4. INTERSECTION OBSERVER SCROLL ANIMATIONS
 * =========================================================
 */

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    "[data-animate]"
  );

  if (!animatedElements.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * =========================================================
 * 5. SMOOTH SCROLLING
 * =========================================================
 */

function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbar = document.querySelector(".site-navbar");
      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth",
      });
    });
  });
}

/**
 * =========================================================
 * 6. CURRENT YEAR
 * =========================================================
 */

function initCurrentYear() {
  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}