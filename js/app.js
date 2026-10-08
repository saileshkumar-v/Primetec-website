document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll Effect
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky Navbar Scroll Effect & Active Section Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }

    // Active Section Scrollspy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile Nav Toggle
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    navToggle?.classList.toggle('open');
  });

  // Mobile Dropdowns Toggle (Top Level Parent Click)
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link.has-dropdown');
    if (link && window.innerWidth <= 1024) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('open');
      });
    }
  });

  // Dropdown Items Click Handler (Redirection + Modal Trigger)
  document.querySelectorAll('.dropdown-menu a').forEach(a => {
    a.addEventListener('click', (e) => {
      // Close mobile menu & dropdowns
      navMenu?.classList.remove('open');
      navToggle?.classList.remove('open');
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('open'));

      // If item triggers a spec modal popup
      if (a.dataset.modal) {
        e.preventDefault();
        const targetId = a.getAttribute('href');
        const targetSec = targetId ? document.querySelector(targetId) : null;
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }

        const title = a.dataset.title || '';
        const category = a.dataset.category || '';
        const img = a.dataset.img || '';
        const desc = a.dataset.desc || '';

        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory) modalCategory.textContent = category;
        if (modalImg) modalImg.src = img;
        if (modalDesc) modalDesc.textContent = desc;

        setTimeout(() => {
          detailModal?.classList.add('open');
          document.body.style.overflow = 'hidden';
        }, 300);
      }
    });
  });

  // Close Mobile Nav on Standard Link Click
  navMenu?.querySelectorAll('a:not(.has-dropdown)').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle?.classList.remove('open');
    });
  });

  // Set Current Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Gallery Filters
  const filtersContainer = document.getElementById('galleryFilters');
  const galleryItems = document.querySelectorAll('.g-item');

  filtersContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    
    filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.dataset.cat === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Close Modals Helper & Scroll Lock Restoration
  const closeAllModals = () => {
    detailModal?.classList.remove('open');
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  };
  window.closeAllModals = closeAllModals;

  // Lightbox Image Preview
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.g-item, .t-card').forEach(item => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Preview';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeAllModals);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeAllModals();
  });

  // Detail Modal Popup Handler (Delegated Card Clicks)
  const detailModal = document.getElementById('detailModal');
  const modalClose = document.getElementById('modalClose');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalQuoteBtn = document.getElementById('modalQuoteBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');

  document.querySelectorAll('.product-card, .cap-card, [data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
      const trigger = card.dataset.modal ? card : card.querySelector('[data-modal]');
      if (!trigger) return;
      e.preventDefault();

      const title = trigger.dataset.title || '';
      const category = trigger.dataset.category || '';
      const img = trigger.dataset.img || '';
      const desc = trigger.dataset.desc || '';

      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalImg) modalImg.src = img;
      if (modalDesc) modalDesc.textContent = desc;

      detailModal?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose?.addEventListener('click', closeAllModals);
  modalCancelBtn?.addEventListener('click', closeAllModals);
  modalQuoteBtn?.addEventListener('click', closeAllModals);
  detailModal?.addEventListener('click', (e) => {
    if (e.target === detailModal) closeAllModals();
  });

  // Press ESC key to close open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formNote) {
      formNote.style.color = '#C8A96B';
      formNote.style.fontWeight = '600';
      formNote.textContent = 'Thank you for your enquiry. We will contact you shortly at your registered phone / email.';
    }
    contactForm.reset();
  });

  // =========================================================================
  // CINEMATIC HERO AUTO-SLIDER (3-SECOND INTERVAL + TRANSITIONS + CONTROLS)
  // =========================================================================
  const heroSection = document.getElementById('home');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('.indicator-dot');
  const heroPrevBtn = document.getElementById('heroPrev');
  const heroNextBtn = document.getElementById('heroNext');

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = heroSlides.length;
    const slideDuration = 3000; // 3 seconds
    let autoplayTimer = null;

    function goToSlide(index) {
      // Remove active state from current slide & dot
      heroSlides[currentSlide].classList.remove('active');
      if (heroIndicators[currentSlide]) {
        heroIndicators[currentSlide].classList.remove('active');
      }

      // Calculate new slide index
      currentSlide = (index + totalSlides) % totalSlides;

      // Add active state to target slide & dot
      heroSlides[currentSlide].classList.add('active');
      if (heroIndicators[currentSlide]) {
        heroIndicators[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, slideDuration);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    // Navigation Arrow Events
    heroNextBtn?.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });

    heroPrevBtn?.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });

    // Indicator Dot Events
    heroIndicators.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoplay();
      });
    });

    // Hover Pause / Resume on Desktop
    heroSection?.addEventListener('mouseenter', stopAutoplay);
    heroSection?.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    heroSection?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    }, { passive: true });

    // Initialize Autoplay
    startAutoplay();
  }
});

