// ── 바텀 네비 탭 전환 ──
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const nav = item.dataset.nav;
    if (nav === 'meal') {
      navigateTo('univ-eat_meal_na.html');
      return;
    }
    if (nav === 'dining') {
      navigateTo('univ-eat_dining_na.html');
      return;
    }
    if (nav === 'mypage') {
      navigateTo('univ-eat_mypage_na.html');
      return;
    }
    if (nav === 'sub') {
      navigateTo('univ-eat_sub_na.html');
      return;
    }
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('nav-item--active'));
    item.classList.add('nav-item--active');
  });
});
