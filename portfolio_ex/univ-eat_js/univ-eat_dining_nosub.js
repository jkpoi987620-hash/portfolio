// ── Leaflet 지도 초기화 ──
const CENTER = [37.5596, 126.9369];

const map = L.map('map', {
  center: CENTER,
  zoom: 17,
  zoomControl: false,
  attributionControl: false,
  dragging: true,
  scrollWheelZoom: false,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// ── 내 위치 마커 ──
const myIcon = L.divIcon({
  className: '',
  html: `<div class="map-my-location">
    <div class="map-my-location__pulse"></div>
    <div class="map-my-location__pulse"></div>
    <div class="map-my-location__dot"></div>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});
L.marker(CENTER, { icon: myIcon }).addTo(map);

// ── 식당 가격 핀 ──
const restaurants = [
  { lat: 37.5602, lng: 126.9355, label: '🍜 5,500원', color: 'green' },
  { lat: 37.5590, lng: 126.9380, label: '🍗 8,000원', color: 'red'   },
  { lat: 37.5588, lng: 126.9358, label: '🍛 6,000원', color: 'green' },
  { lat: 37.5601, lng: 126.9390, label: '🥗 7,500원', color: 'red'   },
  { lat: 37.5582, lng: 126.9375, label: '🍱 4,800원', color: 'green' },
];

restaurants.forEach(r => {
  const icon = L.divIcon({
    className: '',
    html: `<div class="map-price-pin map-price-pin--${r.color}">${r.label}</div>`,
    iconSize: null,
    iconAnchor: [0, 12],
  });
  L.marker([r.lat, r.lng], { icon }).addTo(map);
});

// ── 커스텀 줌 컨트롤 ──
document.getElementById('mapZoomIn').addEventListener('click', () => map.zoomIn());
document.getElementById('mapZoomOut').addEventListener('click', () => map.zoomOut());
document.getElementById('mapLocate').addEventListener('click', () => map.setView(CENTER, 17));

// ── 정렬 칩 전환 ──
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    chip.classList.add('chip--active');
  });
});

// ── 바텀 네비 (미구독 플로우) ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_nosub.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal_nosub.html');
});

document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub_nosub.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage_nosub.html');
});
