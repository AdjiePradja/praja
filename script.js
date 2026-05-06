// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ── FAQ TOGGLE ──
function toggleFaq(el) {
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

// ── PROCESS TAB SWITCHING
const processTabs = document.querySelectorAll('.feature-tab[data-process]');
const processPanes = document.querySelectorAll('.process-tab-pane');
processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        processTabs.forEach(t => t.classList.remove('active'));
        processPanes.forEach(pane => pane.style.display = 'none');

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-process');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.style.display = 'block';
    });
});

// ── BILLING TOGGLE (removed - fixed pricing) ──

// ── FEATURE HOVER EFFECT (CSS-based inside card) ──
const featureCards = document.querySelectorAll('.feature-card[data-hover-img]');
featureCards.forEach(card => {
    const imgSrc = card.getAttribute('data-hover-img');
    const titleText = card.querySelector('.feature-card-title') ? card.querySelector('.feature-card-title').innerText : '';
    const descText = card.querySelector('.feature-card-desc') ? card.querySelector('.feature-card-desc').innerText : '';

    const overlay = document.createElement('div');
    overlay.className = 'feature-hover-overlay';
    overlay.innerHTML = `
        <img src="${imgSrc}" class="f-hover-img" alt="${titleText}">
        <div class="f-hover-grad"></div>
        <div class="f-hover-content">
            <div class="f-hover-title">${titleText}</div>
            <div class="f-hover-desc">${descText}</div>
        </div>
    `;
    card.appendChild(overlay);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── HERO SLIDER ──
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
let heroAutoPlay;

function updateHeroSlider() {
    if (heroSlides.length === 0) return;
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next', 'hidden');

        if (i === heroIndex) {
            slide.classList.add('active');
        } else if (i === (heroIndex - 1 + heroSlides.length) % heroSlides.length) {
            slide.classList.add('prev');
        } else if (i === (heroIndex + 1) % heroSlides.length) {
            slide.classList.add('next');
        } else {
            slide.classList.add('hidden');
        }
    });
}

function nextHero() {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHeroSlider();
}

function switchHero(index) {
    heroIndex = index;
    updateHeroSlider();
    resetHeroInterval();
}

function resetHeroInterval() {
    clearInterval(heroAutoPlay);
    heroAutoPlay = setInterval(nextHero, 4500);
}

if (heroSlides.length > 0) {
    updateHeroSlider();
    resetHeroInterval();
}

// ── USECASES TABS AUTOPLAY ──
const usecaseTabs = document.querySelectorAll('.usecase-tab');
const usecaseImgLayers = document.querySelectorAll('.usecase-img-layer');
const usecaseCircle = document.getElementById('usecase-circle');
let currentUsecaseIndex = 0;
let usecaseInterval;

function switchUsecase(index) {
    usecaseTabs.forEach(t => t.classList.remove('active'));
    const selectedTab = usecaseTabs[index];
    selectedTab.classList.add('active');

    // Crossfade images using layers instead of changing src
    usecaseImgLayers.forEach(img => img.classList.remove('active'));
    usecaseImgLayers[index].classList.add('active');

    usecaseCircle.style.background = selectedTab.getAttribute('data-color');

    currentUsecaseIndex = index;
    resetUsecaseInterval();
}

function nextUsecase() {
    let nextIndex = currentUsecaseIndex + 1;
    if (nextIndex >= usecaseTabs.length) nextIndex = 0;
    switchUsecase(nextIndex);
}

function resetUsecaseInterval() {
    clearInterval(usecaseInterval);
    usecaseInterval = setInterval(nextUsecase, 4000);
}

if (usecaseTabs.length > 0) {
    resetUsecaseInterval();
}