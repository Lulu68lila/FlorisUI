document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() < 0.33 ? 270 : Math.random() < 0.5 ? 330 : 190;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.3;
        this.x -= dx / dist * force;
        this.y -= dy / dist * force;
      }

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(270, 50%, 60%, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.update();
      p.draw();
    }

    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  });

  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.navbar__links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.navbar__links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.principle-card, .playground-card, .compare-card, .intro__grid').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .principle-card:nth-child(2) { transition-delay: 0.05s; }
    .principle-card:nth-child(3) { transition-delay: 0.1s; }
    .principle-card:nth-child(4) { transition-delay: 0.15s; }
    .principle-card:nth-child(5) { transition-delay: 0.2s; }
    .principle-card:nth-child(6) { transition-delay: 0.25s; }
    .principle-card:nth-child(7) { transition-delay: 0.3s; }
    .playground-card:nth-child(2) { transition-delay: 0.1s; }
    .playground-card:nth-child(3) { transition-delay: 0.2s; }
    .playground-card:nth-child(4) { transition-delay: 0.3s; }
    .playground-card:nth-child(5) { transition-delay: 0.4s; }
    .playground-card:nth-child(6) { transition-delay: 0.5s; }
    .playground-card:nth-child(7) { transition-delay: 0.6s; }
    .playground-card:nth-child(8) { transition-delay: 0.7s; }
    .playground-card:nth-child(9) { transition-delay: 0.8s; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.principle-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    });
  });

  const heroBloom = document.getElementById('hero-bloom');
  if (heroBloom) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const rect = document.querySelector('.hero').getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroBloom.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
  }

  const demoBtn = document.getElementById('bloom-btn-demo');
  const btnState = document.getElementById('btn-state');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      btnState.textContent = '✨ Éclosion!';
      btnState.style.color = 'var(--pink-light)';
      setTimeout(() => {
        btnState.textContent = 'En attente...';
        btnState.style.color = '';
      }, 1500);
    });
  }

  const toggle = document.getElementById('bloom-toggle');
  const toggleState = document.getElementById('toggle-state');
  if (toggle) {
    const input = toggle.querySelector('input');
    input.addEventListener('change', () => {
      toggleState.textContent = input.checked ? '🌸 Activé' : 'Désactivé';
      toggleState.style.color = input.checked ? 'var(--pink-light)' : '';
    });
  }

  const dragCard = document.getElementById('drag-card');
  if (dragCard) {
    let isDragging = false;
    let startX, startY, origX, origY;

    const onStart = (e) => {
      isDragging = true;
      const rect = dragCard.getBoundingClientRect();
      const container = dragCard.parentElement.getBoundingClientRect();
      origX = rect.left - container.left;
      origY = rect.top - container.top;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      dragCard.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startX;
      const dy = clientY - startY;
      const container = dragCard.parentElement;
      const cRect = container.getBoundingClientRect();
      let newX = origX + dx;
      let newY = origY + dy;
      newX = Math.max(0, Math.min(cRect.width - 100, newX));
      newY = Math.max(0, Math.min(cRect.height - 100, newY));
      dragCard.style.left = newX + 'px';
      dragCard.style.top = newY + 'px';
      dragCard.style.transform = 'none';
    };

    const onEnd = () => {
      isDragging = false;
      dragCard.style.cursor = 'grab';
    };

    dragCard.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    dragCard.addEventListener('touchstart', onStart);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  const sliderInput = document.querySelector('.bloom-slider__input');
  const sliderFill = document.getElementById('slider-fill');
  const sliderThumb = document.getElementById('slider-thumb');
  const sliderValue = document.getElementById('slider-value');
  if (sliderInput) {
    const updateSlider = () => {
      const val = sliderInput.value;
      sliderFill.style.width = val + '%';
      sliderThumb.style.left = val + '%';
      sliderValue.textContent = val;
    };
    sliderInput.addEventListener('input', updateSlider);
    updateSlider();
  }

  const rippleZone = document.getElementById('ripple-zone');
  if (rippleZone) {
    rippleZone.addEventListener('click', (e) => {
      const rect = rippleZone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = 40;
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (x - size / 2) + 'px';
      ripple.style.top = (y - size / 2) + 'px';
      rippleZone.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  document.querySelectorAll('.bloom-accordion__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reveal = document.querySelector(`.bloom-accordion__reveal[data-acc="${btn.dataset.acc}"]`);
      const accordion = btn.closest('.bloom-accordion');
      const isOpen = reveal.classList.contains('open');
      document.querySelectorAll('.bloom-accordion__reveal.open').forEach(r => r.classList.remove('open'));
      document.querySelectorAll('.bloom-accordion.open').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        reveal.classList.add('open');
        accordion.classList.add('open');
      }
    });
  });

  const bloomInput = document.getElementById('bloom-input');
  const inputCounter = document.getElementById('input-counter');
  if (bloomInput) {
    bloomInput.addEventListener('input', () => {
      const len = bloomInput.value.length;
      inputCounter.textContent = `${len}/20`;
      inputCounter.classList.toggle('full', len >= 18);
    });
  }

  const bloomPulse = document.getElementById('bloom-pulse');
  const pulseToggle = document.getElementById('pulse-toggle');
  if (bloomPulse && pulseToggle) {
    pulseToggle.addEventListener('click', () => {
      bloomPulse.classList.toggle('paused');
      pulseToggle.classList.toggle('paused');
      const dot = pulseToggle.querySelector('.bloom-pulse__btn-dot');
      if (bloomPulse.classList.contains('paused')) {
        pulseToggle.innerHTML = '<span class="bloom-pulse__btn-dot" style="background:var(--pink);box-shadow:0 0 10px var(--pink)"></span> Play';
      } else {
        pulseToggle.innerHTML = '<span class="bloom-pulse__btn-dot"></span> Pause';
      }
    });
  }

  console.log('🌸 BloomUI — Interfaces that Bloom');
});
