// ── 비밀번호 표시/숨김 토글 ──
const pwInput  = document.getElementById('pwInput');
const pwToggle = document.getElementById('pwToggle');
const eyeOff   = pwToggle.querySelector('.eye-icon--off');
const eyeOn    = pwToggle.querySelector('.eye-icon--on');

pwToggle.addEventListener('click', () => {
  const isHidden = pwInput.type === 'password';
  pwInput.type  = isHidden ? 'text' : 'password';
  eyeOff.style.display = isHidden ? 'none'  : 'block';
  eyeOn.style.display  = isHidden ? 'block' : 'none';
});

// ── 회원가입 링크 → 슬라이드 전환 ──
document.getElementById('signupLink').addEventListener('click', () => {
  navigateTo('univ-eat_signup1.html');
});

// ── 로그인 클릭시 바로 홈 ──
document.getElementById('btnLogin').addEventListener('click', () => {
  navigateTo('univ-eat_home.html');
});