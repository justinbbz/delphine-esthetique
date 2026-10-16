/* Delphine Esthétique — interface : écran d'ouverture, en-tête, révélations, parallaxe, univers de soins, cérémonies, galerie, avis, carte.
   Tout se coupe avec le bouton « Animations » ou la préférence système « réduire les animations ». */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.documentElement;
  const body = document.body;
  const DE = window.DE || { groups: [], reviews: [], gallery: [], ceremonies: [], perks: [], ratings: {}, policy: {}, keys: {}, stats: {} };
  const CFG = window.DECFG || {};
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = n => String(n).padStart(2, '0');
  const NB = ' ';
  /* montants en centimes : « 65 € », « 160,20 € » */
  const eurC = c => (c / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: c % 100 ? 2 : 0, maximumFractionDigits: 2 });
  const fmtDur = m => (m < 60 ? m + NB + 'min' : Math.floor(m / 60) + NB + 'h' + (m % 60 ? NB + pad(m % 60) : ''));
  const fmtDelay = h => (h % 24 === 0 && h >= 72 ? h / 24 + NB + 'jours' : h + NB + 'h');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }
  };
  const ITEMS = {};
  DE.groups.forEach(g => g.sections.forEach(s => s.rows.forEach(r => (r.options || [r]).forEach(i => { ITEMS[i.id] = i; }))));

  let ticking = false;   // déclaré en tête : setMotion() appelle onScroll() avant la fin du fichier

  /* ---------- chiffres et textes tirés des données (une seule source : data.js) ---------- */
  const P = DE.policy || {}, R = DE.ratings || {};
  const fills = {
    'planity-value': R.planity && R.planity.value, 'planity-count': R.planity && R.planity.count,
    'google-value': R.google && R.google.value, 'google-count': R.google && R.google.count,
    'deposit-percent': P.depositPercent + NB + '%', 'deposit-min': P.depositMinEuros + NB + '€',
    'cancel': fmtDelay(P.lateCancelHours || 24), 'notice': fmtDelay(P.minNoticeHours || 2),
    'items': DE.stats.items, 'dur-min': fmtDur(DE.stats.minMin || 15), 'dur-max': fmtDur(DE.stats.maxMin || 210)
  };
  $$('[data-fill]').forEach(el => { const v = fills[el.dataset.fill]; if (v != null && v !== 'undefined' + NB + '%') el.textContent = v; });
  $$('[data-price]').forEach(el => { const it = ITEMS[(DE.keys || {})[el.dataset.price]]; if (it) el.textContent = (it.cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: it.cents % 100 ? 2 : 0 }); });

  /* ---------- animations : préférence système + bouton ---------- */
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const motionBtn = $('#motionBtn');
  const motionOn = () => root.dataset.motion !== 'off';
  function setMotion(on, save) {
    root.dataset.motion = on ? 'on' : 'off';
    if (motionBtn) {
      motionBtn.setAttribute('aria-pressed', String(!on));
      const label = on ? 'Réduire les animations' : 'Rétablir les animations';
      motionBtn.setAttribute('aria-label', label); motionBtn.title = label;
    }
    if (save) store.set('de-motion', on ? 'on' : 'off');
    window.dispatchEvent(new CustomEvent('de:motion', { detail: { on } }));
    onScroll();
  }
  const saved = store.get('de-motion');
  setMotion(saved ? saved === 'on' : !mq.matches, false);
  if (motionBtn) motionBtn.addEventListener('click', () => setMotion(!motionOn(), true));
  mq.addEventListener && mq.addEventListener('change', e => { if (!store.get('de-motion')) setMotion(!e.matches, false); });

  /* ---------- écran d'ouverture ---------- */
  const pre = $('#pre'), preBar = $('#preBar');
  $$('[data-hero]').forEach((el, i) => el.style.setProperty('--hd', 250 + i * 150));
  let revealed = false;
  function reveal() {
    if (revealed) return; revealed = true;
    if (pre) { pre.classList.add('is-done'); setTimeout(() => pre.remove(), 1500); }
    root.classList.add('is-ready');
    window.dispatchEvent(new Event('de:ready'));
  }
  if (!pre || !motionOn()) { if (pre) pre.remove(); reveal(); }
  else {
    const t0 = performance.now(); let heroReady = false;
    window.addEventListener('hero:ready', () => { heroReady = true; });
    const tick = () => {
      requestAnimationFrame(tick);                       // d'abord : une erreur ne doit jamais figer la boucle
      if (revealed) return;
      const t = performance.now() - t0;
      if (preBar) preBar.style.setProperty('--p', heroReady ? 1 : Math.min(.92, t / 2600));
      if ((heroReady && t > 1200) || t > 2800) reveal();
    };
    tick();
  }

  /* ---------- en-tête, progression, navigation active ---------- */
  const topBar = $('#topBar'), progress = $('#progressBar');
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
      topBar.classList.toggle('is-solid', y > 40);
      if (progress) progress.style.setProperty('--p', h > 0 ? clamp(y / h, 0, 1).toFixed(4) : 0);
      updateParallax();
      updateRitual();
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });

  const navLinks = $$('.nav a');
  if ('IntersectionObserver' in window) {
    const secs = ['soins', 'hammam', 'institut', 'avis', 'cadeau', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
    const navIO = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.removeAttribute('aria-current'));
        const a = navLinks.find(x => x.getAttribute('href') === '#' + e.target.id); if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => navIO.observe(s));
  }

  /* ---------- menu mobile et pièges à focus ---------- */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    const items = $$(FOCUSABLE, container).filter(el => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  const menu = $('#menu'), burger = $('#burger'), menuClose = $('#menuClose');
  let menuFrom = null;
  function openMenu() { menuFrom = document.activeElement; menu.hidden = false; burger.setAttribute('aria-expanded', 'true'); body.classList.add('is-locked'); menuClose.focus(); }
  function closeMenu(restore = true) { menu.hidden = true; burger.setAttribute('aria-expanded', 'false'); body.classList.remove('is-locked'); if (restore && menuFrom) menuFrom.focus(); }
  burger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', () => closeMenu());
  menu.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); else trapFocus(menu, e); });
  $$('a', menu).forEach(a => a.addEventListener('click', () => closeMenu(false)));

  /* ---------- révélations et mots qui montent ---------- */
  function splitWords(el) {
    let i = 0;
    const walk = node => {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = tok; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  }
  $$('.split').forEach(splitWords);

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); if (e.target.matches('.facts')) runCounters(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -6% 0px' }) : null;
  function watch(root0 = document) {
    $$('.reveal:not(.is-in), .split:not(.is-in)', root0).forEach((el, i) => {
      if (!el.style.getPropertyValue('--d') && el.classList.contains('reveal')) el.style.setProperty('--d', (i % 4) * 90);
      if (io) io.observe(el); else el.classList.add('is-in');
    });
  }

  function runCounters(scope) {
    $$('[data-count]', scope).forEach(el => {
      const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
      const fmt = v => v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (!motionOn()) { el.textContent = fmt(end); return; }
      const t0 = performance.now(), dur = 1400;
      const step = t => { const k = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(end * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- parallaxe douce ---------- */
  const par = $$('[data-speed]').map(el => ({ el, speed: parseFloat(el.dataset.speed) || 0 }));
  function updateParallax() {
    if (!motionOn()) { par.forEach(p => p.el.style.removeProperty('--py')); return; }
    const vh = innerHeight;
    par.forEach(p => {
      const r = p.el.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) return;
      p.el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * p.speed).toFixed(1) + 'px');
    });
  }

  /* ---------- les huit univers ---------- */
  const svcGrid = $('#svcGrid');
  if (svcGrid) {
    svcGrid.innerHTML = DE.groups.map((g, i) =>
      '<article class="svc reveal" style="--d:' + (i % 3) * 110 + '">' +
      '<img class="svc__img" src="assets/img/' + g.photo + '.webp" alt="" loading="lazy" decoding="async" width="1200" height="1200">' +
      '<span class="svc__n" aria-hidden="true">0' + (i + 1) + '</span>' +
      '<p class="svc__kicker">' + esc(g.kicker) + '</p><h3>' + esc(g.title) + '</h3><p class="svc__teaser">' + esc(g.teaser) + '</p>' +
      '<div class="svc__meta"><span class="svc__price">dès <b>' + eurC(g.from) + '</b></span>' +
      '<a class="btn btn--primary btn--small" href="#reserver" data-open="' + g.id + '"><span>Voir les soins<span class="sr-only"> : ' + esc(g.title) + '</span></span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div></article>').join('');
    $$('[data-open]').forEach(a => a.addEventListener('click', () => setTimeout(() => window.DEBooking && window.DEBooking.openGroup(a.dataset.open), 60)));
    // inclinaison 3D et reflet qui suit le pointeur
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.svc', svcGrid).forEach(c => {
        c.addEventListener('pointermove', e => {
          if (!motionOn()) return;
          const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--ry', ((x - .5) * 7).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 7).toFixed(2) + 'deg');
        });
        c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
      });
    }
  }
  const perksList = $('#perksList');
  if (perksList) perksList.innerHTML = (DE.perks || []).map(p => '<li>' + esc(p) + '</li>').join('');

  /* ---------- les cérémonies ---------- */
  const cerGrid = $('#cerGrid');
  if (cerGrid) {
    cerGrid.innerHTML = DE.ceremonies.map((c, i) =>
      '<article class="cer reveal" style="--d:' + i * 110 + '">' +
      '<span class="cer__time"><svg aria-hidden="true"><use href="#i-clock"/></svg>' + fmtDur(c.min) + '</span>' +
      '<h3>' + esc(c.name) + '</h3>' +
      '<ul class="cer__steps">' + c.steps.map(s => '<li><svg aria-hidden="true"><use href="#i-check"/></svg><span>' + esc(s) + '</span></li>').join('') + '</ul>' +
      '<div class="cer__prices"><div class="cer__price"><small>Seule</small><b>' + eurC(c.soloCents) + '</b></div><div class="cer__price"><small>En duo</small><b>' + eurC(c.duoCents) + '</b></div></div>' +
      '<div class="cer__btns"><button type="button" class="btn btn--primary btn--small" data-pick="' + c.soloId + '"><span>Réserver seule<span class="sr-only"> : ' + esc(c.name) + '</span></span></button>' +
      '<button type="button" class="btn btn--ghost-dark btn--small" data-pick="' + c.duoId + '"><span>Réserver en duo<span class="sr-only"> : ' + esc(c.name) + '</span></span></button></div></article>').join('');
    cerGrid.addEventListener('click', e => { const b = e.target.closest('[data-pick]'); if (b && window.DEBooking) window.DEBooking.pick(b.dataset.pick); });
  }

  /* ---------- le hammam : défilement horizontal épinglé ---------- */
  const rit = $('#hammam'), ritSteps = $('#ritualSteps');
  function updateRitual() {
    if (!rit || !ritSteps) return;
    if (innerWidth <= 860 || !motionOn()) { ritSteps.style.transform = ''; rit.style.setProperty('--p', 1); return; }
    const r = rit.getBoundingClientRect(), total = rit.offsetHeight - innerHeight;
    if (total <= 0) return;
    const p = clamp(-r.top / total, 0, 1);
    const max = Math.max(0, ritSteps.scrollWidth - innerWidth + 8);
    ritSteps.style.transform = 'translate3d(' + (-p * max).toFixed(1) + 'px,0,0)';
    rit.style.setProperty('--p', p.toFixed(4));
  }

  /* ---------- galerie + visionneuse ---------- */
  const gal = $('#gallery');
  let galFilter = 'all';
  const galList = () => DE.gallery.filter(p => galFilter === 'all' || p.cat === galFilter);
  function buildGallery(force) {
    if (!gal) return;
    const cols = innerWidth > 1000 ? 4 : innerWidth > 640 ? 3 : 2;
    if (!force && buildGallery.cols === cols) return;
    buildGallery.cols = cols; gal.innerHTML = '';
    const colEls = Array.from({ length: cols }, () => { const c = document.createElement('div'); c.className = 'gcol'; gal.appendChild(c); return c; });
    galList().forEach((it, i) => {
      const d = document.createElement('div'); d.className = 'gitem reveal'; d.setAttribute('role', 'listitem'); d.style.setProperty('--d', (i % cols) * 110);
      d.innerHTML = '<button type="button" data-i="' + i + '" aria-label="Agrandir la photo : ' + esc(it.alt) + '"><img src="assets/img/' + it.id + '-s.webp" srcset="assets/img/' + it.id + '-s.webp 640w, assets/img/' + it.id + '-l.webp 1500w" sizes="(min-width:1000px) 25vw, (min-width:640px) 33vw, 50vw" alt="" loading="lazy" decoding="async" width="' + it.w + '" height="' + it.h + '"><span class="zoom" aria-hidden="true"><svg><use href="#i-plus"/></svg></span></button>';
      colEls[i % cols].appendChild(d);
    });
    watch(gal);
  }
  buildGallery(true);
  let rsT; addEventListener('resize', () => { clearTimeout(rsT); rsT = setTimeout(() => buildGallery(false), 200); });
  $$('.filters [data-f]').forEach(b => b.addEventListener('click', () => {
    galFilter = b.dataset.f;
    $$('.filters [data-f]').forEach(x => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    buildGallery(true);
  }));

  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbClose = $('#lbClose');
  let lbIdx = 0, lbFrom = null;
  function lbShow() {
    const list = galList(), it = list[lbIdx];
    lbImg.src = 'assets/img/' + it.id + '-l.webp'; lbImg.alt = it.alt; lbImg.width = it.w; lbImg.height = it.h;
    lbCap.textContent = it.alt + ' — photo ' + (lbIdx + 1) + ' sur ' + list.length;
  }
  function lbOpen(i, from) { lbIdx = i; lbFrom = from; lbShow(); lb.hidden = false; body.classList.add('is-locked'); lbClose.focus(); }
  function lbHide() { lb.hidden = true; body.classList.remove('is-locked'); if (lbFrom) lbFrom.focus(); }
  const lbGo = d => { const n = galList().length; lbIdx = (lbIdx + d + n) % n; lbShow(); };
  if (gal) gal.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) lbOpen(+b.dataset.i, b); });
  lbClose.addEventListener('click', lbHide);
  $('#lbPrev').addEventListener('click', () => lbGo(-1));
  $('#lbNext').addEventListener('click', () => lbGo(1));
  lb.addEventListener('click', e => { if (e.target === lb) lbHide(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'Escape') lbHide(); else if (e.key === 'ArrowLeft') lbGo(-1); else if (e.key === 'ArrowRight') lbGo(1); else trapFocus(lb, e);
  });
  let sx = null;
  lb.addEventListener('pointerdown', e => { sx = e.clientX; });
  lb.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 60) lbGo(dx < 0 ? 1 : -1); });

  /* ---------- avis (Planity et Google) ---------- */
  const track = $('#sliderTrack');
  if (track) {
    const star = '<svg aria-hidden="true"><use href="#i-star"/></svg>';
    let revFilter = 'all';
    const sCount = $('#sCount'), prev = $('#sPrev'), next = $('#sNext');
    const list = () => DE.reviews.filter(r => revFilter === 'all' || r.src === revFilter);
    const card = () => track.querySelector('.review');
    const step = () => { const c = card(); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 20) : 300; };
    const upd = () => {
      const n = list().length;
      const i = clamp(Math.round(track.scrollLeft / step()), 0, Math.max(0, n - 1));
      sCount.textContent = (i + 1) + ' / ' + n;
      prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };
    const build = () => {
      track.innerHTML = list().map(r =>
        '<li class="review">' +
        '<div class="review__top"><span class="review__src review__src--' + esc(r.src) + '">' + esc(r.src) + '</span>' +
        '<span class="stars" role="img" aria-label="' + r.stars + ' étoiles sur 5">' + star.repeat(r.stars) + '</span></div>' +
        '<blockquote><p>' + esc(r.text) + '</p></blockquote>' +
        (r.service ? '<p class="review__srv">' + esc(r.service) + '</p>' : '') +
        '<footer><span class="review__av" aria-hidden="true">' + esc(r.who.charAt(0)) + '</span><span class="review__who"><b>' + esc(r.who) + '</b><span>Avis ' + esc(r.src) + ' · ' + esc(r.when) + '</span></span></footer></li>').join('');
      track.scrollLeft = 0; upd();
    };
    track.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: motionOn() ? 'smooth' : 'auto' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: motionOn() ? 'smooth' : 'auto' }));
    addEventListener('resize', upd);
    $$('.filters [data-s]').forEach(b => b.addEventListener('click', () => {
      revFilter = b.dataset.s;
      $$('.filters [data-s]').forEach(x => { const on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
      build();
    }));
    build();
    const set = (id, v) => { const el = $(id); if (el && v != null) el.textContent = v; };
    set('#scorePN', R.planity && R.planity.value); set('#scorePCount', R.planity && R.planity.count);
    set('#scoreGN', R.google && R.google.value); set('#scoreGCount', R.google && R.google.count);
    if ($('#scorePLink') && R.planity) $('#scorePLink').href = R.planity.url;
    if ($('#scoreGLink') && R.google) $('#scoreGLink').href = R.google.url;
  }

  /* ---------- carte : chargée seulement avec l'accord du visiteur ---------- */
  const mapBtn = $('#mapBtn');
  if (mapBtn) mapBtn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = CFG.MAP_EMBED; f.title = 'Carte : Delphine Esthétique, ' + DE.salon.streetFull + ', Manosque'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
    $('#mapPh').replaceWith(f);
  });

  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  watch();
  window.addEventListener('de:motion', () => { watch(); updateRitual(); });
  onScroll();
  window.DEUI = { motionOn, watch, trapFocus, eurC, fmtDur, fmtDelay, esc, ITEMS };
})();
