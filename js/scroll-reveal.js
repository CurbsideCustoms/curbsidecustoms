(() => {
  const newLogo = '/images/Curbside%20Detailing%20Logo.png';
  const newLogoAbsolute = 'https://www.curbsidedetailing.ca/images/Curbside%20Detailing%20Logo.png';

  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (src.endsWith('nob_logo.png') || src.endsWith('black_logo.png')) {
      img.src = newLogo;
      img.alt = 'Curbside Detailing';
    }
  });

  document.querySelectorAll('link[rel~="icon"]').forEach((icon) => {
    icon.href = newLogo;
  });

  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    script.textContent = script.textContent
      .replaceAll('https://www.curbsidedetailing.ca/images/black_logo.png', newLogoAbsolute)
      .replaceAll('https://www.curbsidedetailing.ca/images/nob_logo.png', newLogoAbsolute);
  });

  const googleReviewLink = document.querySelector('.google-review-copy .btn-primary');
  if (googleReviewLink) {
    googleReviewLink.href = 'https://share.google/aPkrRud2b8IiAiaex';
  }

  /* Homepage results preview: keep the landing page concise and send visitors to the full gallery. */
  const resultsSection = document.querySelector('#results');
  const resultsGrid = resultsSection?.querySelector('.results-grid');
  if (resultsGrid) {
    const resultCards = [...resultsGrid.querySelectorAll('.result-photo')];
    resultCards.slice(2).forEach((card) => {
      card.hidden = true;
    });

    resultsGrid.classList.add('results-preview-grid');

    if (!document.getElementById('results-preview-styles')) {
      const previewStyles = document.createElement('style');
      previewStyles.id = 'results-preview-styles';
      previewStyles.textContent = `
        .results-grid.results-preview-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: 360px;
          gap: 16px;
        }
        .results-grid.results-preview-grid .result-photo {
          grid-column: auto !important;
          grid-row: auto !important;
          min-width: 0;
        }
        .results-grid.results-preview-grid .result-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .results-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 28px;
        }
        .results-more-wrap .btn-secondary {
          min-width: 210px;
          background: #11151a;
          border-color: rgba(99, 212, 255, .28);
        }
        @media (max-width: 620px) {
          .results-grid.results-preview-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 270px);
          }
          .results-more-wrap .btn-secondary {
            width: 100%;
          }
        }
      `;
      document.head.appendChild(previewStyles);
    }

    if (!resultsSection.querySelector('.results-more-wrap')) {
      const moreWrap = document.createElement('div');
      moreWrap.className = 'results-more-wrap';
      moreWrap.innerHTML = '<a class="btn-secondary" href="/html/results.html">View More Results <span aria-hidden="true">→</span></a>';
      resultsGrid.insertAdjacentElement('afterend', moreWrap);
    }
  }

  /* Homepage-only quick scroll back to the top. */
  if (document.querySelector('.hero') && !document.querySelector('.quote-hero')) {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.type = 'button';
    scrollTopButton.className = 'scroll-top-button';
    scrollTopButton.setAttribute('aria-label', 'Back to top');
    scrollTopButton.setAttribute('title', 'Back to top');
    scrollTopButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5"></path>
        <path d="m6 11 6-6 6 6"></path>
      </svg>
    `;

    document.body.appendChild(scrollTopButton);

    const updateScrollTopButton = () => {
      scrollTopButton.classList.toggle('is-visible', window.scrollY > 420);
    };

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });

    window.addEventListener('scroll', updateScrollTopButton, { passive: true });
    updateScrollTopButton();
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
