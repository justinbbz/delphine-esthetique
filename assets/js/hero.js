/* Delphine Esthétique — héros : film en boucle, sans son (photos de l'institut, travellings lents et fondus enchaînés).
   La vidéo ne se charge que si les animations sont permises ; elle se met en pause hors de l'écran, quand l'onglet est caché,
   quand la visiteuse appuie sur « pause » ou coupe les animations. L'affiche (image fixe) reste toujours en dessous. */
(() => {
  'use strict';

  const CFG = window.DECFG || {}, H = CFG.HERO || {};
  const hero = document.getElementById('accueil');
  const video = document.getElementById('heroVideo');
  const poster = document.getElementById('heroPoster');
  const pauseBtn = document.getElementById('heroPause');
  const cue = document.getElementById('heroCue');
  if (!hero || !video) return;
  const root = document.documentElement;
  const motionOn = () => root.dataset.motion !== 'off';
  const portrait = matchMedia('(max-width: 820px) and (orientation: portrait)');
  const srcFor = () => (portrait.matches ? H.mobile : H.desktop) + '?v=' + (H.v || 1);

  let userPaused = false, inView = true, current = '', fired = false;
  const fireReady = () => { if (!fired) { fired = true; window.dispatchEvent(new Event('hero:ready')); } };
  if (poster && poster.complete && poster.naturalWidth) fireReady();
  else if (poster) { poster.addEventListener('load', fireReady, { once: true }); poster.addEventListener('error', fireReady, { once: true }); }
  setTimeout(fireReady, 2500);                    // le chargement ne doit jamais bloquer l'accueil

  function label() {
    if (!pauseBtn) return;
    const l = userPaused ? 'Relancer la vidéo' : 'Mettre la vidéo en pause';
    pauseBtn.setAttribute('aria-label', l); pauseBtn.title = l; pauseBtn.setAttribute('aria-pressed', String(userPaused));
    pauseBtn.innerHTML = '<svg aria-hidden="true"><use href="#' + (userPaused ? 'i-play' : 'i-pause') + '"/></svg>';
  }
  function play() {
    if (!motionOn() || userPaused || !inView || document.hidden) return;
    const s = srcFor();
    if (current !== s) { current = s; video.classList.remove('is-playing'); video.src = s; video.load(); }
    const p = video.play();
    if (p && p.catch) p.catch(() => { /* lecture refusée par le navigateur : l'affiche reste visible */ });
  }
  const stop = () => video.pause();

  video.addEventListener('playing', () => { video.classList.add('is-playing'); if (pauseBtn) pauseBtn.hidden = !motionOn(); });
  video.addEventListener('error', () => { video.classList.remove('is-playing'); if (pauseBtn) pauseBtn.hidden = true; });
  if (pauseBtn) pauseBtn.addEventListener('click', () => { userPaused = !userPaused; label(); userPaused ? stop() : play(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { es.forEach(e => { inView = e.isIntersecting; inView ? play() : stop(); }); }, { threshold: 0.05 }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
  const onPortrait = () => { if (motionOn()) { current = ''; play(); } };
  portrait.addEventListener ? portrait.addEventListener('change', onPortrait) : portrait.addListener(onPortrait);
  window.addEventListener('de:motion', () => {
    if (motionOn()) { if (pauseBtn && video.classList.contains('is-playing')) pauseBtn.hidden = false; play(); }
    else { stop(); video.classList.remove('is-playing'); if (pauseBtn) pauseBtn.hidden = true; }
  });

  /* la flèche « Découvrir » disparaît dès que la page défile */
  const onScroll = () => { if (cue) cue.classList.toggle('is-off', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  label();
  if (motionOn()) play();
  window.DEHero = { play, stop };
})();
