addEventListener("load", () => {

  const slides = document.querySelectorAll(".slide");
  const carousel = document.querySelector(".carousel");

  const total = slides.length;
  let index = 2;

  function updateSlider(){

    slides.forEach(slide=>{
      slide.classList.remove(
        "active",
        "left1",
        "left2",
        "right1",
        "right2"
      );
    });

    const left2 = (index - 2 + total) % total;
    const left1 = (index - 1 + total) % total;
    const right1 = (index + 1) % total;
    const right2 = (index + 2) % total;

    slides[index].classList.add("active");
    slides[left1].classList.add("left1");
    slides[left2].classList.add("left2");
    slides[right1].classList.add("right1");
    slides[right2].classList.add("right2");

  }

  updateSlider();

  /* 자동 슬라이드 */

  setInterval(()=>{
    index = (index + 1) % total;
    updateSlider();
  },3000);

  /* 클릭 슬라이드 */

  slides.forEach((slide,i)=>{

    slide.addEventListener("click", ()=>{

      if(i === index) return;

      if(
        i === (index + 1) % total ||
        i === (index + 2) % total
      ){
        index = (index + 1) % total;
      }

      if(
        i === (index - 1 + total) % total ||
        i === (index - 2 + total) % total
      ){
        index = (index - 1 + total) % total;
      }

      updateSlider();

    });

  });

  /* 드래그 슬라이드 */

  let startX = 0;
  let isDragging = false;

  carousel.addEventListener("mousedown",(e)=>{
    isDragging = true;
    startX = e.clientX;
  });

  carousel.addEventListener("mouseup",(e)=>{

    if(!isDragging) return;

    let endX = e.clientX;
    let diff = startX - endX;

    if(Math.abs(diff) > 50){

      if(diff > 0){
        index = (index + 1) % total;
      }else{
        index = (index - 1 + total) % total;
      }

      updateSlider();
    }

    isDragging = false;

  });

});