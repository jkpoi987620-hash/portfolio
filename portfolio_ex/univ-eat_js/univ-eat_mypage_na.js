// ── 바텀 네비 ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_na.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal_na.html');
});

document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub_na.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining_na.html');
});
