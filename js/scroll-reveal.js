(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    '.section-heading',
    '.reason-card',
    '.service-card',
    '.result-photo',
    '.local-copy',
    '.local-photo',
    '.faq-list details',
    '.cta-panel',
    '.google-review-badge',
    '.google-review-copy',
    '.about-hero-copy',
    '.about-hero-photo',
    '.story-label',
    '.story-copy',
    '.value-card',
    '.about-feature-photo',
    '.about-feature-copy',
    '.contact-hero-grid > *',
    '.contact-info-card',
    '.contact-form-card',
    '.quote-hero .container',
    '.quote-info',
    '.quote-card',
    '.privacy-hero .container',
    '.privacy-summary',
    '.privacy-card'
  ];

  const targets = [...document.querySelectorAll(selectors.join(','))];
  if (!targets.length) return;

  document.documentElement.classList.add('reveal-ready');

  targets.forEach((target, index) => {
    target.dataset.reveal = '';
    target.dataset.revealDelay = String(index % 3);
  });

  let lastScrollY = window.scrollY;

  const observer = new IntersectionObserver((entries) => {
    const scrollingDown = window.scrollY >= lastScrollY;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--reveal-y', scrollingDown ? '14px' : '-14px');
        requestAnimationFrame(() => entry.target.classList.add('is-visible'));
      } else {
        entry.target.classList.remove('is-visible');
      }
    });

    lastScrollY = window.scrollY;
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -5% 0px'
  });

  targets.forEach((target) => observer.observe(target));
})();
