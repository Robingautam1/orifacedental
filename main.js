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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
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
