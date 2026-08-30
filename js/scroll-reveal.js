(() => {
  const OLD_NAME = 'Curbside Customs';
  const NEW_NAME = 'Curbside Detailing';

  const replaceBrand = (value) => typeof value === 'string' ? value.replaceAll(OLD_NAME, NEW_NAME) : value;

  document.title = replaceBrand(document.title);

  document.querySelectorAll('meta[content]').forEach(meta => {
    meta.setAttribute('content', replaceBrand(meta.getAttribute('content')));
  });

  document.querySelectorAll('[alt], [aria-label], [title], input[value]').forEach(element => {
    ['alt', 'aria-label', 'title', 'value'].forEach(attribute => {
      if (element.hasAttribute(attribute)) {
        element.setAttribute(attribute, replaceBrand(element.getAttribute(attribute)));
      }
    });
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    script.textContent = replaceBrand(script.textContent);
  });

  if (document.body) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      node.nodeValue = replaceBrand(node.nodeValue);
    });
  }

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
