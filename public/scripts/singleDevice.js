window.addEventListener('load', () => {
    const slides = document.querySelectorAll(".single-product-img");
    const leftArrowBtn = document.querySelector(".left-arrow-btn");
    const rightArrowBtn = document.querySelector(".right-arrow-btn");

    const imgDots = document.querySelectorAll('.dot-img')

    // NEXT AND PREV SLIDE ARROWS FUNC

    let currentImage = 0;
    let slidesLength = slides.length; // 3 

    function handleCarouselFn() {
        slides.forEach((img, i) => {
            if (i == currentImage) {
                img.classList.add('active-img')
            } else {
                img.classList.remove('active-img');
            }
        })
    }

    rightArrowBtn.addEventListener('click', () => {
        if (currentImage < slidesLength - 1) {
            currentImage += 1
            handleCarouselFn()
            dotsNextSlide()

        } else {
            currentImage = 0
            handleCarouselFn()
            dotsNextSlide()
        }
    })

    leftArrowBtn.addEventListener('click', () => {
        if (currentImage != 0) {
            currentImage -= 1
            handleCarouselFn()
            dotsPrevSlide()

        } else {
            currentImage = slidesLength - 1;
            handleCarouselFn()
            dotsPrevSlide()

        }
    })

    // DOTS FUNC

    dotsJump()

    function dotsNextSlide() {
        const activeDot = document.querySelector('.active-dot')
        activeDot.classList.remove('active-dot')
        if (activeDot.nextElementSibling) {
            const dotToActive = activeDot.nextElementSibling;
            dotToActive.classList.add('active-dot')
        } else {
            imgDots[0].classList.add('active-dot')
        }
    }

    function dotsPrevSlide() {
        const activeDot = document.querySelector('.active-dot')
        activeDot.classList.remove('active-dot')
        if (activeDot.previousElementSibling) {
            const dotToActive = activeDot.previousElementSibling;
            dotToActive.classList.add('active-dot')
        } else {
            imgDots[imgDots.length - 1].classList.add('active-dot')
        }
    }

    function dotsJump() {
        imgDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                if (!dot.classList.contains('active-dot')) {                 
                    const activeDot = document.querySelector('.active-dot');
                    activeDot.classList.remove('active-dot')
                    dot.classList.add('active-dot')
                    currentImage = i;
                    handleCarouselFn()
                }
            })
        })

    
    }





})