(function () {
  var d = document;
  // preview: show/hide "to verify" marks
  var marks = d.querySelector('[data-toggle-marks]');
  if (marks) marks.addEventListener('click', function () {
    var off = d.body.classList.toggle('hide-marks');
    marks.textContent = off ? 'Show items to verify' : 'Hide items to verify';
  });
  // mobile menu
  var mb = d.querySelector('.menu-btn');
  if (mb) {
    mb.addEventListener('click', function () {
      var open = d.body.classList.toggle('menu-open');
      mb.setAttribute('aria-expanded', String(open));
    });
    d.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { d.body.classList.remove('menu-open'); mb.setAttribute('aria-expanded', 'false'); });
    });
  }
  // life-stage tabs
  var tabs = [].slice.call(d.querySelectorAll('.stage-tab'));
  function pick(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      d.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') pick(tabs[(i + 1) % tabs.length], true);
      if (e.key === 'ArrowLeft') pick(tabs[(i + tabs.length - 1) % tabs.length], true);
    });
  });
  // demo form
  var form = d.querySelector('#appointment-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = d.querySelector('.sent'); n.classList.add('on'); n.focus(); form.reset();
  });
  // blog filter
  var cats = d.querySelectorAll('[data-cat]');
  cats.forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cat');
      cats.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      d.querySelectorAll('.rows.listing .jrow').forEach(function (p) {
        p.style.display = (c === 'all' || p.getAttribute('data-in') === c) ? '' : 'none';
      });
    });
  });
  // Tamil: reference button only
  var toast = d.querySelector('.toast'), tt;
  d.querySelectorAll('[data-tamil]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!toast) return;
      toast.textContent = 'The Tamil version will be added on the live site.';
      toast.classList.add('on'); clearTimeout(tt);
      tt = setTimeout(function () { toast.classList.remove('on'); }, 2600);
    });
  });
  // recognition row arrows
  d.querySelectorAll('[data-rec]').forEach(function (b) {
    b.addEventListener('click', function () {
      var row = d.querySelector('.rec-row'); if (!row) return;
      row.scrollBy({ left: row.clientWidth * 0.8 * Number(b.dataset.rec), behavior: 'smooth' });
    });
  });
  // reveal
  var els = d.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  els.forEach(function (e) { io.observe(e); });
})();
