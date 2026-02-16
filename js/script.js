/* ===============================
   MENU MOBILE
================================ */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navContent = document.querySelector(".nav-content");
const body = document.body;

if (menuToggle && nav && navContent) {
  const links = nav.querySelectorAll("a");

  const closeMenu = () => {
    menuToggle.classList.remove("active");
    nav.classList.remove("active");
    body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains("active");
    menuToggle.classList.toggle("active", !isOpen);
    nav.classList.toggle("active", !isOpen);
    body.classList.toggle("menu-open", !isOpen);
  };

  menuToggle.addEventListener("click", toggleMenu);
  nav.addEventListener("click", closeMenu);
  navContent.addEventListener("click", (e) => e.stopPropagation());
  links.forEach((link) => link.addEventListener("click", closeMenu));
}

/* ===============================
   INTERSECTION OBSERVER (GENÉRICO)
================================ */
function animateOnScroll(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach((el, index) => {
    if (options.stagger) {
      el.style.transitionDelay = `${index * options.stagger}s`;
    }
    observer.observe(el);
  });
}

/* DRINKS */
animateOnScroll(".drink-card", {
  threshold: 0.15,
  stagger: 0.15,
});

/* ABOUT */
animateOnScroll(".about-image, .about-text", {
  threshold: 0.2,
});

/* GALERIA */
animateOnScroll(".gallery-grid img", {
  threshold: 0.2,
  stagger: 0.12,
});

/* ===============================
   LAZY IMAGE FADE-IN
================================ */
document.querySelectorAll("img").forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }
});

/* ===============================
   LIGHTBOX
================================ */
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryImages = document.querySelectorAll(".gallery-grid img");

if (lightbox && lightboxImg && lightboxClose) {
  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    body.style.overflow = "";
  };

  galleryImages.forEach((img) =>
    img.addEventListener("click", () => openLightbox(img.src)),
  );

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", closeLightbox);
  lightboxImg.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}


const counters = document.querySelectorAll(".circle-counter");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

function animateCounter(counter) {
  const target = +counter.dataset.target;
  const valueEl = counter.querySelector(".value");
  const circle = counter.querySelector(".progress");
  const circumference = 440;

  let current = 0;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.floor(progress * target);

    valueEl.textContent = current.toLocaleString() + "+";
    circle.style.strokeDashoffset =
      circumference - progress * circumference;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
