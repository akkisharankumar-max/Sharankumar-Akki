
/* =================================
   1. LIGHT / DARK MODE
================================= */

const themeButton = document.getElementById("theme-toggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
  html.setAttribute("data-theme", savedTheme);
}

function updateThemeButton() {
  const theme = html.getAttribute("data-theme");

  if (theme === "dark") {
    themeButton.textContent = "☀️";
    themeButton.title = "Switch to Light Mode";
  } else {
    themeButton.textContent = "🌙";
    themeButton.title = "Switch to Dark Mode";
  }
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");

  const newTheme =
    currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);

  localStorage.setItem("portfolio-theme", newTheme);

  updateThemeButton();
});


/* =================================
   2. MOBILE NAVIGATION
================================= */

const menuButton = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  menuButton.textContent =
    navLinks.classList.contains("show") ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuButton.textContent = "☰";
  });
});


/* =================================
   3. TYPING ANIMATION
================================= */

const words = [
  "Full Stack Developer",
  "Web Developer",
  "Engineering Student",
  "Tech Enthusiast"
];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent =
    currentWord.substring(0, charIndex);

  let speed = deleting ? 50 : 100;

  if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    speed = 1700;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


/* =================================
   4. AUTOMATIC YEAR
================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =================================
   5. CONTACT FORM DEMO
================================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const status = document.getElementById("form-status");

  status.textContent =
    "Frontend demo: Connect backend to send your message.";

  contactForm.reset();
});


/* =================================
   6. ACTIVE NAVIGATION
================================= */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "home";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navItems.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


/* =================================
   7. CONSOLE MESSAGE
================================= */

console.log(
  "Welcome to Sharankumar N Akki's Portfolio!"
);
