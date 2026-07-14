document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     NAVBAR
  ============================== */

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ==============================
     REVEAL ON SCROLL
  ============================== */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ==============================
     PARTICLES (Hero)
  ============================== */

  const heroCanvas = document.getElementById('particles');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeHeroCanvas() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = ['#4facfe', '#a855f7', '#22d3ee', '#ec4899'][Math.floor(Math.random() * 4)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function initParticles() {
      resizeHeroCanvas();
      const count = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 8000), 60);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      animFrame = requestAnimationFrame(animateParticles);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeHeroCanvas();
      }, 200);
    }, { passive: true });

    initParticles();
    animateParticles();
  }

  /* ==============================
     DEMO PARTICLES
  ============================== */

  const demoCanvas = document.getElementById('demo-particles');
  if (demoCanvas) {
    const demoCtx = demoCanvas.getContext('2d');
    let demoParticles = [];

    function resizeDemoCanvas() {
      const parent = demoCanvas.parentElement;
      demoCanvas.width = parent.offsetWidth;
      demoCanvas.height = parent.offsetHeight;
    }

    class DemoParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * demoCanvas.width;
        this.y = Math.random() * demoCanvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() * 60 + 200;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > demoCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > demoCanvas.height) this.speedY *= -1;
      }

      draw() {
        demoCtx.beginPath();
        demoCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        demoCtx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        demoCtx.fill();
      }
    }

    function initDemoParticles() {
      resizeDemoCanvas();
      demoParticles = Array.from({ length: 20 }, () => new DemoParticle());
    }

    function animateDemoParticles() {
      demoCtx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
      demoParticles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateDemoParticles);
    }

    window.addEventListener('resize', resizeDemoCanvas, { passive: true });
    initDemoParticles();
    animateDemoParticles();
  }

  /* ==============================
     PARALLAX ON SCROLL
  ============================== */

  const parallaxElements = document.querySelectorAll('.blob');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach((el, i) => {
      const speed = 0.05 + (i * 0.02);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ==============================
     COMPARISON SLIDER
  ============================== */

  const sliderContainer = document.querySelector('.comparison-slider-container');
  const sliderHandle = document.querySelector('.comparison-slider-handle');
  const sliderBefore = document.querySelector('.comparison-slider-before');

  if (sliderContainer && sliderHandle && sliderBefore) {
    let isDragging = false;

    function setSliderPosition(x) {
      const rect = sliderContainer.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(10, Math.min(90, pos));
      sliderBefore.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      sliderHandle.style.left = `${pos}%`;
    }

    sliderHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    sliderHandle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: false });

    document.addEventListener('mouseup', () => { isDragging = false; });
    document.addEventListener('touchend', () => { isDragging = false; });

    sliderContainer.addEventListener('click', (e) => {
      setSliderPosition(e.clientX);
    });
  }

  /* ==============================
     PARALLAX DEMO (mouse)
  ============================== */

  const parallaxDemo = document.querySelector('.animation-parallax-target');
  if (parallaxDemo) {
    const layers = parallaxDemo.querySelectorAll('.animation-parallax-layer');

    parallaxDemo.addEventListener('mousemove', (e) => {
      const rect = parallaxDemo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.2;
        layer.style.transform = `translate(${x * 40 * depth}px, ${y * 40 * depth}px)`;
        layer.style.transition = 'none';
      });
    });

    parallaxDemo.addEventListener('mouseleave', () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate(0, 0)';
        layer.style.transition = 'transform 0.4s ease';
      });
    });
  }

  /* ==============================
     STATS COUNTER
  ============================== */

  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ==============================
     CURSOR FOLLOWER
  ============================== */

  const cursor = document.querySelector('.cursor-follower');
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('.principle-card, .gallery-card, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.opacity = '0.6';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.opacity = '1';
      });
    });
  }

  /* ==============================
     TILT EFFECT ON CARDS
  ============================== */

  const tiltCards = document.querySelectorAll('.principle-card, .gallery-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
});
