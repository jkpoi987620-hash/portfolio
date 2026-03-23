document.addEventListener('DOMContentLoaded', () => {

  /* 네비 활성 메뉴 클릭 처리 */
  const navLinks = document.querySelectorAll('.nav-left a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* 스크롤 시 네비 그림자 강조 */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,.10)'
      : '0 1px 6px rgba(0,0,0,.06)';
  });

  /* 3dot 메뉴 토글 */
  const dotsBtn = document.getElementById('navDotsBtn');
  const dotsMenu = document.getElementById('navDotsMenu');
  if (dotsBtn && dotsMenu) {
    dotsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dotsMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      dotsMenu.classList.remove('open');
    });
  }

  /* 푸터 아코디언 (태블릿/모바일) */
  document.querySelectorAll('.footer-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.nextElementSibling;
      const isOpen = list.classList.contains('open');
      // 모두 닫기
      document.querySelectorAll('.footer-menu-list').forEach(l => l.classList.remove('open'));
      document.querySelectorAll('.footer-accordion-btn').forEach(b => b.classList.remove('open'));
      // 클릭한 것만 토글
      if (!isOpen) {
        list.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

  /* 햄버거 메뉴 토글 */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  const mobileClose = document.getElementById('navMobileClose');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

});


function filterPosts(btn, category) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.post-item').forEach(item => {
    const cat = item.querySelector('.post-category').textContent.replace(/[\[\]]/g, '');
    item.style.display = (category === '전체' || cat === category) ? 'flex' : 'none';
  });
}