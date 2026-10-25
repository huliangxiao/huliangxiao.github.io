(function () {
  'use strict';

  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  var themes = ['auto', 'light', 'dark'];
  var current = root.getAttribute('data-theme') || 'auto';

  function applyTheme(theme) {
    current = themes.indexOf(theme) === -1 ? 'auto' : theme;
    if (current === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', current);
    var next = themes[(themes.indexOf(current) + 1) % themes.length];
    button.textContent = 'Theme: ' + current.charAt(0).toUpperCase() + current.slice(1);
    button.setAttribute('aria-label', 'Theme: ' + current + '. Switch to ' + next + ' theme');
  }

  applyTheme(current);
  button.hidden = false;
  button.addEventListener('click', function () {
    applyTheme(themes[(themes.indexOf(current) + 1) % themes.length]);
    try {
      if (current === 'auto') localStorage.removeItem('homepage-theme');
      else localStorage.setItem('homepage-theme', current);
    } catch (error) { /* Theme switching still works for this visit. */ }
  });

  window.addEventListener('storage', function (event) {
    if (event.key === 'homepage-theme' || event.key === null) applyTheme(event.newValue);
  });
}());


(function () {
  'use strict';

  var wechat = document.querySelector('.sidebar-wechat');
  if (!wechat) return;
  var link = wechat.querySelector('.wechat-link');
  var preview = wechat.querySelector('.wechat-qr');
  if (!link || !preview) return;

  function positionPreview() {
    var bounds = link.getBoundingClientRect();
    var above = bounds.top;
    var below = window.innerHeight - bounds.bottom;
    var idealHeight = (preview.offsetWidth - 14) * 1131 / 888 + 14;
    wechat.classList.toggle('is-below', above < idealHeight + 8 && below > above);
    preview.style.setProperty('--wechat-qr-max-height', Math.max(80, Math.max(above, below) - 28) + 'px');
  }

  function showPreview() {
    wechat.classList.remove('is-dismissed');
    positionPreview();
  }

  wechat.addEventListener('mouseenter', showPreview);
  link.addEventListener('focus', showPreview);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && wechat.matches(':hover, :focus-within')) {
      wechat.classList.add('is-dismissed');
    }
  });
  function updateVisiblePreview() {
    if (wechat.matches(':hover, :focus-within')) positionPreview();
  }
  window.addEventListener('resize', updateVisiblePreview);
  window.addEventListener('scroll', updateVisiblePreview, { passive: true });
}());
