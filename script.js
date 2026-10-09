const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const progressBar = document.getElementById('progressBar');
const year = document.getElementById('year');
const placeholderHint = document.getElementById('placeholderHint');

// Replace these with Rasika's real public profile URLs before publishing.
const profileLinks = {
  linkedin: '',
  github: ''
};

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const placeholderLinks = document.querySelectorAll('[data-placeholder-link]');
placeholderLinks.forEach(link => {
  const key = link.textContent.trim().toLowerCase();
  const url = profileLinks[key];
  if (url) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.removeAttribute('data-placeholder-link');
  } else {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (placeholderHint) placeholderHint.hidden = false;
    });
  }
});
