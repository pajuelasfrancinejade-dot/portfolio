// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navbar = document.getElementById("navbar");

function closeMobileNav() {
  navbar.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const open = navbar.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeMobileNav);
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(
  ".section-head, .about-grid > *, .skill-item, .project-card, .exp-row, .contact-card"
);

revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (
    el.classList.contains("skill-item") ||
    el.classList.contains("project-card")
  ) {
    const row = i % 3;
    el.style.transitionDelay = row * 0.08 + "s";
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Project modal
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const img = card.querySelector("img");
    if (img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalImg.hidden = false;
    } else {
      modalImg.hidden = true;
    }
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector(".project-body p").textContent;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form character counter
const formMessage = document.getElementById("formMessage");
const charCount = document.getElementById("charCount");

formMessage.addEventListener("input", () => {
  charCount.textContent = formMessage.value.length;
});

// Copy email
const copyEmailBtn = document.getElementById("copyEmailBtn");

copyEmailBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText("francinejade.pajuelas@gmail.com")
    .then(() => {
      copyEmailBtn.textContent = "Copied!";
      copyEmailBtn.classList.add("copied");
      setTimeout(() => {
        copyEmailBtn.textContent = "Copy Email";
        copyEmailBtn.classList.remove("copied");
      }, 2000);
    });
});
