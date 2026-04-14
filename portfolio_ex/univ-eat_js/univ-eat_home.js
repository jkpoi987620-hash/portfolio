// ── QR 확대 ──
const qrBox     = document.getElementById('qrBox');
const qrOverlay = document.getElementById('qrOverlay');

qrBox.addEventListener('click', () => {
  qrOverlay.classList.add('qr-overlay--show');
});

qrOverlay.addEventListener('click', () => {
  qrOverlay.classList.remove('qr-overlay--show');
});

// ── 바텀 네비 탭 전환 ──
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const nav = item.dataset.nav;
    if (nav === 'meal') {
      navigateTo('univ-eat_meal.html');
      return;
    }
    if (nav === 'sub') {
      navigateTo('univ-eat_sub.html');
      return;
    }
    if (nav === 'dining') {
      navigateTo('univ-eat_dining.html');
      return;
    }
    if (nav === 'mypage') {
      navigateTo('univ-eat_mypage.html');
      return;
    }
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('nav-item--active'));
    item.classList.add('nav-item--active');
  });
});
