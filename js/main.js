// ================================
// Initialize GSAP with ScrollTrigger
// ================================
gsap.registerPlugin(ScrollTrigger);

// ================================
// Loading Screen Animation
// ================================
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");

  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    // Trigger hero animations after loading
    setTimeout(() => {
      initHeroAnimations();
    }, 500);
  }, 2500);
});

// ================================
// Custom Cursor
// ================================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smooth cursor movement
  dotX += (mouseX - dotX) * 0.9;
  dotY += (mouseY - dotY) * 0.9;
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  cursorDot.style.left = `${dotX}px`;
  cursorDot.style.top = `${dotY}px`;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;

  requestAnimationFrame(animateCursor);
}

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  animateCursor();
}

// ================================
// Particle System for Hero
// ================================
function createParticles() {
  const particlesContainer = document.getElementById("particles-hero");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    const color = Math.random() > 0.5 ? "#00D4FF" : "#7C3AED";

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            pointer-events: none;
            box-shadow: 0 0 ${size * 3}px ${color};
            opacity: 0;
        `;

    particlesContainer.appendChild(particle);

    // Animate particle
    gsap.to(particle, {
      y: -window.innerHeight - 100,
      x: `+=${(Math.random() - 0.5) * 200}`,
      opacity: 0.8,
      duration: duration,
      delay: delay,
      repeat: -1,
      ease: "none",
      onRepeat: () => {
        particle.style.left = `${Math.random() * window.innerWidth}px`;
      },
    });
  }
}

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  createParticles();
}

// ================================
// Hero Spotlight Effect
// ================================
const heroSpotlight = document.querySelector(".hero-spotlight");
const heroPhoto = document.getElementById("hero-photo");

if (heroPhoto && heroSpotlight) {
  heroPhoto.addEventListener("mousemove", (e) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroSpotlight.style.left = `${e.clientX - 200}px`;
    heroSpotlight.style.top = `${e.clientY - 200}px`;
  });
}

// ================================
// Typing Effect for Hero
// ================================
function initHeroAnimations() {
  const nameElement = document.getElementById("typing-name");
  const titleElement = document.getElementById("typing-title");

  const nameText = "SANZIDA AKTER";
  const titleText = "Frontend Developer | E-commerce PM → Tech Innovator";

  let nameIndex = 0;
  let titleIndex = 0;

  function typeName() {
    if (nameIndex < nameText.length) {
      nameElement.textContent += nameText.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeName, 100);
    } else {
      setTimeout(typeTitle, 500);
      // Particle explosion effect
      createNameExplosion();
    }
  }

  function typeTitle() {
    if (titleIndex < titleText.length) {
      titleElement.textContent += titleText.charAt(titleIndex);
      titleIndex++;
      setTimeout(typeTitle, 50);
    }
  }

  typeName();
}

// ================================
// Name Explosion Effect
// ================================
function createNameExplosion() {
  const nameElement = document.getElementById("typing-name");
  const rect = nameElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00D4FF;
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            box-shadow: 0 0 10px #00D4FF;
            z-index: 1000;
        `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / 30;
    const distance = 100 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    gsap.to(particle, {
      x: x,
      y: y,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        particle.remove();
      },
    });
  }
}

// ================================
// Navigation Scroll Effects
// ================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ================================
// Mobile Navigation
// ================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ================================
// Smooth Scrolling
// ================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offset = 80;
      const targetPosition = targetSection.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ================================
// Scroll-Triggered Animations
// ================================
function initScrollAnimations() {
  // Section titles split text animation
  gsap.utils.toArray(".section-title").forEach((title) => {
    // Split text into characters
    const titleNumber = title.querySelector(".title-number");
    const titleText = Array.from(title.childNodes)
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent)
      .join("");

    if (titleText.trim()) {
      const textSpan = document.createElement("span");
      textSpan.className = "title-text";
      textSpan.textContent = titleText;

      // Remove old text nodes
      Array.from(title.childNodes)
        .filter((node) => node.nodeType === 3)
        .forEach((node) => node.remove());

      title.appendChild(textSpan);

      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate title number
      gsap.from(titleNumber, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        rotation: -360,
        duration: 0.6,
        ease: "back.out(2)",
      });
    }
  });

  // About stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        animateCounter(stat, 0, target, 2000);
      },
      once: true,
    });
  });

  // Info cards entrance animation
  gsap.utils.toArray(".info-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      delay: index * 0.15,
      ease: "back.out(1.7)",
    });
  });

  // Quick stats animation
  gsap.utils.toArray(".quick-stat-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: 50,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Bio card animation
  gsap.from(".about-bio-card", {
    scrollTrigger: {
      trigger: ".about-bio-card",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  // Skills progress bars animation
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    const percent =
      bar.parentElement.parentElement.querySelector(".skill-percent");
    const targetPercent = parseInt(percent.getAttribute("data-percent"));

    ScrollTrigger.create({
      trigger: bar,
      start: "top 80%",
      onEnter: () => {
        gsap.to(bar, {
          width: `${width}%`,
          duration: 1.5,
          ease: "power2.out",
        });
        animateCounter(percent, 0, targetPercent, 1500, "%");
      },
      once: true,
    });
  });

  // Project cards animation
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      rotationY: -20,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Timeline items animation
  gsap.utils.toArray(".timeline-item").forEach((item, index) => {
    const isOdd = index % 2 === 0;

    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: isOdd ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });
}

// Counter animation function
function animateCounter(element, start, end, duration, suffix = "") {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * easeOutQuart(progress));
    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

// Initialize scroll animations
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  initScrollAnimations();
}

// ================================
// AOS (Animate On Scroll) Implementation
// ================================
function initAOS() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-aos-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("aos-animate");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element);
  });
}

initAOS();

// ================================
// Skill Category Icon Rotation
// ================================
document.querySelectorAll(".skill-category").forEach((category) => {
  category.addEventListener("mouseenter", () => {
    const icon = category.querySelector(".category-icon");
    gsap.to(icon, {
      rotationY: 360,
      duration: 0.6,
      ease: "power2.out",
    });

    // Particle burst effect
    createIconBurst(icon);
  });
});

// Create particle burst from icon
function createIconBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "burst-particle";
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--electric-cyan);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            box-shadow: 0 0 10px var(--electric-cyan);
            z-index: 1000;
        `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / 12;
    const distance = 60 + Math.random() * 20;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    gsap.to(particle, {
      x: x,
      y: y,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  }
}

// ================================
// Info Card Icon Continuous Pulse
// ================================
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  gsap.utils.toArray(".card-icon").forEach((icon, index) => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 2,
      delay: index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Floating animation for badges
  gsap.utils
    .toArray(".status-badge, .location-badge")
    .forEach((badge, index) => {
      gsap.to(badge, {
        y: -5,
        duration: 2.5,
        delay: index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

  // Bio icon rotation
  gsap.to(".bio-icon", {
    rotationY: 10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Stat icons gentle rotation
  gsap.utils.toArray(".stat-icon").forEach((icon) => {
    gsap.to(icon, {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

// ================================
// Project Card Magnetic Effect
// ================================
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    gsap.to(card.querySelector(".project-inner"), {
      x: deltaX * 10,
      y: deltaY * 10,
      rotationY: deltaX * 5,
      rotationX: -deltaY * 5,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelector(".project-inner"), {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

// ================================
// Form Typing Effect for Placeholders
// ================================
const formInputs = document.querySelectorAll(".form-input");

formInputs.forEach((input) => {
  input.setAttribute("placeholder", " ");

  input.addEventListener("focus", () => {
    gsap.to(input, {
      borderColor: "#00D4FF",
      boxShadow: "0 0 15px rgba(0, 212, 255, 0.3)",
      duration: 0.3,
    });
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      gsap.to(input, {
        borderColor: "rgba(0, 212, 255, 0.3)",
        boxShadow: "none",
        duration: 0.3,
      });
    }
  });
});

// ================================
// Contact Form Submission with Glitch Effect
// ================================
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".btn-submit");
  const btnText = submitBtn.querySelector(".btn-text");
  const originalText = btnText.textContent;

  // Glitch effect on button
  let glitchCount = 0;
  let glitchInterval = setInterval(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let glitchedText = "";

    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() > 0.7) {
        glitchedText +=
          glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitchedText += originalText[i];
      }
    }

    btnText.textContent = glitchedText;
    glitchCount++;

    if (glitchCount > 20) {
      clearInterval(glitchInterval);
    }
  }, 50);

  // Simulate form submission
  setTimeout(() => {
    clearInterval(glitchInterval);
    btnText.textContent = "✓ Message Sent!";
    submitBtn.style.background = "linear-gradient(90deg, #00D4FF, #00B4D8)";

    // Confetti effect
    createConfetti(submitBtn);

    // Ripple effect
    const ripple = submitBtn.querySelector(".btn-ripple");
    gsap.fromTo(
      ripple,
      { width: 0, height: 0 },
      {
        width: 300,
        height: 300,
        duration: 0.6,
        onComplete: () => {
          gsap.set(ripple, { width: 0, height: 0 });
        },
      },
    );

    // Success message
    const successMsg = document.createElement("div");
    successMsg.className = "success-message";
    successMsg.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Your message has been sent successfully!</span>
        `;
    successMsg.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 20px 30px;
            background: rgba(0, 212, 255, 0.95);
            color: var(--primary-black);
            border-radius: 12px;
            font-family: var(--font-code);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.5);
            z-index: 10000;
            transform: translateX(400px);
        `;
    document.body.appendChild(successMsg);

    gsap.to(successMsg, {
      x: -430,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    setTimeout(() => {
      gsap.to(successMsg, {
        x: 0,
        opacity: 0,
        duration: 0.5,
        onComplete: () => successMsg.remove(),
      });
    }, 3000);

    // Reset form
    setTimeout(() => {
      btnText.textContent = originalText;
      submitBtn.style.background = "";
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// Confetti effect
function createConfetti(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = ["#00D4FF", "#7C3AED", "#FF6B9D", "#00B4D8"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    const size = Math.random() * 8 + 4;
    confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 10000;
            border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        `;
    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 100;

    gsap.to(confetti, {
      x: x,
      y: y,
      rotation: Math.random() * 720,
      opacity: 0,
      duration: 1 + Math.random(),
      ease: "power2.out",
      onComplete: () => confetti.remove(),
    });
  }
}

// ================================
// Hero Photo Glitch on Hover
// ================================
const profileImg = document.querySelector(".profile-img");

if (profileImg) {
  profileImg.addEventListener("mouseenter", () => {
    gsap.to(profileImg, {
      filter: "hue-rotate(90deg) saturate(3)",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gsap.to(profileImg, {
          filter: "hue-rotate(0deg) saturate(1)",
          duration: 0.2,
        });
      },
    });
  });
}

// ================================
// Button Hover Effects
// ================================
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

// ================================
// Social Links Animation
// ================================
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      rotationZ: 360,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});

// ================================
// Stat Cards Parallax Effect
// ================================
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    gsap.to(card, {
      rotationY: deltaX * 10,
      rotationX: -deltaY * 10,
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

// ================================
// Scroll Progress Indicator (Optional)
// ================================
const createScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00D4FF, #7C3AED);
        z-index: 10001;
        transform-origin: left;
        box-shadow: 0 0 10px #00D4FF;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
};

createScrollProgress();

// ================================
// Performance Optimization
// ================================
// Lazy load images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ================================
// Animated Background Orbs
// ================================
function createBackgroundOrbs() {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section, index) => {
    const orb = document.createElement("div");
    orb.className = "bg-orb";

    const colors = ["#00D4FF", "#7C3AED", "#FF6B9D", "#00B4D8"];
    const color = colors[index % colors.length];
    const size = Math.random() * 300 + 200;
    const left = Math.random() * 80 + 10;
    const top = Math.random() * 80 + 10;

    orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color}15 0%, transparent 70%);
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            pointer-events: none;
            z-index: -1;
            filter: blur(60px);
            opacity: 0.3;
        `;

    section.style.position = "relative";
    section.appendChild(orb);

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      gsap.to(orb, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        scale: 1.2,
        duration: 8 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });
}

createBackgroundOrbs();

// ================================
// Matrix Code Rain Effect (Easter Egg)
// ================================
function createCodeRain() {
  const canvas = document.createElement("canvas");
  canvas.id = "code-rain";
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.05;
    `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]()";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00D4FF";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    setInterval(draw, 50);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

createCodeRain();

// ================================
// Reduced Motion Support
// ================================
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disable all animations
  gsap.globalTimeline.clear();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Show all elements immediately
  document.querySelectorAll("[data-aos]").forEach((el) => {
    el.classList.add("aos-animate");
  });
}

// ================================
// Console Easter Egg
// ================================
console.log(
  "%c🚀 Sanzida Akter Portfolio",
  "font-size: 24px; font-weight: bold; color: #00D4FF; text-shadow: 0 0 10px #00D4FF;",
);
console.log(
  "%cLooking for something? Check out the source code on GitHub!",
  "font-size: 14px; color: #7C3AED;",
);
console.log(
  "%chttps://github.com/sanzida-mim",
  "font-size: 12px; color: #00D4FF;",
);

// ================================
// Initialize Everything
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio initialized successfully! 🎉");

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  });
});

// ================================
// Skills Progress Bar Animations
// ================================
function initSkillsProgressAnimation() {
  const skillItems = document.querySelectorAll(".skill-progress-item");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-progress-fill");
        const percentElement = entry.target.querySelector(
          ".skill-progress-percent",
        );
        const targetWidth = fill.dataset.width;
        const targetPercent = percentElement.dataset.percent;

        // Animate width
        setTimeout(() => {
          fill.style.width = targetWidth + "%";
        }, 100);

        // Animate percentage counter
        animateCounter(percentElement, 0, parseInt(targetPercent), 1500);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillItems.forEach((item) => observer.observe(item));
}

// Counter animation helper
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = current + "%";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end + "%";
    }
  }

  requestAnimationFrame(update);
}

// Initialize on DOM load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSkillsProgressAnimation);
} else {
  initSkillsProgressAnimation();
}
