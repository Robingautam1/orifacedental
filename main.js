/* ================================================
   ORIIFACE DENTAL - MAIN JS
   Navigation, scroll, lightbox, form, timeline
   ================================================ */

(function () {
  'use strict';

  // --- DOM Elements ---
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileLinks = document.querySelectorAll('.mobile-nav__link');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var galleryImages = document.querySelectorAll('[data-lightbox]');
  var contactForm = document.getElementById('contact-form');
  var timelineItems = document.querySelectorAll('.timeline__item[data-animate]');

  // --- Header scroll shadow ---
  var lastScroll = 0;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger menu ---
  function toggleMobileNav() {
    var isOpen = mobileNav.classList.contains('mobile-nav--open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileNav.classList.add('mobile-nav--open');
    hamburger.classList.add('hamburger--active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('mobile-nav--open');
    hamburger.classList.remove('hamburger--active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileNav);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Lightbox ---
  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileNav();
    }
  });

  // --- Contact form ---
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var hasError = false;
      var nameInput = document.getElementById('form-name');
      var phoneInput = document.getElementById('form-phone');
      var serviceInput = document.getElementById('form-service');
      var submitBtn = document.getElementById('form-submit-btn');

      var nameErr = document.getElementById('error-name');
      var phoneErr = document.getElementById('error-phone');
      var serviceErr = document.getElementById('error-service');

      // Reset
      [nameInput, phoneInput, serviceInput].forEach(function(el) { el.classList.remove('is-invalid'); });
      [nameErr, phoneErr, serviceErr].forEach(function(el) { el.classList.remove('is-visible'); el.textContent = ''; });

      var name = nameInput.value.trim();
      var phone = phoneInput.value.trim();
      var service = serviceInput.value;

      if (!name) {
        nameInput.classList.add('is-invalid');
        nameErr.textContent = 'Please enter your name.';
        nameErr.classList.add('is-visible');
        hasError = true;
      }
      
      if (!phone) {
        phoneInput.classList.add('is-invalid');
        phoneErr.textContent = 'Please enter your phone number.';
        phoneErr.classList.add('is-visible');
        hasError = true;
      }

      if (!service) {
        serviceInput.classList.add('is-invalid');
        serviceErr.textContent = 'Please select a service.';
        serviceErr.classList.add('is-visible');
        hasError = true;
      }

      if (hasError) return;

      // Show sending state
      var originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      // Build WhatsApp message
      var time = document.getElementById('form-time').value.trim();
      var message = 'Hi, I would like to book an appointment at Oriiface Dental Care.\n\n';
      message += 'Name: ' + name + '\n';
      message += 'Phone: ' + phone + '\n';
      message += 'Service: ' + serviceInput.selectedOptions[0].text + '\n';
      if (time) {
        message += 'Preferred Time: ' + time + '\n';
      }

      // UX Delay for request feeling
      setTimeout(function() {
        var whatsappUrl = 'https://wa.me/919540670276?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');

        var formEl = document.getElementById('contact-form');
        formEl.innerHTML = '<div style="text-align:center;padding:2rem 0"><h3 style="font-family:var(--font-heading);margin-bottom:0.5rem;color:var(--color-primary)">Request Sent</h3><p style="color:var(--color-text-light)">We will get back to you shortly. You can also reach us at 095406 70276.</p></div>';
      }, 600);
    });
  }

  // --- Scroll reveal animations ---
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var triggerPoint = windowHeight - 80;
      if (top < triggerPoint) {
        el.classList.add('revealed');
      }
    });

    // Timeline items
    timelineItems.forEach(function (item, index) {
      var top = item.getBoundingClientRect().top;
      var triggerPoint = windowHeight - 60;
      if (top < triggerPoint) {
        setTimeout(function () {
          item.classList.add('animate-in');
        }, index * 150);
      }
    });
  }

  // Add reveal class to sections
  var revealSections = document.querySelectorAll(
    '.about__grid, .credentials, .timeline, ' +
    '.service-card, ' +
    '.why-card, ' +
    '.review-card, ' +
    '.gallery__item, ' +
    '.contact__grid'
  );

  revealSections.forEach(function (el) {
    el.classList.add('reveal');
  });

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  // Trigger once on load
  setTimeout(revealOnScroll, 100);

  // --- Active nav link highlighting (Multi-page) ---
  var navLinks = document.querySelectorAll('.nav__link');
  var currentPath = window.location.pathname;
  var currentPage = currentPath.split("/").pop();
  if (currentPage === "" || currentPage === "/" || currentPage === "index.html") {
    currentPage = "index.html";
  }

  navLinks.forEach(function (link) {
    link.classList.remove('nav__link--active');
    var linkHref = link.getAttribute('href');
    
    // Exact match for most pages, or if we are on index handling the anchor links
    if (linkHref === currentPage || (currentPage === "index.html" && linkHref.startsWith("index.html"))) {
      link.classList.add('nav__link--active');
    }
  });
})();
