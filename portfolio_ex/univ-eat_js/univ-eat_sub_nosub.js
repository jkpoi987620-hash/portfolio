// ── 플랜 카드 선택 (단일 선택, 초기 선택 없음) ──
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('plan-card--selected'));
    card.classList.add('plan-card--selected');
  });
});

// ── 결제 방법 선택 (단일 선택) ──
document.querySelectorAll('.pay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('pay-btn--active'));
    btn.classList.add('pay-btn--active');
  });
});

// ── 구독하기 → 미구독 플로우 탈출, 바코드 있는 홈으로 이동 ──
document.getElementById('btnSubscribe').addEventListener('click', () => {
  navigateTo('univ-eat_home.html');
});

// ── 바텀 네비 (미구독 플로우) ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_nosub.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal_nosub.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining_nosub.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage_nosub.html');
});
