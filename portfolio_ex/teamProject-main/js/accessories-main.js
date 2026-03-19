// ── Collection conveyor belt slider ──
const track = document.getElementById('slider-track');
const slides = Array.from(track.querySelectorAll('.slide-item'));
const colName = document.getElementById('col-name');
const colDesc = document.getElementById('col-desc');

const INACTIVE_W = 254;
const GAP = 40;

let offset = 0;

function getStepWidth() {
  return INACTIVE_W + GAP;
}

function advance() {
  // Remove active from current first card
  slides[0].classList.remove('active');

  // Animate track sliding left
  offset -= getStepWidth();
  track.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  track.style.transform = `translateX(${offset}px)`;

  // After animation ends, move first slide to end (carousel loop)
  setTimeout(() => {
    track.style.transition = 'none';
    const first = slides.shift();
    track.appendChild(first);
    slides.push(first);

    // Reset offset (first element removed from front)
    offset += getStepWidth();
    track.style.transform = `translateX(${offset}px)`;

    // Make new first item active
    slides[0].classList.add('active');

    // Fade out text then update
    colName.style.opacity = 0;
    colDesc.style.opacity = 0;
    setTimeout(() => {
      colName.textContent = slides[0].dataset.name;
      colDesc.innerHTML = slides[0].dataset.desc;
      colName.style.opacity = 1;
      colDesc.style.opacity = 0.7;
    }, 50);
  }, 620);
}

// Auto-play every 3s
setInterval(advance, 3000);
