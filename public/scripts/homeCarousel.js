
window.onload = function(){

  const slides = document.querySelectorAll('.slider-img-container');
  const dotsContainer = document.querySelector('.dots-container');
 

  let currentImage = 0;
  let slidesLength = slides.length;


  const carouselInterval = setInterval(handleCarouselActualImage, 5000);
  const dotsInterval = setInterval(dotsNextSlide, 5001);
 

  function handleCarouselImgClasses() {
    slides.forEach((img, i) => { // function that adds or removes the class of an image
        if (i == currentImage) {
            img.classList.add('active');
            
        } else {
            img.classList.remove('active');
        }
    })
  }

  function handleCarouselActualImage() {
    if(currentImage < slidesLength - 1) { // function that handles the maths of the actual image. 
      // this function just redeclares the image based on the condition
      // whether is the last dot or not
      currentImage += 1;
      handleCarouselImgClasses()
    } else {
      currentImage = 0
      handleCarouselImgClasses()
    }
  }

  for(i = 0; i < slidesLength; i++) {
    if(i == 0) {
      dotsContainer.innerHTML += "<div class='home-slider-dot dot-active'></div>";
    } else {
      dotsContainer.innerHTML += "<div class='home-slider-dot'></div>";
    }
  }

  const dots = document.querySelectorAll('.home-slider-dot');
  // i needed to declare the dots here because of the for because if not it came undefined


  dotsJump()


  function dotsNextSlide () { 
    const activeDot = document.querySelector('.dot-active')
    activeDot.classList.remove('dot-active')
    if (activeDot.nextElementSibling) {
      const dotToActive = activeDot.nextElementSibling;
      dotToActive.classList.add('dot-active')
    } else {
      dots[0].classList.add('dot-active')
    }
  }
 
 
  function dotsJump () {
    dots.forEach((dot, i) => { 
      dot.addEventListener('click', () => {
        if(!dot.classList.contains('dot-active')){
          const activeDot = document.querySelector('.dot-active')
          activeDot.classList.remove('dot-active')
          dot.classList.add('dot-active')
          currentImage = i;
          handleCarouselImgClasses()
          clearInterval(carouselInterval)
          clearInterval(dotsInterval)
        }
      })
    })
  } 
}
