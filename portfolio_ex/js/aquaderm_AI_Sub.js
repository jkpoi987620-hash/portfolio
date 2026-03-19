document.addEventListener('DOMContentLoaded', () => {

  /* 모바일: page-intro footer 아래 여백 채우기 */
  function fillIntroFooter() {
    const pageIntro = document.getElementById('page-intro');
    if (!pageIntro) return;
    const footer = pageIntro.querySelector('footer');
    const hero = pageIntro.querySelector('.diag-hero');
    if (!footer || !hero) return;
    const viewH = window.innerHeight;
    const heroH = hero.offsetHeight;
    const navH = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
    const remaining = viewH - navH - heroH;
    if (remaining > 0) {
      footer.style.minHeight = remaining + 'px';
    }
  }
  fillIntroFooter();
  window.addEventListener('resize', fillIntroFooter);

  /* 비활성 page 완전히 숨김 */
  document.querySelectorAll('.page').forEach(p => {
    if (!p.classList.contains('active')) {
      p.style.display = 'none';
      p.style.height = '0';
      p.style.overflow = 'hidden';
    }
  });



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


// ── 페이지 높이를 body에 맞춤 ──
function fitPageHeight() {
  const active = document.querySelector('.page.active');
  if (!active) return;
  // 비활성 page 모두 숨김
  document.querySelectorAll('.page').forEach(p => {
    if (!p.classList.contains('active')) {
      p.style.display = 'none';
      p.style.height = '0';
      p.style.overflow = 'hidden';
    }
  });
}

// ── 페이지 전환 (슬라이드 인) ──
function goToPage(targetId) {
  const current = document.querySelector('.page.active');
  const target = document.getElementById(targetId);
  if (!target || target === current) return;

  current.classList.remove('active');
  current.style.display = 'none';
  current.style.height = '0';
  current.style.overflow = 'hidden';

  target.style.height = '';
  target.style.overflow = '';
  target.style.display = 'block';
  target.classList.add('active');
  void target.offsetWidth;
  target.classList.add('entering');

  // 애니메이션(0.6s) 동안 가로 스크롤 차단
  document.body.style.overflowX = 'hidden';
  target.addEventListener('animationend', () => {
    target.classList.remove('entering');
    document.body.style.overflowX = 'auto';
  }, { once: true });

  // 로딩 페이지 진입 시 결과 페이지로 자동 이동
  if (targetId === 'page-loading') {
    setTimeout(() => {
      goToPage('page-result');
    }, 4000);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 카드 선택 ──
// multi: true → 최대 2개 다중 선택 / false → 단일 선택
function selectCard(el, group, multi) {
  const siblings = document.querySelectorAll(`[onclick*="'${group}'"]`);
  if (multi) {
    const selected = Array.from(siblings).filter(c => c.classList.contains('selected'));
    if (el.classList.contains('selected')) {
      el.classList.remove('selected');
    } else {
      if (selected.length < 2) el.classList.add('selected');
    }
  } else {
    siblings.forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }
}
