// ── 뒤로가기 ──
document.getElementById('btnBack').addEventListener('click', () => {
  navigateTo('univ-eat_signup2.html', true);
});

// ── 가입 완료 / 나중에 설정 → 학교 찾기 페이지 ──
document.getElementById('btnComplete').addEventListener('click', () => {
  navigateTo('univ-eat_school.html');
});

document.getElementById('btnSkip').addEventListener('click', () => {
  navigateTo('univ-eat_school.html');
});

// ── 알레르기 태그 (다중 선택) ──
document.querySelectorAll('[data-group="allergy"]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('tag--active');
  });
});

// ── 식단 목표 태그 (단일 선택) ──
document.querySelectorAll('[data-group="diet"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-group="diet"]').forEach(b => b.classList.remove('tag--active'));
    btn.classList.add('tag--active');
  });
});

// ── 토글 스위치 ──
document.querySelectorAll('.toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isOn = toggle.classList.toggle('toggle--on');
    toggle.setAttribute('aria-pressed', isOn);
  });
});
