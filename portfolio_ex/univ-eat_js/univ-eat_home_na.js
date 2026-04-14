// ── 바텀 네비 탭 전환 ──
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const nav = item.dataset.nav;
    if (nav === 'meal') {
      navigateTo('univ-eat_meal.html');
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
    // 구독 탭 — 미가맹이므로 아무 동작 없음 (탭 전환만)
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('nav-item--active'));
    item.classList.add('nav-item--active');
  });
});
