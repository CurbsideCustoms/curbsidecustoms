(() => {
  const mainFrame = document.getElementById('gallery-main-media');
  const mainTitle = document.getElementById('gallery-main-title');
  const mainMeta = document.getElementById('gallery-main-meta');
  const mainCount = document.getElementById('gallery-main-count');
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryEmpty = document.getElementById('gallery-empty');
  const filterButtons = [...document.querySelectorAll('[data-gallery-filter]')];

  if (!mainFrame || !galleryGrid) return;

  /*
    Video-ready format for future clips:
    { type: 'video', src: '/videos/featured-detail.mp4', poster: '/images/IMG_4039.jpeg', title: 'Featured transformation', meta: 'Exterior detail' }
  */
  const mediaItems = [
    { type: 'image', src: '/images/IMG_4039.jpeg', title: 'Volkswagen GTI finish', meta: 'Recent detailing result' },
    { type: 'image', src: '/images/IMG_3324.jpeg', title: 'Honda Civic detail', meta: 'Interior and exterior finish' },
    { type: 'image', src: '/images/IMG_4018.jpeg', title: 'Fresh exterior finish', meta: 'Recent work' },
    { type: 'image', src: '/images/IMG_3325.jpeg', title: 'Clean exterior result', meta: 'Recent work' },
    { type: 'image', src: '/images/E84AAE16-5E92-4804-B75D-E8DF3A781392.jpeg', title: 'Detailed vehicle finish', meta: 'Recent work' },
    { type: 'image', src: '/images/IMG_4010.jpeg', title: 'Detailing result 01', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4012.jpeg', title: 'Detailing result 02', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4014.jpeg', title: 'Detailing result 03', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4017.jpeg', title: 'Detailing result 04', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4023.jpeg', title: 'Detailing result 05', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4025.jpeg', title: 'Detailing result 06', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4032.jpeg', title: 'Detailing result 07', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4033.jpeg', title: 'Detailing result 08', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4037.jpeg', title: 'Detailing result 09', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4042.jpeg', title: 'Detailing result 10', meta: 'Curbside Detailing' },
    { type: 'image', src: '/images/IMG_4049.jpeg', title: 'Detailing result 11', meta: 'Curbside Detailing' }
  ];

  let activeIndex = 0;
  let activeFilter = 'all';

  const renderMainMedia = (index) => {
    const item = mediaItems[index];
    if (!item) return;

    activeIndex = index;
    mainFrame.replaceChildren();

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      if (item.poster) video.poster = item.poster;
      video.controls = true;
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', item.title);
      mainFrame.appendChild(video);
      video.play().catch(() => {});
    } else {
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.title;
      image.decoding = 'async';
      mainFrame.appendChild(image);
    }

    mainTitle.textContent = item.title;
    mainMeta.textContent = item.meta;
    mainCount.textContent = `${index + 1} / ${mediaItems.length}`;

    galleryGrid.querySelectorAll('.gallery-thumb').forEach((thumb) => {
      const isActive = Number(thumb.dataset.mediaIndex) === index;
      thumb.classList.toggle('is-active', isActive);
      thumb.setAttribute('aria-pressed', String(isActive));
    });
  };

  const renderGallery = () => {
    galleryGrid.replaceChildren();

    const visibleItems = mediaItems
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => activeFilter === 'all' || item.type === activeFilter);

    galleryEmpty.classList.toggle('is-visible', visibleItems.length === 0);

    visibleItems.forEach(({ item, index }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumb';
      button.dataset.mediaIndex = String(index);
      button.setAttribute('aria-label', `Show ${item.title}`);
      button.setAttribute('aria-pressed', String(index === activeIndex));

      const preview = document.createElement('img');
      preview.src = item.type === 'video' && item.poster ? item.poster : item.src;
      preview.alt = '';
      preview.loading = 'lazy';
      preview.decoding = 'async';

      const label = document.createElement('span');
      label.className = 'gallery-thumb-label';
      label.textContent = item.title;

      const type = document.createElement('span');
      type.className = 'gallery-thumb-type';
      type.textContent = item.type === 'video' ? 'Play' : 'Photo';

      button.append(preview, label, type);
      button.addEventListener('click', () => {
        renderMainMedia(index);
        mainFrame.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'nearest'
        });
      });

      galleryGrid.appendChild(button);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.galleryFilter;
      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle('is-active', isActive);
        candidate.setAttribute('aria-pressed', String(isActive));
      });
      renderGallery();
    });
  });

  renderGallery();
  renderMainMedia(activeIndex);
})();
