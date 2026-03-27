document.addEventListener('DOMContentLoaded', () => {

  // ── 확인 버튼 → 메인으로 이동 ──
  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'dayflow_tomorrow.html';
      }, 500);
    });
  }

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
