// Main JavaScript File
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingProgress = document.querySelector(".loading-progress");

  // Simulate loading
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.visibility = "hidden";

    // Initialize everything after loading
    initAnimations();
    initCustomCursor();
    initParticles();
    initScrollAnimations();
    initTypingEffects();
    initSkillsCounters();
    initProjectCards();
    initContactForm();
    initMenuToggle();
  }, 2000);

  // Initialize Animations
  function initAnimations() {
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.style.background = "rgba(10, 10, 10, 0.9)";
        navbar.style.boxShadow = "none";
      } else {
        navbar.style.background = "rgba(10, 10, 10, 0.95)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.1)";

        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
      }

      lastScroll = currentScroll;
    });

    // Section reveals
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Stagger animations for elements
    gsap.from(".nav-item", {
      duration: 0.5,
      y: -20,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
    });

    // Hero content animation
    gsap.from(".hero-text > *", {
      duration: 1,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
      ease: "power3.out",
    });

    // Image animation
    gsap.from(".image-container", {
      duration: 1.5,
      scale: 0,
      rotation: 180,
      opacity: 0,
      delay: 1,
      ease: "back.out(1.7)",
    });
  }

  // Custom Cursor
  function initCustomCursor() {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const cursorTrail = document.querySelector(".cursor-trail");

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let trailX = 0;
    let trailY = 0;
    let scale = 1;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .skill-item, .timeline-item",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        scale = 1.5;
        cursorOutline.style.borderColor = "#FF6B9D";
        cursorOutline.style.background = "rgba(255, 107, 157, 0.1)";
      });

      element.addEventListener("mouseleave", () => {
        scale = 1;
        cursorOutline.style.borderColor = "#00D4FF";
        cursorOutline.style.background = "transparent";
      });
    });

    // Animation loop
    function animateCursor() {
      // Move dot to mouse position
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Smooth outline movement
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      cursorOutline.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Trail effect
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      cursorTrail.style.left = `${trailX}px`;
      cursorTrail.style.top = `${trailY}px`;

      // Create new trail dots
      if (Math.random() > 0.7) {
        const trailDot = document.createElement("div");
        trailDot.className = "cursor-trail-dot";
        trailDot.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: #7C3AED;
                    border-radius: 50%;
                    left: ${mouseX}px;
                    top: ${mouseY}px;
                    pointer-events: none;
                    z-index: 9995;
                `;
        document.body.appendChild(trailDot);

        // Animate and remove trail dot
        gsap.to(trailDot, {
          duration: 0.5,
          opacity: 0,
          scale: 0,
          onComplete: () => trailDot.remove(),
        });
      }

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide cursor on touch devices
    if ("ontouchstart" in window) {
      cursorDot.style.display = "none";
      cursorOutline.style.display = "none";
      cursorTrail.style.display = "none";
    }
  }

  // Particle System
  function initParticles() {
    const particlesContainer = document.querySelector(".particles-container");
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random properties
      const size = Math.random() * 4 + 1;
      const color = Math.random() > 0.5 ? "#00D4FF" : "#7C3AED";
      const startX = Math.random() * 100;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;

      particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${startX}%;
                bottom: -20px;
                opacity: ${Math.random() * 0.5 + 0.2};
                filter: blur(${size / 2}px);
                pointer-events: none;
            `;

      particlesContainer.appendChild(particle);

      // Animate particle
      gsap.to(particle, {
        y: -window.innerHeight - 100,
        x: `+=${(Math.random() - 0.5) * 100}`,
        duration: duration,
        delay: delay,
        ease: "none",
        onComplete: () => {
          particle.remove();
          createParticle();
        },
      });
    }

    // Hero name particle explosion on scroll
    const heroName = document.querySelector(".name");

    ScrollTrigger.create({
      trigger: heroName,
      start: "top 80%",
      onEnter: () => {
        for (let i = 0; i < 30; i++) {
          createExplosionParticle(heroName);
        }
      },
      once: true,
    });

    function createExplosionParticle(sourceElement) {
      const rect = sourceElement.getBoundingClientRect();
      const particle = document.createElement("div");

      const size = Math.random() * 6 + 2;
      const color = Math.random() > 0.5 ? "#00D4FF" : "#FF6B9D";

      particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                opacity: 0.8;
                filter: blur(${size / 2}px);
                pointer-events: none;
                z-index: 100;
            `;

      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const duration = Math.random() * 0.5 + 0.3;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: duration,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  }

  // Scroll Animations
  function initScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const elements = section.querySelectorAll(
        '.section-title, .section-line, [class*="content"], [class*="grid"], [class*="container"]',
      );

      elements.forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    });
  }

  // Typing Effects
  function initTypingEffects() {
    // Hero typing effect
    const typingText = document.querySelector(".typing-text");
    const typingSubtitle = document.querySelector(".typing-subtitle");
    const cursor = document.querySelector(".cursor");
    const cursorSubtitle = document.querySelector(".cursor-subtitle");

    if (typingText) {
      gsap.to(typingText, {
        duration: 1,
        text: "Hi, I'm",
        delay: 0.5,
        ease: "none",
      });

      // Name glitch effect on hover
      const name = document.querySelector(".name");
      name.addEventListener("mouseenter", () => {
        gsap.to(name, {
          duration: 0.1,
          x: () => (Math.random() - 0.5) * 10,
          y: () => (Math.random() - 0.5) * 10,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }

    if (typingSubtitle) {
      gsap.to(typingSubtitle, {
        duration: 2,
        text: "Full-Stack Developer | E-commerce PM → Tech Innovator",
        delay: 1.5,
        ease: "none",
        onComplete: () => {
          // Start cursor blinking
          gsap.to([cursor, cursorSubtitle], {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "none",
          });
        },
      });
    }

    // Contact form typing placeholders
    const formInputs = document.querySelectorAll(".form-input, .form-textarea");

    formInputs.forEach((input) => {
      const placeholder = input.getAttribute("placeholder");
      input.setAttribute("placeholder", "");

      let i = 0;
      const typeWriter = () => {
        if (i < placeholder.length) {
          input.setAttribute("placeholder", placeholder.substring(0, i + 1));
          i++;
          setTimeout(typeWriter, 50);
        }
      };

      // Start typing on focus
      input.addEventListener("focus", () => {
        if (input.getAttribute("placeholder") === "") {
          typeWriter();
        }
      });

      // Clear on blur if empty
      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.setAttribute("placeholder", "");
        }
      });
    });
  }

  // Skills Counters
  function initSkillsCounters() {
    const skillPercentElements = document.querySelectorAll(".skill-percent");
    const skillProgressElements = document.querySelectorAll(".skill-progress");

    // Create ScrollTrigger for skills section
    ScrollTrigger.create({
      trigger: "#skills",
      start: "top 70%",
      onEnter: () => {
        skillPercentElements.forEach((element, index) => {
          const target = parseInt(
            element.parentElement.nextElementSibling
              .querySelector(".skill-progress")
              .getAttribute("data-width"),
          );

          // Animate counter
          gsap.to(element, {
            duration: 2,
            innerText: target + "%",
            snap: { innerText: 1 },
            ease: "power2.out",
          });

          // Animate progress bar
          gsap.to(skillProgressElements[index], {
            duration: 2,
            width: target + "%",
            ease: "power2.out",
            delay: 0.1 * index,
          });
        });
      },
      once: true,
    });
  }

  // Project Cards
  function initProjectCards() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      // Magnetic effect
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = ((centerY - y) / centerY) * 5;

        gsap.to(card, {
          duration: 0.3,
          rotateY: rotateY,
          rotateX: rotateX,
          transformPerspective: 500,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          duration: 0.5,
          rotateY: 0,
          rotateX: 0,
          ease: "elastic.out(1, 0.3)",
        });
      });

      // Glow effect
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          duration: 0.3,
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          duration: 0.3,
          scale: 1,
          boxShadow: "none",
          ease: "power2.out",
        });
      });
    });
  }

  // Contact Form
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const submitButton = contactForm.querySelector(".form-submit");
    const ripple = submitButton.querySelector(".ripple");

    // Form submission
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Glitch effect on submit
      gsap.to(submitButton, {
        duration: 0.1,
        x: () => (Math.random() - 0.5) * 10,
        y: () => (Math.random() - 0.5) * 10,
        repeat: 5,
        yoyo: true,
        onComplete: () => {
          // Success animation
          gsap.to(submitButton, {
            duration: 0.3,
            background: "#00D4FF",
            scale: 0.95,
            yoyo: true,
            repeat: 1,
          });

          // Reset form
          setTimeout(() => {
            contactForm.reset();
            alert(
              "Message sent successfully! (This is a demo - form submission is disabled)",
            );
          }, 600);
        },
      });
    });

    // Ripple effect on button click
    submitButton.addEventListener("click", (e) => {
      const rect = submitButton.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 4, opacity: 0, duration: 0.6 },
      );
    });
  }

  // Mobile Menu Toggle
  function initMenuToggle() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll("span");
      if (menuToggle.classList.contains("active")) {
        gsap.to(spans[0], { rotate: 45, y: 8 });
        gsap.to(spans[1], { opacity: 0 });
        gsap.to(spans[2], { rotate: -45, y: -8 });
      } else {
        gsap.to(spans[0], { rotate: 0, y: 0 });
        gsap.to(spans[1], { opacity: 1 });
        gsap.to(spans[2], { rotate: 0, y: 0 });
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");

        const spans = menuToggle.querySelectorAll("span");
        gsap.to(spans[0], { rotate: 0, y: 0 });
        gsap.to(spans[1], { opacity: 1 });
        gsap.to(spans[2], { rotate: 0, y: 0 });
      });
    });
  }

  // Image Spotlight Effect
  function initImageSpotlight() {
    const imageSpotlight = document.querySelector(".image-spotlight");

    if (imageSpotlight) {
      document.addEventListener("mousemove", (e) => {
        const rect = imageSpotlight.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        imageSpotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, 
                    rgba(0, 212, 255, 0.3) 0%, 
                    transparent 50%)`;
      });
    }
  }

  // Lazy Loading Images
  function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Initialize remaining features
  initImageSpotlight();
  initLazyLoading();

  // Accessibility: Skip to main content
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0.1);
  }
});
