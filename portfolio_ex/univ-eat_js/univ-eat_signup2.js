// ── 뒤로가기 ──
document.getElementById('btnBack').addEventListener('click', () => {
  navigateTo('univ-eat_signup1.html', true);
});

// ── 다음 단계 ──
document.getElementById('btnNext').addEventListener('click', () => {
  navigateTo('univ-eat_signup3.html');
});

// ── 성별 버튼 토글 ──
document.querySelectorAll('.gender-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('gender-btn--active'));
    btn.classList.add('gender-btn--active');
  });
});

// ── 아바타 사진 업로드 ──
const avatarUploader = document.getElementById('avatarUploader');
const avatarInput    = document.getElementById('avatarInput');
const avatarEmoji    = document.getElementById('avatarEmoji');
const avatarImg      = document.getElementById('avatarImg');

avatarUploader.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarImg.src = ev.target.result;
    avatarImg.style.display = 'block';
    avatarEmoji.style.display = 'none';
  };
  reader.readAsDataURL(file);
});
