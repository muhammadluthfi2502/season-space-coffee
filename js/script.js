/* ================================================================
   SEASON SPACE & COFFEE — Main JavaScript
   Features:
     1. Navbar scroll behavior (transparent → solid dark)
     2. Mobile hamburger menu
     3. Scroll reveal (Intersection Observer)
     4. Menu category tabs
     5. Back-to-top button
     6. Smooth active nav-link highlighting
================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. NAVBAR SCROLL BEHAVIOR

   Logic:
   - At the very top (inside hero): transparent bg, WHITE text
   - Once user scrolls past the hero section:
       → Solid dark bg (#0f0f0f 94%) + blur
       → WHITE text (always readable on dark bg)
   - The hero section is dark, every section below it is light.
     So the navbar MUST be dark whenever it is NOT over the hero.
---------------------------------------------------------------- */
(function initNavbarScroll() {
  const navbar      = document.getElementById('navbar');
  const heroSection = document.getElementById('home');

  function handleScroll() {
    // Get how tall the hero section is (full viewport height)
    const heroBottom = heroSection
      ? heroSection.offsetTop + heroSection.offsetHeight
      : window.innerHeight;

    // Navbar height so we trigger slightly before leaving hero
    const navbarHeight = navbar.offsetHeight;

    // Trigger when the BOTTOM of the navbar has left the hero area
    const scrolledPastHero = window.scrollY + navbarHeight >= heroBottom - 80;

    if (scrolledPastHero) {
      // Past hero → dark solid navbar, white text
      navbar.classList.add('scrolled');
      navbar.classList.remove('over-hero');
    } else {
      // Still inside hero → transparent navbar, white text
      navbar.classList.remove('scrolled');
      navbar.classList.add('over-hero');
    }
  }

  // Run immediately on load — set correct state before first paint
  // Assume over-hero first to avoid flash of dark text on hero
  navbar.classList.add('over-hero');
  handleScroll();

  // Throttled rAF scroll listener
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Also re-check on resize (hero height can change)
  window.addEventListener('resize', handleScroll, { passive: true });
})();


/* ----------------------------------------------------------------
   2. MOBILE HAMBURGER MENU
---------------------------------------------------------------- */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = hamburger.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      hamburger.classList.contains('open')
    ) {
      closeMobileMenu();
    }
  });
})();

function openMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.remove('mobile-menu-closed');
  mobileMenu.classList.add('mobile-menu-open');
}

function closeMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('mobile-menu-open');
  mobileMenu.classList.add('mobile-menu-closed');
}

// Close mobile menu on resize to desktop width
window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
}, { passive: true });


/* ----------------------------------------------------------------
   3. SCROLL REVEAL — Intersection Observer
   Classes: .reveal-up | .reveal-left | .reveal-right
   Adds .revealed when element enters viewport
---------------------------------------------------------------- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!revealEls.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // trigger slightly before fully visible
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ----------------------------------------------------------------
   4. FULL MENU SYSTEM
   4a. Main category tabs (Signature Drinks / Coffee / Non-Coffee / Food)
   4b. Food subcategory pills (horizontally scrollable)
   4c. Accordion — expandable items with description
       - Only one open at a time (within the same accordion)
       - mac-simple items are not expandable
---------------------------------------------------------------- */

/* ── 4a. Main Category Tabs ── */
(function initMenuTabs() {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  if (!tabs.length || !panels.length) return;

  function activatePanel(targetId) {
    panels.forEach(function (panel) {
      if (panel.id === targetId) {
        panel.classList.add('active');
        // Stagger-reveal any .reveal-up items inside this panel
        const revealItems = panel.querySelectorAll('.reveal-up:not(.revealed)');
        revealItems.forEach(function (el, i) {
          setTimeout(function () { el.classList.add('revealed'); }, i * 30);
        });
      } else {
        panel.classList.remove('active');
        // Close all open accordion items in hidden panels
        panel.querySelectorAll('.mac-item.open').forEach(function (item) {
          closeAccordionItem(item);
        });
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      activatePanel('panel-' + tab.dataset.tab);
    });
  });

  // Init default active panel on load
  const defaultPanel = document.querySelector('.menu-panel.active');
  if (defaultPanel) {
    const revealItems = defaultPanel.querySelectorAll('.reveal-up');
    revealItems.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('revealed'); }, 200 + i * 30);
    });
  }
})();


/* ── 4b. Food Subcategory Pills ── */
(function initFoodSubcats() {
  const pills     = document.querySelectorAll('.food-pill');
  const subpanels = document.querySelectorAll('.food-subpanel');
  if (!pills.length || !subpanels.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const targetId = 'sub-' + pill.dataset.sub;

      // Update pill active state
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      // Show matching subpanel
      subpanels.forEach(function (sp) {
        if (sp.id === targetId) {
          sp.classList.add('active');
          // Close any open accordion items before showing
          sp.querySelectorAll('.mac-item.open').forEach(closeAccordionItem);
        } else {
          sp.classList.remove('active');
        }
      });

      // Scroll pill into view (center it) on mobile
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
})();


/* ── 4c. Accordion — expandable items ── */
function closeAccordionItem(item) {
  item.classList.remove('open');
}

function openAccordionItem(item) {
  item.classList.add('open');
}

(function initAccordion() {
  // Use event delegation on the whole document for all accordions
  document.addEventListener('click', function (e) {
    const header = e.target.closest('.mac-header');
    if (!header) return;

    const item = header.closest('.mac-item');
    if (!item) return;

    // mac-simple items have no description — skip expand
    if (item.classList.contains('mac-simple')) return;

    const accordion = item.closest('.menu-accordion');
    const isOpen    = item.classList.contains('open');

    // Close ALL open items in this accordion first
    if (accordion) {
      accordion.querySelectorAll('.mac-item.open').forEach(function (openItem) {
        closeAccordionItem(openItem);
      });
    }

    // If it wasn't already open, open it now
    if (!isOpen) {
      openAccordionItem(item);
    }
    // (if it WAS open, clicking again = close only, already handled above)
  });
})();


/* ----------------------------------------------------------------
   5. BACK TO TOP BUTTON
---------------------------------------------------------------- */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 400) {
          btn.classList.remove('back-to-top-hidden');
          btn.classList.add('back-to-top-visible');
        } else {
          btn.classList.remove('back-to-top-visible');
          btn.classList.add('back-to-top-hidden');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ----------------------------------------------------------------
   6. ACTIVE NAV LINK HIGHLIGHT (Scroll Spy)
   Uses a CSS class (.nav-link-active) — never inline styles,
   so it never fights the over-hero / scrolled color rules.
---------------------------------------------------------------- */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function getActiveSection() {
    const scrollY = window.scrollY + 120;
    let currentId = '';
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });
    return currentId;
  }

  function updateActiveLink() {
    const activeId = getActiveSection();
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActiveLink();
})();

/* ----------------------------------------------------------------
   Open status
---------------------------------------------------------------- */
(function initOpenStatus() {
  const statusText = document.getElementById('status-text');
  const statusDot  = document.getElementById('status-dot');

  if (!statusText || !statusDot) return;

  function updateStatus() {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Makassar" }));
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Convert time to minutes for easier comparison
    const currentTime = hours * 60 + minutes;

    const openTime  = 9 * 60;        // 09:00
    const closeTime = 24 * 60;       // 00:00 (midnight)

    if (currentTime >= openTime && currentTime < closeTime) {
      // OPEN
      statusText.textContent = "Buka Sekarang";
      statusDot.classList.add("animate-pulse");

      statusText.parentElement.classList.remove("bg-red-500/20", "text-red-400");
      statusText.parentElement.classList.add("bg-brand-green/20", "text-brand-green");

      statusDot.classList.remove("bg-red-400");
      statusDot.classList.add("bg-brand-green");

    } else {
      // CLOSED
      statusText.textContent = "Tutup";
      statusDot.classList.remove("animate-pulse");

      statusText.parentElement.classList.remove("bg-brand-green/20", "text-brand-green");
      statusText.parentElement.classList.add("bg-red-500/20", "text-red-400");

      statusDot.classList.remove("bg-brand-green");
      statusDot.classList.add("bg-red-400");
    }
  }

  updateStatus();

  // Update every minute (not every second — don’t waste performance)
  setInterval(updateStatus, 60000);
  console.log("Open status running");
  console.log(statusText, statusDot);
})();
