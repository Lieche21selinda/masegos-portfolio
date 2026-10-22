// Startup intro (home page only) + gentle scroll reveals.
// The intro plays once per browser session, can be skipped with a click/key,
// and is skipped entirely for visitors who prefer reduced motion.
(function () {
  var root = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) root.classList.remove('intro-play');

  function finish() {
    if (!root.classList.contains('intro-play')) return;
    root.classList.remove('intro-play');
    root.classList.add('intro-done');
    if (intro) setTimeout(function () { intro.remove(); }, 900);
  }

  if (intro && root.classList.contains('intro-play')) {
    try { sessionStorage.setItem('nwuIntroSeen', '1'); } catch (e) {}
    var t = setTimeout(finish, 2300);
    intro.addEventListener('click', function () { clearTimeout(t); finish(); });
    document.addEventListener('keydown', function () { clearTimeout(t); finish(); }, { once: true });
  } else if (intro) {
    intro.remove();
  }

  // Scroll reveal for tree branches and evidence cards
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });
})();
