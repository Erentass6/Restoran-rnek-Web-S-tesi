// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2000);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
});
document.querySelectorAll('a, button, .menu-item, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 8 + 's';
  p.style.animationDuration = (5 + Math.random() * 10) + 's';
  particlesContainer.appendChild(p);
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 5000);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== MENU FILTER =====
document.querySelectorAll('.menu-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.menu-item').forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = 'flex';
        item.style.animation = 'fadeIn 0.5s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== TESTIMONIAL SLIDER =====
const tSlides = document.querySelectorAll('.testimonial-slide');
const tDots = document.querySelectorAll('.testimonial-dot');
let tCurrent = 0;

function showTestimonial(i) {
  tSlides.forEach(s => s.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  tSlides[i].classList.add('active');
  tDots[i].classList.add('active');
  tCurrent = i;
}

tDots.forEach(dot => {
  dot.addEventListener('click', () => showTestimonial(parseInt(dot.dataset.slide)));
});

setInterval(() => {
  showTestimonial((tCurrent + 1) % tSlides.length);
}, 6000);

// ===== FORM =====
document.getElementById('reservationForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  btn.textContent = '✓ Rezervasyonunuz Alındı!';
  btn.style.background = '#2d6b3e';
  setTimeout(() => {
    btn.textContent = 'Rezervasyon Yap';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== COUNTER ANIMATION =====
const counterEl = document.querySelector('.about-experience .number');
if (counterEl) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      let count = 0;
      const target = parseInt(counterEl.textContent);
      const interval = setInterval(() => {
        count++;
        counterEl.textContent = count;
        if (count >= target) clearInterval(interval);
      }, 100);
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });
  counterObserver.observe(counterEl);
}
