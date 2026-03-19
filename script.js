/* ============================================================
   Arborize Ltd. — script.js
   Mobile nav toggle + FAQ accordion + lightweight CMS data loader
   ============================================================ */

(function () {
  'use strict';

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    var hamburger = document.getElementById('hamburger-icon');
    var closeIcon = document.getElementById('close-icon');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (hamburger) hamburger.style.display = isOpen ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    });

    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (hamburger) hamburger.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
      }
    });
  }

  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      var targetId = btn.getAttribute('aria-controls');
      if (targetId && !answer.id) answer.id = targetId;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (el) {
          el.classList.remove('open');
          var elBtn = el.querySelector('.faq-question');
          if (elBtn) elBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function setHtml(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.innerHTML = value;
    });
  }

  function setLink(selector, text, href) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (text) {
        var textTarget = el.querySelector('[data-cms]') || el;
        if (textTarget === el && el.children.length) {
          var textSpans = el.querySelectorAll('span[data-cms], span');
          if (textSpans.length) textTarget = textSpans[textSpans.length - 1];
        }
        textTarget.textContent = text;
      }
      if (href) el.setAttribute('href', href);
    });
  }

  function applySiteSettings(data) {
    if (!data) return;

    var topItems = document.querySelectorAll('#top-bar .topbar-left .topbar-item');
    if (topItems[0] && data.topBarLocation) topItems[0].lastChild.textContent = ' ' + data.topBarLocation;
    if (topItems[1] && data.topBarHours) topItems[1].lastChild.textContent = ' ' + data.topBarHours;

    document.querySelectorAll('a[href="tel:7052205780"]').forEach(function (el) {
      if (data.phoneHref) el.setAttribute('href', data.phoneHref);
      if (el.classList.contains('topbar-cta')) {
        el.textContent = 'Call ' + (data.phoneDisplay || '');
      }
    });

    document.querySelectorAll('.footer-brand-tagline').forEach(function (el) {
      if (data.footerTagline) el.textContent = data.footerTagline;
    });

    document.querySelectorAll('.service-area-note').forEach(function (el) {
      if (data.serviceAreasShort) el.innerHTML = data.serviceAreasShort;
    });
  }

  function applyHomepageData(data) {
    if (!data || !document.body.classList.contains('cms-homepage') && !document.getElementById('hero')) return;

    setText('[data-cms="heroBadge"]', data.heroBadge);
    setText('[data-cms="heroHeadline"]', data.heroHeadline);
    setText('[data-cms="heroSub"]', data.heroSub);
    setText('[data-cms="heroBody"]', data.heroBody);
    setLink('[data-cms-link="heroPrimaryCtaLink"]', data.heroPrimaryCtaText, data.heroPrimaryCtaLink);
    setLink('[data-cms-link="heroSecondaryCtaLink"]', data.heroSecondaryCtaText, data.heroSecondaryCtaLink);
    setText('[data-cms="heroCardTitle"]', data.heroCardTitle);
    setLink('[data-cms-link="heroCardCtaLink"]', data.heroCardCtaText, data.heroCardCtaLink);

    if (Array.isArray(data.heroMicroItems)) {
      document.querySelectorAll('[data-cms-list="heroMicroItems"]').forEach(function (el) {
        var idx = parseInt(el.getAttribute('data-cms-index'), 10);
        var span = el.querySelector('span') || el;
        if (!isNaN(idx) && data.heroMicroItems[idx]) span.textContent = data.heroMicroItems[idx];
      });
    }

    if (Array.isArray(data.heroCardItems)) {
      document.querySelectorAll('[data-cms-card]').forEach(function (el) {
        var idx = parseInt(el.getAttribute('data-cms-card'), 10);
        var item = data.heroCardItems[idx];
        if (!item) return;
        var strong = el.querySelector('strong');
        var span = el.querySelector('span');
        if (strong && item.title) strong.textContent = item.title;
        if (span && item.text) span.textContent = item.text;
      });
    }
  }

  function fetchJson(path) {
    return fetch(path, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error('Failed to load ' + path);
      return response.json();
    });
  }

  function initCmsData() {
    fetchJson('/data/site-settings.json').then(applySiteSettings).catch(function () {});
    if (document.getElementById('hero')) {
      fetchJson('/data/homepage.json').then(applyHomepageData).catch(function () {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initFaqAccordion();
    initCmsData();
  });
})();
