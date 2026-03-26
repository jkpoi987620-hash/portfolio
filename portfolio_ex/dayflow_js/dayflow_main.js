document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE TRANSITION ──
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = 'dayflow_schedule.html';
      }, 500);
    });
  }

  // ── HAMBURGER / SIDE MENU ──
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

  if (hamburger)    hamburger.addEventListener('click', openMenu);
  if (sideClose)    sideClose.addEventListener('click', closeMenu);
  if (sideOverlay)  sideOverlay.addEventListener('click', closeMenu);

  // ── FOOTER ACCORDION ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

});
