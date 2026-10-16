/* Delphine Esthétique — réservation en ligne : soins → date et heure → coordonnées → acompte → confirmation.
   Base technique commune avec les sites Naiiss Nails et Lili Monaco. Réglages : assets/js/config.js ; contrats Make et paiement : RESERVATION-AGENDA.md, worker/README.md.
   Montants en centimes (jamais de flottants). Règles : un complément s'ajoute à un soin, une seule variante par soin (durée, solo ou duo), une seule cérémonie. */
(() => {
  'use strict';

  const CFG = window.DECFG || {};
  const DE = window.DE || { groups: [], hours: {}, policy: {}, team: [], salon: {} };
  const UI = window.DEUI;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const pad = n => String(n).padStart(2, '0');
  const { eurC, fmtDur, fmtDelay, esc, ITEMS } = UI;
  const motionOn = () => UI.motionOn();
  const root = $('#reserver');
  if (!root) return;

  /* ---------- données ---------- */
  DE.groups.forEach(g => g.sections.forEach(s => s.rows.forEach(r => (r.options || [r]).forEach(i => { i.group = g.id; i.fam = r.fam || null; }))));
  const POL = Object.assign({ depositPercent: 20, depositMinEuros: 10, lateCancelHours: 24, minNoticeHours: 2 }, DE.policy);
  const SALON = DE.salon || {};
  const ADDRESS = (SALON.streetFull || '') + ', ' + (SALON.postalCode || '') + ' ' + (SALON.locality || '');
  const PHONE = SALON.phone || '';
  const PHONE_TEL = SALON.phoneTel || '';
  const MAX_TOTAL_MIN = CFG.MAX_TOTAL_MIN || 360, MAX_ITEMS = CFG.MAX_ITEMS || 8;
  const full = i => i.full || i.name;
  /* Acompte : pourcentage du total, arrondi à l'euro supérieur, au moins le minimum, jamais plus que le total (identique au Worker). */
  const depositCents = totalCents => Math.min(totalCents, Math.max(POL.depositMinEuros * 100, Math.ceil(totalCents * POL.depositPercent / 10000) * 100));

  /* ---------- dates (chaînes AAAA-MM-JJ, calculs à midi) ---------- */
  const keyOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parse = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  const addDays = (k, n) => { const d = parse(k); d.setDate(d.getDate() + n); return keyOf(d); };
  const monthStart = k => k.slice(0, 8) + '01';
  const addMonths = (k, n) => { const d = parse(k); d.setDate(1); d.setMonth(d.getMonth() + n); return keyOf(d); };
  const fmtLong = k => parse(k).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = k => parse(k).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtHour = t => Math.floor(t / 60) + ' h ' + pad(t % 60);
  const hhmm = m => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  const todayKey = keyOf(new Date());
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

  /* ---------- état ---------- */
  const S = { group: DE.groups[0] ? DE.groups[0].id : '', cart: [], date: null, time: null, step: 1, month: monthStart(todayKey), busy: null, sending: false, ref: '', staff: '' };
  const totalCents = () => S.cart.reduce((a, id) => a + ITEMS[id].cents, 0);
  const totalMin = () => S.cart.reduce((a, id) => a + ITEMS[id].min, 0);
  const hasDevis = () => S.cart.some(id => ITEMS[id].devis);
  /* Un complément (supplément, dépose, heure en plus) s'ajoute à un soin : jamais seul. */
  const needsBase = () => S.cart.length > 0 && S.cart.every(id => ITEMS[id].supp);
  const note = msg => { const n = $('#sumNote'); if (n) n.textContent = msg || ''; };

  /* ---------- étape 1 : carte des soins ---------- */
  const tabs = $('#tabs'), list = $('#menuList');
  const noteHtml = n => {
    if (!n) return '';
    return '<div class="note">' + (n.lead ? '<p>' + esc(n.lead) + '</p>' : '') +
      (n.head ? '<p class="note__head">' + esc(n.head) + '</p>' : '') +
      (n.items ? '<ul>' + n.items.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul>' : '') +
      (n.foot ? '<p>' + esc(n.foot) + '</p>' : '') + '</div>';
  };
  const more = desc => (desc ? '<button type="button" class="mrow__more" aria-expanded="false">En savoir plus</button>' : '');
  const moreText = desc => (desc ? '<p class="mrow__desc">' + esc(desc) + '</p>' : '');
  const curesub = i => (i.cure ? i.cure.n + ' séances' + (i.cure.was ? ' · au lieu de ' + eurC(i.cure.was) : '') : '');

  function famRow(r) {
    const same = r.options.every(o => o.min === r.options[0].min);
    return '<article class="mrow mrow--fam" data-fam="' + r.fam + '">' +
      '<div><p class="mrow__name">' + esc(r.name) + '</p>' + (same ? '<p class="mrow__sub">' + fmtDur(r.options[0].min) + '</p>' : '') + more(r.desc) + '</div>' +
      '<div class="mrow__opts" role="group" aria-label="Formule : ' + esc(r.name) + '">' +
      r.options.map(o => '<button type="button" class="opt" data-id="' + o.id + '" aria-pressed="false"><span class="opt__l">' + esc(o.opt) + '</span> <span class="opt__p">' + eurC(o.cents) + '</span><span class="sr-only"> : ' + esc(o.name) + (durInName(o) ? '' : ', ' + fmtDur(o.min)) + '</span></button>').join('') + '</div>' +
      moreText(r.desc) + '</article>';
  }
  function callRow(i) {
    const tag = i.cure ? 'Cure' : 'Sur appel';
    const sub = curesub(i);
    return '<article class="mrow mrow--call">' +
      '<div><p class="mrow__name">' + esc(i.name) + '<span class="mrow__tag">' + tag + '</span></p>' + (sub ? '<p class="mrow__sub">' + esc(sub) + '</p>' : '') + more(i.desc) + '</div>' +
      '<div class="mrow__right"><div class="mrow__meta"><span>' + fmtDur(i.min) + '</span><span class="mrow__price">' + (i.from ? '<small>dès</small>' : '') + eurC(i.cents) + '</span></div>' +
      '<a class="btn btn--ghost-dark btn--small" href="tel:' + esc(PHONE_TEL) + '"><svg aria-hidden="true"><use href="#i-phone"/></svg><span>Réserver par téléphone<span class="sr-only"> : ' + esc(i.name) + '</span></span></a></div>' +
      moreText(i.desc) + '</article>';
  }
  function itemRow(i) {
    const label = i.name.replace(/"/g, '');
    return '<article class="mrow" data-id="' + i.id + '">' +
      '<div><p class="mrow__name">' + esc(i.name) + (i.supp ? '<span class="mrow__tag">Complément</span>' : '') + '</p>' + more(i.desc) + '</div>' +
      '<div class="mrow__right"><div class="mrow__meta"><span>' + (i.supp ? '+ ' : '') + fmtDur(i.min) + '</span><span class="mrow__price">' + (i.devis ? 'Sur devis' : (i.supp ? '+ ' : '') + eurC(i.cents)) + '</span></div>' +
      '<button type="button" class="mrow__add" aria-pressed="false" aria-label="Ajouter : ' + esc(label) + '"><svg aria-hidden="true"><use href="#i-plus"/></svg></button></div>' +
      moreText(i.desc) + '</article>';
  }
  const rowHtml = r => (r.options ? famRow(r) : (r.mode === 'call' ? callRow(r) : itemRow(r)));

  function buildMenu() {
    tabs.innerHTML = DE.groups.map(g => '<button type="button" class="tab' + (g.id === S.group ? ' is-on' : '') + '" data-g="' + g.id + '" aria-pressed="' + (g.id === S.group) + '">' + esc(g.title) + '<sup data-n="' + g.id + '" aria-hidden="true"></sup></button>').join('');
    list.innerHTML = DE.groups.map(g =>
      '<section class="mgroup' + (g.id === S.group ? ' is-on' : '') + '" data-g="' + g.id + '" aria-label="' + esc(g.title) + '">' +
      '<div class="mgroup__head"><span class="mgroup__k">' + esc(g.kicker) + '</span><h4>' + esc(g.title) + '</h4><p>' + esc(g.intro) + '</p></div>' +
      g.sections.map(s => '<div class="msec">' + (g.sections.length > 1 ? '<h5 class="msec__title">' + esc(s.title) + '</h5>' : '') + noteHtml(s.note) + s.rows.map(rowHtml).join('') + '</div>').join('') +
      '</section>').join('');
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) setGroup(b.dataset.g); });
  function setGroup(id) {
    S.group = id;
    $$('.tab', tabs).forEach(t => { const on = t.dataset.g === id; t.classList.toggle('is-on', on); t.setAttribute('aria-pressed', String(on)); });
    $$('.mgroup', list).forEach(g => g.classList.toggle('is-on', g.dataset.g === id));
  }
  list.addEventListener('click', e => {
    const moreBtn = e.target.closest('.mrow__more');
    if (moreBtn) { const r = moreBtn.closest('.mrow'); const open = r.classList.toggle('is-open'); moreBtn.setAttribute('aria-expanded', String(open)); moreBtn.textContent = open ? 'Réduire' : 'En savoir plus'; return; }
    const ctl = e.target.closest('.mrow__add, .opt'); if (!ctl) return;
    toggle(ctl.classList.contains('opt') ? ctl.dataset.id : ctl.closest('.mrow').dataset.id);
  });

  function toggle(id) {
    const it = ITEMS[id];
    const i = S.cart.indexOf(id);
    if (i >= 0) { S.cart.splice(i, 1); note('Retiré : ' + full(it) + '. Total : ' + eurC(totalCents()) + '.'); }
    else {
      let replaced = '';
      /* une seule variante par soin (durée, solo ou duo) ; une seule cérémonie : la nouvelle choix remplace l'ancien */
      const clash = S.cart.find(x => (it.fam && ITEMS[x].fam === it.fam) || (it.excl && ITEMS[x].excl === it.excl));
      if (clash) { replaced = ' (remplace : ' + full(ITEMS[clash]) + ')'; S.cart.splice(S.cart.indexOf(clash), 1); }
      if (S.cart.length >= MAX_ITEMS) { note('Un rendez-vous ne peut pas dépasser ' + MAX_ITEMS + ' prestations.'); return; }
      if (totalMin() + it.min > MAX_TOTAL_MIN) { note('Un rendez-vous ne peut pas dépasser ' + fmtDur(MAX_TOTAL_MIN) + '. Retirez un soin ou réservez un second rendez-vous.'); return; }
      S.cart.push(id); note('Ajouté : ' + full(it) + replaced + '. Total : ' + eurC(totalCents()) + '.');
    }
    if (S.date && S.time != null && !slotsFor(S.date).includes(S.time)) S.time = null;   // la durée a changé
    refresh();
  }

  /* ---------- récapitulatif ---------- */
  const durInName = i => !!i.opt && i.opt.replace(/\s/g, '').includes(fmtDur(i.min).replace(/\s/g, ''));
  function refresh() {
    $$('.mrow[data-id]', list).forEach(r => {
      const on = S.cart.includes(r.dataset.id);
      r.classList.toggle('is-sel', on);
      const b = $('.mrow__add', r); b.setAttribute('aria-pressed', String(on));
      b.innerHTML = '<svg aria-hidden="true"><use href="#' + (on ? 'i-check' : 'i-plus') + '"/></svg>';
    });
    $$('.mrow--fam', list).forEach(r => {
      let any = false;
      $$('.opt', r).forEach(b => { const on = S.cart.includes(b.dataset.id); b.setAttribute('aria-pressed', String(on)); any = any || on; });
      r.classList.toggle('is-sel', any);
    });
    DE.groups.forEach(g => { const n = S.cart.filter(id => ITEMS[id].group === g.id).length; const s = $('[data-n="' + g.id + '"]', tabs); if (s) s.textContent = n ? n : ''; });
    const ul = $('#sumList');
    ul.innerHTML = S.cart.length
      ? S.cart.map(id => '<li><span>' + esc(full(ITEMS[id])) + (durInName(ITEMS[id]) ? '' : '<br><small>' + fmtDur(ITEMS[id].min) + '</small>') + '</span><span><b>' + (ITEMS[id].devis ? 'sur devis' : eurC(ITEMS[id].cents)) + '</b><button type="button" data-rm="' + id + '" aria-label="Retirer : ' + esc(full(ITEMS[id])) + '"><svg aria-hidden="true"><use href="#i-x"/></svg></button></span></li>').join('') +
        (needsBase() ? '<li class="sum__empty sum__warn">Un complément s’ajoute à un soin : choisissez d’abord un soin.</li>' : '')
      : '<li class="sum__empty">Aucun soin sélectionné.</li>';
    $('#sumDur').textContent = S.cart.length ? fmtDur(totalMin()) : '0 min';
    $('#sumTotal').textContent = eurC(totalCents()) + (hasDevis() ? ' + devis' : '');
    $('#sumDeposit').textContent = eurC(depositCents(totalCents()));
    $('#sumDevis').hidden = !hasDevis();
    $$('[data-fill="cancel"]').forEach(el => { el.textContent = fmtDelay(POL.lateCancelHours); });
    const when = $('#sumWhenRow');
    if (S.date && S.time != null) { when.hidden = false; $('#sumWhen').textContent = fmtShort(S.date) + ' · ' + fmtHour(S.time); } else when.hidden = true;
    nav();
  }
  $('#sumList').addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) toggle(b.dataset.rm); });

  /* ---------- navigation entre étapes ---------- */
  const btnNext = $('#btnNext'), btnBack = $('#btnBack'), btnLabel = $('#btnNextLabel');
  function nav() {
    const s = S.step;
    btnBack.hidden = s === 1 || s === 5;
    $('#flowSide').hidden = s === 5;
    btnLabel.textContent = { 1: 'Choisir la date', 2: 'Mes informations', 3: 'Passer à l’acompte', 4: '' }[s] || '';
    btnNext.hidden = s === 4 || s === 5;
    btnNext.disabled = (s === 1 && (!S.cart.length || needsBase())) || (s === 2 && (S.time == null || !S.date));
    // barre collante (téléphone) : reflet du bouton « Suivant » et des montants
    const bar = $('#flowBar');
    if (bar) {
      bar.hidden = s >= 4 || !S.cart.length;
      $('#barNextLabel').textContent = btnLabel.textContent;
      $('#barNext').disabled = btnNext.disabled;
      $('#barTotal').textContent = eurC(totalCents());
      $('#barDep').textContent = eurC(depositCents(totalCents()));
    }
  }
  function go(step, opt = {}) {
    S.step = step;
    $$('.step').forEach(sec => { const on = +sec.dataset.step === step; sec.hidden = !on; sec.classList.toggle('is-on', on); });
    $$('#stepper li').forEach(li => { const n = +li.dataset.s; li.classList.toggle('is-on', n === step); li.classList.toggle('is-done', n < step); if (n === step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $('#stepper').hidden = step === 5;
    if (step === 2) { buildCal(); buildSlots(); }
    if (step === 3) buildStaff();
    if (step === 4) preparePay();
    nav(); refresh();
    if (opt.quiet) return;
    const top = $('#stepper').getBoundingClientRect().top + scrollY - 110;
    scrollTo({ top: Math.max(0, top), behavior: motionOn() ? 'smooth' : 'auto' });
    const h = $('.step.is-on .step__title'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  btnNext.addEventListener('click', () => {
    if (S.step === 1 && S.cart.length && !needsBase()) go(2);
    else if (S.step === 2 && S.time != null) go(3);
    else if (S.step === 3 && validateInfos()) go(4);
  });
  btnBack.addEventListener('click', () => go(Math.max(1, S.step - 1)));
  $('#barNext').addEventListener('click', () => btnNext.click());

  /* ---------- étape 2 : calendrier et créneaux ---------- */
  const calDays = $('#calDays'), calTitle = $('#calTitle'), prev = $('#calPrev'), next = $('#calNext');
  const minStartMs = () => Date.now() + POL.minNoticeHours * 3600e3;
  const maxKey = () => addDays(todayKey, CFG.MAX_DAYS_AHEAD || 90);
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const demoCache = {};
  function demoBusy(k) {                                  // créneaux « déjà pris » d'exemple, toujours les mêmes pour un jour donné
    if (demoCache[k]) return demoCache[k];
    const d = parse(k), h = DE.hours[d.getDay()]; if (!h) return (demoCache[k] = []);
    const r = mulberry(Number(k.replace(/-/g, '')));
    const open = toMin(h[0]), close = toMin(h[1]); const blocks = [];
    const n = r() < .08 ? 99 : (r() < .5 ? 2 : 3);
    if (n === 99) blocks.push([open, close]);
    else for (let i = 0; i < n; i++) { const dur = [60, 90, 120, 150][Math.floor(r() * 4)]; const st = open + Math.floor(r() * Math.max(1, (close - open - dur) / 30)) * 30; blocks.push([st, Math.min(close, st + dur)]); }
    return (demoCache[k] = blocks);
  }
  function isBusy(k, start, end) {
    if (S.busy) {                                          // créneaux réels (agenda Google)
      const a = parse(k); a.setHours(0, start, 0, 0); const b = parse(k); b.setHours(0, end, 0, 0);
      return S.busy.some(([x, y]) => a < y && b > x);
    }
    return demoBusy(k).some(([x, y]) => start < y && end > x);
  }
  function slotsFor(k) {
    const d = parse(k), h = DE.hours[d.getDay()]; if (!h || !S.cart.length) return [];
    if (k > maxKey()) return [];
    const open = toMin(h[0]), close = toMin(h[1]), dur = totalMin(), step = CFG.SLOT_STEP_MIN || 30, out = [];
    for (let t = open; t + dur <= close; t += step) {
      const st = parse(k); st.setHours(0, t, 0, 0);
      if (st.getTime() < minStartMs()) continue;
      if (isBusy(k, t, t + dur)) continue;
      out.push(t);
    }
    return out;
  }
  function buildCal() {
    const first = parse(S.month);
    calTitle.textContent = first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    prev.disabled = S.month <= monthStart(todayKey);
    next.disabled = addMonths(S.month, 1) > monthStart(maxKey());
    const lead = (first.getDay() + 6) % 7, dim = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    let h = '';
    for (let b = 0; b < lead; b++) h += '<span class="cday is-blank" aria-hidden="true"></span>';
    for (let n = 1; n <= dim; n++) {
      const k = first.getFullYear() + '-' + pad(first.getMonth() + 1) + '-' + pad(n);
      const ok = slotsFor(k).length > 0;
      h += '<button type="button" class="cday' + (ok ? ' is-open' : '') + (k === todayKey ? ' is-today' : '') + (k === S.date ? ' is-sel' : '') + '" data-k="' + k + '"' + (ok ? '' : ' disabled') + (k === todayKey ? ' aria-current="date"' : '') + ' aria-pressed="' + (k === S.date) + '" aria-label="' + fmtLong(k) + (ok ? ', des créneaux sont disponibles' : ', indisponible') + '">' + n + '</button>';
    }
    calDays.innerHTML = h;
  }
  prev.addEventListener('click', () => { S.month = addMonths(S.month, -1); buildCal(); });
  next.addEventListener('click', () => { S.month = addMonths(S.month, 1); buildCal(); });
  calDays.addEventListener('click', e => {
    const b = e.target.closest('.cday[data-k]'); if (!b || b.disabled) return;
    S.date = b.dataset.k; S.time = null; buildCal(); buildSlots(); refresh();
    if (innerWidth < 860) $('#slotsTitle').scrollIntoView({ behavior: motionOn() ? 'smooth' : 'auto', block: 'start' });
  });
  const slotsGrid = $('#slotsGrid');
  function buildSlots() {
    const t = $('#slotsTitle'), sub = $('#slotsSub');
    if (!S.date) { t.textContent = 'Choisissez un jour'; sub.textContent = 'Durée de votre rendez-vous : ' + fmtDur(totalMin()) + '. Les horaires proposés en tiennent compte.'; slotsGrid.innerHTML = ''; return; }
    t.textContent = fmtShort(S.date);
    sub.textContent = 'Rendez-vous de ' + fmtDur(totalMin()) + ' · choisissez l’heure d’arrivée.';
    const s = slotsFor(S.date);
    slotsGrid.innerHTML = s.length ? s.map(m => '<button type="button" class="slot" aria-pressed="' + (m === S.time) + '" data-t="' + m + '">' + fmtHour(m) + '</button>').join('') : '<p class="slots__empty">Plus de créneau ce jour-là pour cette durée. Essayez un autre jour.</p>';
  }
  slotsGrid.addEventListener('click', e => { const b = e.target.closest('.slot'); if (!b) return; S.time = +b.dataset.t; buildSlots(); refresh(); note('Créneau choisi : ' + fmtShort(S.date) + ' à ' + fmtHour(S.time) + '.'); const nb = $('.slot[aria-pressed="true"]'); if (nb) nb.focus({ preventScroll: true }); });

  async function loadAvailability() {
    if (!CFG.AVAILABILITY_URL) return;
    try {
      const u = CFG.AVAILABILITY_URL + (CFG.AVAILABILITY_URL.includes('?') ? '&' : '?') + 'from=' + todayKey + '&to=' + maxKey();
      const r = await fetch(u, { cache: 'no-store' }); if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      S.busy = (j.busy || []).map(b => [new Date(Array.isArray(b) ? b[0] : b.start), new Date(Array.isArray(b) ? b[1] : b.end)]).filter(x => !isNaN(x[0]) && !isNaN(x[1]));
    } catch (e) { S.busy = null; }                          // agenda injoignable : créneaux d'exemple, jamais d'erreur bloquante
    if (S.step === 2) { buildCal(); buildSlots(); }
  }

  /* ---------- étape 3 : coordonnées et préférence d'intervenante ---------- */
  const F = { first: $('#fFirst'), last: $('#fLast'), email: $('#fEmail'), phone: $('#fPhone'), cgv: $('#fCgv') };
  const rules = {
    first: v => (v.trim().length >= 2 ? '' : 'Indiquez votre prénom.'),
    last: v => (v.trim().length >= 2 ? '' : 'Indiquez votre nom.'),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Cette adresse e-mail n’est pas valide.'),
    phone: v => { const d = v.replace(/\D/g, ''); return d.length >= 9 && d.length <= 15 ? '' : 'Ce numéro de téléphone n’est pas valide.'; },
    cgv: () => (F.cgv.checked ? '' : 'Cochez cette case pour continuer.')
  };
  function check(n) {
    const msg = rules[n](n === 'cgv' ? '' : F[n].value);
    const slot = $('[data-err="' + n + '"]'); if (slot) slot.textContent = msg;
    F[n].setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (n !== 'cgv') F[n].classList.toggle('is-bad', !!msg);
    return msg;
  }
  ['first', 'last', 'email', 'phone'].forEach(n => { F[n].addEventListener('blur', () => check(n)); F[n].addEventListener('input', () => { if (F[n].classList.contains('is-bad')) check(n); }); });
  F.cgv.addEventListener('change', () => { if ($('[data-err="cgv"]').textContent) check('cgv'); });
  function validateInfos() {
    let bad = ''; ['first', 'last', 'email', 'phone', 'cgv'].forEach(n => { if (check(n) && !bad) bad = n; });
    if (bad) { F[bad].focus(); return false; }
    return true;
  }
  /* Intervenantes qui réalisent TOUS les soins choisis (les soins sans liste, comme le hammam, n'imposent rien). */
  const staffChoices = () => (DE.team || []).filter(n => S.cart.every(id => !ITEMS[id].qui || ITEMS[id].qui.includes(n)));
  function buildStaff() {
    const box = $('#staffBox'), opts = $('#staffOpts');
    const constrained = S.cart.some(id => ITEMS[id].qui);
    const names = staffChoices();
    if (!constrained || !names.length) { box.hidden = true; S.staff = ''; opts.innerHTML = ''; return; }
    if (!names.includes(S.staff)) S.staff = '';
    box.hidden = false;
    opts.innerHTML = [['', 'Peu importe']].concat(names.map(n => [n, n])).map(([v, l]) =>
      '<label><input type="radio" name="staff" value="' + esc(v) + '"' + (v === S.staff ? ' checked' : '') + '><span>' + esc(l) + '</span></label>').join('');
  }
  $('#staffOpts').addEventListener('change', e => { if (e.target.name === 'staff') S.staff = e.target.value; });

  /* ---------- étape 4 : acompte et paiement ---------- */
  const payBtn = $('#payBtn'), payMsg = $('#payMsg'), modal = $('#payModal');
  function preparePay() {
    const dc = depositCents(totalCents()), tc = totalCents();
    $('#payAmount').textContent = eurC(dc);
    $('#payRest').textContent = (tc > dc ? 'Solde de ' + eurC(tc - dc) + ' à régler à l’institut le jour du rendez-vous (l’acompte est déduit du total de ' + eurC(tc) + ').' : 'Le total de ' + eurC(tc) + ' est entièrement réglé par cet acompte.') + (hasDevis() ? ' Le complément sur devis se règle à l’institut.' : '');
    payMsg.textContent = '';
    payBtn.querySelector('span').textContent = CFG.PAYMENT_MODE === 'none' ? 'Confirmer le rendez-vous' : 'Payer l’acompte de ' + eurC(dc);
  }
  function makeRef() { return 'DE-' + S.date.replace(/-/g, '').slice(2) + '-' + Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join(''); }
  function booking() {
    const items = S.cart.map(id => ({ id, name: full(ITEMS[id]), min: ITEMS[id].min, price: ITEMS[id].cents / 100, cents: ITEMS[id].cents }));
    const dc = depositCents(totalCents());
    return { ref: S.ref || (S.ref = makeRef()), date: S.date, start: hhmm(S.time), startMin: S.time, durationMin: totalMin(),
      timezone: 'Europe/Paris', startLocal: S.date + 'T' + hhmm(S.time) + ':00', endLocal: S.date + 'T' + hhmm(S.time + totalMin()) + ':00',
      items, total: totalCents() / 100, totalCents: totalCents(), devis: hasDevis(), depositCents: dc, deposit: dc / 100, cancelHours: POL.lateCancelHours, staff: S.staff,
      first: F.first.value.trim(), last: F.last.value.trim(), email: F.email.value.trim(), phone: F.phone.value.trim(), visit: ($('input[name=visit]:checked') || {}).value || 'new', message: $('#fMsg').value.trim(), locale: 'fr', page: location.href.split('?')[0].split('#')[0], sentAt: new Date().toISOString() };
  }
  payBtn.addEventListener('click', async () => {
    if (S.sending) return;
    if ($('#fHp').value) { finish(booking(), { demo: true }); return; }          // pot de miel : un robot a rempli le champ caché
    const mode = CFG.PAYMENT_MODE || 'demo', b = booking();
    if (mode === 'demo') { $('#payModalAmount').textContent = eurC(b.depositCents); openModal(); return; }
    S.sending = true; payBtn.disabled = true; payMsg.textContent = '';
    try {
      if (mode === 'stripe' || mode === 'sumup') {
        if (!CFG.CHECKOUT_ENDPOINT) throw new Error('config');
        sessionStorage.setItem('de-pending', JSON.stringify(b));
        const r = await fetch(CFG.CHECKOUT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
        const j = await r.json().catch(() => ({}));
        if (r.status === 409) throw new Error('conflict');
        if (!r.ok || !j.url) throw new Error(j.error || 'checkout');
        location.href = j.url; return;
      }
      if (mode === 'none') {
        const ok = await sendBooking(b);
        if (!ok.ok) throw new Error(ok.conflict ? 'conflict' : 'send');
        finish(b, { unpaid: true });
      }
    } catch (err) {
      payMsg.textContent = err.message === 'conflict' ? 'Ce créneau vient d’être pris. Merci d’en choisir un autre.' : 'Le paiement n’a pas pu être lancé. Appelez le ' + PHONE + ' ou réessayez dans un instant.';
      if (err.message === 'conflict') { S.time = null; go(2); }
    } finally { S.sending = false; payBtn.disabled = false; }
  });
  async function sendBooking(b) {
    if (!CFG.BOOKING_WEBHOOK) return { ok: true, demo: true };
    try {
      const r = await fetch(CFG.BOOKING_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(b) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) return { ok: false, conflict: !!j.conflict };
      return { ok: true };
    } catch (e) { return { ok: false }; }
  }
  let modalFrom = null;
  function openModal() { modalFrom = document.activeElement; modal.hidden = false; document.body.classList.add('is-locked'); $('#payModalOk').focus(); }
  function closeModal() { modal.hidden = true; document.body.classList.remove('is-locked'); if (modalFrom) modalFrom.focus(); }
  $('#payModalCancel').addEventListener('click', closeModal);
  $('#payModalOk').addEventListener('click', () => { modalFrom = null; closeModal(); finish(booking(), { demo: true }); });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  modal.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); else UI.trapFocus(modal, e); });

  /* ---------- confirmation + agenda de la cliente ---------- */
  const icsEsc = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const stamp = (k, min) => k.replace(/-/g, '') + 'T' + pad(Math.floor(min / 60)) + pad(min % 60) + '00';
  function fold(line) { const out = []; while (line.length > 72) { out.push(line.slice(0, 72)); line = ' ' + line.slice(72); } out.push(line); return out.join('\r\n'); }
  function finish(b, opt) {
    opt = opt || {};
    S.step = 5;
    $$('.step').forEach(sec => { const on = +sec.dataset.step === 5; sec.hidden = !on; sec.classList.toggle('is-on', on); });
    $('#stepper').hidden = true; $('#flowSide').hidden = true;
    $('#doneTitle').textContent = opt.demo ? 'Rendez-vous préparé' : 'Rendez-vous confirmé';
    const when = fmtLong(b.date) + ' à ' + fmtHour(b.startMin);
    $('#doneText').textContent = opt.demo
      ? 'Merci ' + b.first + ' ! Voici le récapitulatif de votre rendez-vous du ' + when + '. Une fois la page reliée à l’agenda de l’institut et au paiement en ligne, ce même parcours enregistre le créneau et encaisse l’acompte.'
      : 'Merci ' + b.first + ' ! L’équipe de Delphine Esthétique vous attend le ' + when + (opt.unpaid ? '. L’acompte se règle à l’institut.' : '. Votre acompte est bien reçu.') + ' Un e-mail de confirmation vous a été envoyé.';
    const rows = [['Date', fmtShort(b.date)], ['Heure', fmtHour(b.startMin)], ['Durée', fmtDur(b.durationMin)], ['Acompte', eurC(b.depositCents)]];
    if (b.staff) rows.push(['Avec', b.staff]);
    rows.push(['Adresse', ADDRESS], ['Référence', b.ref]);
    $('#doneSum').innerHTML = rows.map(r => '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>').join('');
    $('#doneDemo').hidden = !opt.demo;
    const names = b.items.map(i => i.name).join(', ');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Delphine Esthetique//Reservation//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT', 'UID:' + b.ref + '@delphine-esthetique', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''),
      'DTSTART:' + stamp(b.date, b.startMin), 'DTEND:' + stamp(b.date, b.startMin + b.durationMin), 'SUMMARY:' + icsEsc('Rendez-vous Delphine Esthétique'), 'LOCATION:' + icsEsc(ADDRESS),
      'DESCRIPTION:' + icsEsc(names + (b.staff ? ' · Avec ' + b.staff : '') + ' · Réf. ' + b.ref + ' · ' + PHONE + ' · Annulation ou déplacement gratuits jusqu’à ' + fmtDelay(b.cancelHours || POL.lateCancelHours) + ' avant, sinon l’acompte n’est pas restitué.'), 'END:VEVENT', 'END:VCALENDAR'];
    const a = $('#btnIcs'); if (a.dataset.u) URL.revokeObjectURL(a.dataset.u);
    a.href = URL.createObjectURL(new Blob([lines.map(fold).join('\r\n')], { type: 'text/calendar;charset=utf-8' })); a.dataset.u = a.href; a.download = 'rendez-vous-delphine-esthetique-' + b.date + '.ics';
    $('#btnGcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Rendez-vous Delphine Esthétique') + '&dates=' + stamp(b.date, b.startMin) + '/' + stamp(b.date, b.startMin + b.durationMin) + '&location=' + encodeURIComponent(ADDRESS) + '&details=' + encodeURIComponent(names + ' · Réf. ' + b.ref) + '&ctz=Europe/Paris';
    $('#btnRoute').href = 'https://www.google.com/maps/dir/?api=1&destination=' + (SALON.lat || 43.8308446) + ',' + (SALON.lng || 5.8048146);
    const top = $('#reserver').getBoundingClientRect().top + scrollY + 160;
    scrollTo({ top, behavior: motionOn() ? 'smooth' : 'auto' });
    const d = $('#done'); d.focus({ preventScroll: true });
  }
  $('#doneNew').addEventListener('click', () => { S.cart = []; S.date = null; S.time = null; S.ref = ''; S.staff = ''; note(''); go(1); });

  /* ---------- API publique + démarrage ---------- */
  function openGroup(id) {
    setGroup(id);
    if (S.step !== 1) go(1, { quiet: true });
  }
  /* « Réserver » sur une cérémonie : l'ajoute au rendez-vous (en remplaçant une autre variante) et ouvre l'étape 1 sur son univers */
  function pick(id) {
    const it = ITEMS[id]; if (!it) return;
    if (S.step !== 1) go(1, { quiet: true });
    setGroup(it.group);
    if (!S.cart.includes(id)) toggle(id);
    const top = $('#reserver').getBoundingClientRect().top + scrollY;
    scrollTo({ top: Math.max(0, top), behavior: motionOn() ? 'smooth' : 'auto' });
  }
  window.DEBooking = { openGroup, pick };

  if (CFG.DEMO_MODE) { const b = $('#demoBanner'); if (b) b.hidden = false; }
  buildMenu(); refresh(); nav(); loadAvailability();

  /* retour de la page de paiement (Stripe ou SumUp) */
  const qs = new URLSearchParams(location.search);
  const pending = () => { try { return JSON.parse(sessionStorage.getItem('de-pending') || 'null'); } catch (e) { return null; } };
  if (qs.get('paiement') === 'ok') {
    const b = pending();
    if (b && b.ref === qs.get('ref')) { try { sessionStorage.removeItem('de-pending'); } catch (e) { /* aucune */ } finish(b, {}); }
  } else if (qs.get('paiement') === 'annule') {
    const b = pending();
    if (b) { S.cart = b.items.map(i => i.id).filter(id => ITEMS[id]); S.date = b.date; S.time = b.startMin; S.staff = b.staff || ''; F.first.value = b.first; F.last.value = b.last; F.email.value = b.email; F.phone.value = b.phone; F.cgv.checked = true; go(4, { quiet: true }); payMsg.textContent = 'Le paiement a été annulé. Vous pouvez réessayer.'; }
  }
})();
