// ── QR 확대 ──
document.getElementById('qrBox').addEventListener('click', () => {
  document.getElementById('qrOverlay').classList.add('qr-overlay--show');
});

document.getElementById('qrOverlay').addEventListener('click', () => {
  document.getElementById('qrOverlay').classList.remove('qr-overlay--show');
});

// ── 바텀 네비 ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal.html', true);
});

document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub_active.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining.html', true);
});
