/* =============================================
   main.js
============================================= */

/* --------------------------------------------------
   1. 검색 드롭다운
-------------------------------------------------- */
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');

searchToggle.addEventListener('click', (e) => {
  e.preventDefault();
  const isOpen = searchBox.classList.toggle('open');
  if (isOpen) searchInput.focus();
});

// 바깥 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrap')) {
    searchBox.classList.remove('open');
  }
});

// 엔터 검색
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) alert(`"${q}" 검색`); // 실제 연결 시 교체
  }
});


/* --------------------------------------------------
   2. 헤더 스크롤 효과 + TOP 버튼
-------------------------------------------------- */
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 10);
  scrollTopBtn.classList.toggle('visible', scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* --------------------------------------------------
   3. 스크롤 fade-in 애니메이션
-------------------------------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));


/* --------------------------------------------------
   4. BEST 배너 카테고리 탭
   - 탭 active 교체
   - h3 텍스트 페이드 전환
   - 배경 레이어 크로스페이드
-------------------------------------------------- */
const categoryTabs = document.getElementById('categoryTabs');
const bestTitle = document.getElementById('bestTitle');
const bgLayers = document.querySelectorAll('#bestBannerBox .bg-layer');
const tabLabels = ['Bed', 'Desk', 'Sofa', 'Shelf'];

/* 탭별 모바일 상품 정보 */
const tabProducts = [
  { name: 'TEMPUR PRO AIR', sub: '템퍼 프로 에어' },
  { name: 'TEMPUR DESK', sub: '템퍼 데스크' },
  { name: 'TEMPUR SOFA', sub: '템퍼 소파' },
  { name: 'TEMPUR SHELF', sub: '템퍼 쉘프' },
];

categoryTabs.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    const idx = Number(li.dataset.index);

    // 탭 active 교체
    categoryTabs.querySelectorAll('li').forEach(t => t.classList.remove('active'));
    li.classList.add('active');

    // 텍스트 페이드 아웃 → 교체 → 페이드 인
    bestTitle.classList.add('fade-out');
    setTimeout(() => {
      bestTitle.textContent = tabLabels[idx];
      bestTitle.classList.remove('fade-out');
    }, 400);

    // 배경 레이어 크로스페이드
    bgLayers.forEach((layer, i) => {
      layer.classList.toggle('active', i === idx);
    });

    // 모바일 카드 - 이미지 라벨 + 상품명 fade 전환
    const imgLabel = document.getElementById('bestImgLabel');
    const productName = document.getElementById('bestProductName');
    const productSub = document.getElementById('bestProductSub');

    if (imgLabel) imgLabel.textContent = tabLabels[idx];

    [productName, productSub].forEach(el => el && el.classList.add('fading'));
    setTimeout(() => {
      if (productName) productName.textContent = tabProducts[idx].name;
      if (productSub) productSub.textContent = tabProducts[idx].sub;
      [productName, productSub].forEach(el => el && el.classList.remove('fading'));
    }, 300);
  });
});


/* --------------------------------------------------
   5. ONLY FOR YOU 필터 탭
-------------------------------------------------- */
const filterTabs = document.getElementById('filterTabs');

filterTabs.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    filterTabs.querySelectorAll('li').forEach(t => t.classList.remove('active'));
    li.classList.add('active');
  });
});


/* --------------------------------------------------
   6. SELECTION 슬라이더 dot
-------------------------------------------------- */
const dots = document.querySelectorAll('#sliderDots li');
let currentDot = 0;

function setDot(index) {
  dots.forEach(d => d.classList.remove('active'));
  currentDot = (index + dots.length) % dots.length;
  dots[currentDot].classList.add('active');
}

document.getElementById('prevDot').addEventListener('click', () => setDot(currentDot - 1));
document.getElementById('nextDot').addEventListener('click', () => setDot(currentDot + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => setDot(i)));

// 자동 슬라이드 (3초)
setInterval(() => setDot(currentDot + 1), 3000);


/* --------------------------------------------------
   7. 모바일 - 햄버거 메뉴
-------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
  });
  // 드로어 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#hamburger') && !e.target.closest('#mobileDrawer')) {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    }
  });
}


/* --------------------------------------------------
   8. 모바일 - 푸터 아코디언
-------------------------------------------------- */
document.querySelectorAll('footer .link-box > ul').forEach(ul => {
  const title = ul.querySelector('li:first-child');
  if (!title) return;
  title.addEventListener('click', () => {
    // 모바일에서만 동작
    if (window.innerWidth > 768) return;
    ul.classList.toggle('open');
  });
});


/* --------------------------------------------------
   9. PC / 모바일 전환 시 표시 요소 제어
-------------------------------------------------- */
/* --------------------------------------------------
   터치 슬라이드 - STORE 카드
-------------------------------------------------- */
(function () {
  const slider = document.getElementById('storeMoSlider');
  if (!slider) return;
  let startX = 0, scrollLeft = 0, isDragging = false;

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    scrollLeft = slider.scrollLeft;
    isDragging = true;
  }, { passive: true });

  slider.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = startX - e.touches[0].clientX;
    slider.scrollLeft = scrollLeft + dx;
  }, { passive: true });

  slider.addEventListener('touchend', () => { isDragging = false; });
})();


function applyViewport() {
  const isMobile = window.innerWidth <= 768;

  // TOP 배너: PC/모바일 텍스트 전환
  document.querySelectorAll('.top-title-pc, .top-sub-pc').forEach(el => {
    el.style.display = isMobile ? 'none' : '';
  });
  document.querySelectorAll('.top-title-mo, .top-btn, .top-slide-bar').forEach(el => {
    el.style.display = isMobile ? '' : 'none';
  });

  // ONLY FOR YOU: PC img / 모바일 ofy-item 전환
  document.querySelectorAll('.ofy-pc-img').forEach(el => {
    el.style.display = isMobile ? 'none' : '';
  });
  document.querySelectorAll('.ofy-item').forEach(el => {
    el.style.display = isMobile ? 'flex' : 'none';
  });

  // STORE: PC box / 모바일 store-mo-grid 전환
  const storePcBox = document.querySelector('.store-banner .inner .box');
  const storeMoGrid = document.querySelector('.store-mo-grid');
  if (storePcBox) storePcBox.style.display = isMobile ? 'none' : '';
  if (storeMoGrid) storeMoGrid.style.display = isMobile ? 'grid' : 'none';

  // 햄버거: 모바일만 표시
  if (hamburger) hamburger.style.display = isMobile ? 'flex' : 'none';
}

applyViewport();
window.addEventListener('resize', applyViewport);

