// ── 뒤로가기 ──
document.getElementById('btnBack').addEventListener('click', () => {
  navigateTo('univ-eat_login.html', true);
});

// ── 다음 단계 ──
document.getElementById('btnNext').addEventListener('click', () => {
  navigateTo('univ-eat_signup2.html');
});

// ── 비밀번호 토글 ──
document.querySelectorAll('.pw-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input  = document.getElementById(btn.dataset.target);
    const eyeOff = btn.querySelector('.eye-icon--off');
    const eyeOn  = btn.querySelector('.eye-icon--on');
    const isHidden = input.type === 'password';
    input.type           = isHidden ? 'text'  : 'password';
    eyeOff.style.display = isHidden ? 'none'  : 'block';
    eyeOn.style.display  = isHidden ? 'block' : 'none';
  });
});
