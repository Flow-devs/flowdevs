const header = document.getElementById('header');

if (window.pageYOffset > 50) {
header.classList.add('scrolled');
}

let ticking = false;
window.addEventListener('scroll', () => {
if (!ticking) {
window.requestAnimationFrame(() => {
if (window.pageYOffset > 50) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
ticking = false;
});
ticking = true;
}
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
revealObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.12,
rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
const headerHeight = header.offsetHeight;
const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});

document.querySelectorAll('.hero-buttons a[href^="#"]').forEach(btn => {
btn.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
const headerHeight = header.offsetHeight;
const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});

const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');

if (backToTop) {
backToTop.addEventListener('click', function(e) {
e.preventDefault();
window.scrollTo({ top: 0, behavior: 'smooth' });
});
}

window.addEventListener('scroll', () => {
const scrollTop = window.pageYOffset;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
if (docHeight > 0 && progressBar) {
progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}
if (backToTop) {
backToTop.classList.toggle('visible', scrollTop > 400);
}
}, { passive: true });

const hero = document.getElementById('hero');
const cursorGlow = document.querySelector('.cursor-glow');
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');
const blob3 = document.querySelector('.blob-3');
const heroContent = document.querySelector('.hero-content');
const particlesContainer = document.querySelector('.hero-particles');

let mouseX = 0;
let mouseY = 0;
let targetMX = 0;
let targetMY = 0;

hero.addEventListener('mousemove', (e) => {
const rect = hero.getBoundingClientRect();
targetMX = (e.clientX - rect.left) / rect.width - 0.5;
targetMY = (e.clientY - rect.top) / rect.height - 0.5;
if (cursorGlow) {
cursorGlow.style.left = e.clientX - rect.left + 'px';
cursorGlow.style.top = e.clientY - rect.top + 'px';
}
});

hero.addEventListener('mouseleave', () => {
targetMX = 0;
targetMY = 0;
});

if (particlesContainer) {
for (let i = 0; i < 35; i++) {
const p = document.createElement('div');
p.className = 'hero-particle';
const startX = Math.random() * 100;
const startY = Math.random() * 100;
const driftX = (Math.random() - 0.5) * 2;
const driftY = -0.3 - Math.random() * 0.5;
const size = 2 + Math.random() * 4;
p.style.left = startX + '%';
p.style.top = startY + '%';
p.style.width = size + 'px';
p.style.height = size + 'px';
p.dataset.driftX = driftX;
p.dataset.driftY = driftY;
p.dataset.baseX = startX;
p.dataset.baseY = startY;
particlesContainer.appendChild(p);
}
}

let blobTime = 0;
const particles = particlesContainer ? particlesContainer.querySelectorAll('.hero-particle') : [];

function animateBlobs() {
blobTime += 0.004;

mouseX += (targetMX - mouseX) * 0.05;
mouseY += (targetMY - mouseY) * 0.05;

if (blob1) {
const bx1 = Math.sin(blobTime * 0.7) * 60 + mouseX * 50;
const by1 = Math.cos(blobTime * 0.5) * 50 + mouseY * 50;
const scale1 = 1 + Math.sin(blobTime * 0.3) * 0.08;
blob1.style.transform = `translate(${bx1}px, ${by1}px) scale(${scale1})`;
}

if (blob2) {
const bx2 = Math.cos(blobTime * 0.5) * 50 + mouseX * 40;
const by2 = Math.sin(blobTime * 0.6) * 40 + mouseY * 40;
const scale2 = 1 + Math.cos(blobTime * 0.4) * 0.1;
blob2.style.transform = `translate(${bx2}px, ${by2}px) scale(${scale2})`;
}

if (blob3) {
const bx3 = Math.sin(blobTime * 0.4) * 40 + mouseX * 35;
const by3 = Math.cos(blobTime * 0.3) * 40 + mouseY * 35;
const scale3 = 1 + Math.sin(blobTime * 0.5) * 0.15;
blob3.style.transform = `translate(calc(-50% + ${bx3}px), calc(-50% + ${by3}px)) scale(${scale3})`;
}

if (heroContent) {
const tiltX = -mouseY * 10;
const tiltY = mouseX * 10;
heroContent.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

particles.forEach((p, i) => {
const dx = parseFloat(p.dataset.driftX);
const dy = parseFloat(p.dataset.driftY);
const baseX = parseFloat(p.dataset.baseX);
const baseY = parseFloat(p.dataset.baseY);
const offsetX = Math.sin(blobTime * 0.5 + i) * 15;
const offsetY = Math.cos(blobTime * 0.4 + i) * 10;
const px = baseX + offsetX * 0.3 + mouseX * 8 + dx * blobTime * 20 % 100;
const py = baseY + offsetY * 0.3 + mouseY * 8 + dy * blobTime * 30 % 100;
p.style.transform = `translate(${px - baseX}px, ${py - baseY}px)`;
p.style.opacity = 0.2 + Math.sin(blobTime * 1.5 + i * 2) * 0.15;
});

requestAnimationFrame(animateBlobs);
}

animateBlobs();

const portfolioData = [
{
title: 'Creator Video Hub & Review Platform',
description: 'A custom web ecosystem designed for video creators featuring a curated video archive, real-time subscriber milestone tracking, and interactive community review boards.',
tags: ['Web Development', 'JavaScript', 'Responsive UI'],
gradient: 'linear-gradient(135deg, #7C3AED, #4F46E5, #06B6D4)',
icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
link: 'demo-creator-hub.html'
},
{
title: 'Streamer Landing Page & Schedule Dashboard',
description: 'A high-impact landing page built for live streamers featuring dynamic schedule tracking, social media hubs, and automated live-status alerts.',
tags: ['Web Development', 'JavaScript UI/UX', 'CSS Animations'],
gradient: 'linear-gradient(135deg, #0E7490, #06B6D4, #0891B2)',
icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
link: 'demo-streamer-dashboard.html'
},
{
title: 'Modern Corporate & Business Landing Page',
description: 'A sleek, high-conversion landing page built for modern corporate brands or local businesses, featuring interactive service sections, client testimonials, and a custom contact interface.',
tags: ['Web Development', 'Vanilla JS', 'Premium UI/UX'],
gradient: 'linear-gradient(135deg, #065F46, #10B981, #3B82F6)',
icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>',
link: 'demo-corporate-landing.html'
}
];

const modalOverlay = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.portfolio-card').forEach(card => {
card.addEventListener('click', function() {
const index = parseInt(this.dataset.project);
const project = portfolioData[index];

if (modalImage) modalImage.style.background = project.gradient;
if (modalIcon) modalIcon.innerHTML = project.icon;
if (modalTitle) modalTitle.textContent = project.title;
if (modalDesc) modalDesc.textContent = project.description;
if (modalTags) {
modalTags.innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');
}
if (modalLink) modalLink.href = project.link;

if (modalOverlay) modalOverlay.classList.add('active');
document.body.style.overflow = 'hidden';
});
});

function closeModal() {
if (modalOverlay) modalOverlay.classList.remove('active');
document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);

if (modalOverlay) {
modalOverlay.addEventListener('click', function(e) {
if (e.target === this) closeModal();
});
}

document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
closeModal();
}
});

document.querySelectorAll('.discord-copy').forEach(el => {
el.addEventListener('click', async function() {
const text = this.dataset.discord || this.textContent;
try {
await navigator.clipboard.writeText(text);
this.classList.add('copied');
setTimeout(() => this.classList.remove('copied'), 1500);
} catch {
const range = document.createRange();
range.selectNodeContents(this);
const selection = window.getSelection();
selection.removeAllRanges();
selection.addRange(range);
document.execCommand('copy');
selection.removeAllRanges();
this.classList.add('copied');
setTimeout(() => this.classList.remove('copied'), 1500);
}
});
});