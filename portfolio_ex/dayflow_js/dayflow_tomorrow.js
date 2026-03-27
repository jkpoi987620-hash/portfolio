document.addEventListener('DOMContentLoaded', () => {

  // ── 실시간 시계 ──
  const clockEl = document.getElementById('focusClock');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ── 햄버거 / 사이드 메뉴 ──
  const hamburger   = document.getElementById('hamburger');
  const sideMenu    = document.getElementById('sideMenu');
  const sideOverlay = document.getElementById('sideOverlay');
  const sideClose   = document.getElementById('sideClose');

  function openMenu() {
    sideMenu.classList.add('active');
    sideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('active');
    sideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (sideClose)   sideClose.addEventListener('click', closeMenu);
  if (sideOverlay) sideOverlay.addEventListener('click', closeMenu);

  // ── 푸터 아코디언 ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

});
