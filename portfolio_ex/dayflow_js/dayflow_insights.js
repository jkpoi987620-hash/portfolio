document.addEventListener('DOMContentLoaded', () => {

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

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (sideClose)   sideClose.addEventListener('click', closeMenu);
  if (sideOverlay) sideOverlay.addEventListener('click', closeMenu);

  // ── FOOTER ACCORDION ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

  // ── 바 차트 애니메이션 (페이지 진입 시) ──
  const bars = document.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    bar.style.transition = 'width 0.8s ease';
    setTimeout(() => {
      bar.style.width = target;
    }, 300);
  });

});
