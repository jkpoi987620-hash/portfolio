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



const ingredientData = {
  hyaluronic: {
    detailImg: '../aquadream-img/aquadrem_ingredient-sec2.png',
    products: [
      { brand: 'COSRX', name: '히알루론산 모이스처 크림', effect: '강력한 수분 보습 크림', img: '../aquadream-img/aquadrem_ingredient-item1.png' },
      { brand: 'Laneige', name: '워터뱅크 하이드로 크림', effect: '수분 장벽 강화', img: '../aquadream-img/aquadrem_ingredient-item2.png' },
      { brand: 'Dr.G', name: '레드 블레미쉬 수딩 크림', effect: '피부 진정 보습', img: '../aquadream-img/aquadrem_ingredient-item3.png' },
      { brand: 'Innisfree', name: '그린티 히알루론 세럼', effect: '촉촉한 수분 공급', img: '../aquadream-img/aquadrem_ingredient-item4.png' },
    ]
  },
  niacinamide: {
    detailImg: '../aquadream-img/aquadrem_ingredient-sec2_2.png',
    products: [
      { brand: 'COSRX', name: '더 나이아신아마이드 15 세럼', effect: '피지 조절과 모공 케어', img: '../aquadream-img/aquadrem_ingredient-item5.png' },
      { brand: 'COS DE BAHA', name: '나이아신아마이드 10 세럼', effect: '피부 톤 개선과 잡티 케어', img: '../aquadream-img/aquadrem_ingredient-item6.png' },
      { brand: 'APLB', name: '아연 나이아신아마이드 앰플 세럼', effect: '피지 조절과 트러블 케어', img: '../aquadream-img/aquadrem_ingredient-item7.png' },
      { brand: 'ONE THING', name: '나이아신아마이드 글루타치온 세럼', effect: '피부 톤을 밝힘', img: '../aquadream-img/aquadrem_ingredient-item8.png' },
    ]
  },
  panthenol: {
    detailImg: '../aquadream-img/aquadrem_ingredient-sec2_3.png',
    products: [
      { brand: 'AESTURA', name: '아토베리어365 크림', effect: '피부 장벽 강화', img: '../aquadream-img/aquadrem_ingredient-item9.png' },
      { brand: 'REAL CICA', name: '시카 판테놀 세럼', effect: '자극받은 피부를 진정', img: '../aquadream-img/aquadrem_ingredient-item10.png' },
      { brand: 'BORN', name: '판테놀 투 투 세럼', effect: '피부 장벽과 보습을 케어', img: '../aquadream-img/aquadrem_ingredient-item11.png' },
      { brand: 'PENTABERRY', name: '판테놀 리페어 크림', effect: '건조한 피부에 보습과 진정', img: '../aquadream-img/aquadrem_ingredient-item12.png' },
    ]
  },
  ceramide: {
    detailImg: '../aquadream-img/aquadrem_ingredient-sec2_4.png',
    products: [
      { brand: 'BENTON', name: '세라마이드 크림 10,000ppm', effect: '피부 장벽을 강화', img: '../aquadream-img/aquadrem_ingredient-item13.png' },
      { brand: 'APLB', name: '히알루론산 세라마이드 HA B5 크림', effect: '피부 수분과 장벽을 동시에 케어', img: '../aquadream-img/aquadrem_ingredient-item14.png' },
      { brand: 'CeraVe', name: '모이스처라이징 크림', effect: '피부 장벽을 강화하고 보습을 유지', img: '../aquadream-img/aquadrem_ingredient-item15.png' },
      { brand: 'Pilgrim', name: 'Rice Water Ceramide', effect: '피부 장벽과 수분 균형을 케어', img: '../aquadream-img/aquadrem_ingredient-item16.png' },
    ]
  }
};

const ingredients = ['hyaluronic', 'niacinamide', 'panthenol', 'ceramide'];

function selectIngredient(key) {
  // 카드 active 처리
  document.querySelectorAll('.ingredient-card').forEach((el, i) => {
    el.classList.toggle('active', ingredients[i] === key);
  });

  const data = ingredientData[key];

  // 섹션2 이미지 교체
  document.getElementById('detail-img').src = data.detailImg;

  // 섹션3 카드 교체
  const container = document.getElementById('product-cards');
  container.innerHTML = data.products.map(p => `
    <div class="product-card card-shadow">
      <img class="product-card-img" src="${p.img}" alt="${p.name}">
      <div class="product-card-info">
        <span class="product-brand-small">${p.brand}</span>
        <span class="product-name">${p.name}</span>
        <span class="product-effect">${p.effect}</span>
      </div>
    </div>
  `).join('');
}

// 초기 렌더링
selectIngredient('hyaluronic');

// 검색창 클릭 시 input 포커스
document.querySelector('.search-wrap').addEventListener('click', function () {
  document.querySelector('.search-input').focus();
});