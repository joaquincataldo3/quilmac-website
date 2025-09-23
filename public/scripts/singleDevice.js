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
                img.classList.remove('prev-slide')
                img.classList.remove('next-slide')
                img.classList.add('active-img')
            }
            else if(i == currentImage - 1) {
                img.classList.remove('active-img')
                img.classList.remove('next-slide')
                img.classList.add('prev-slide')
            }
            else if((i == 0 && currentImage == slidesLength - 1)) {
                img.classList.remove('active-img')
                img.classList.remove('prev-slide')
                img.classList.add('next-slide');
            }
            else {
                img.classList.remove('active-img')
                img.classList.remove('prev-slide')
                img.classList.add('next-slide');
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

    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const deviceId = deleteBtn.dataset.deviceid; 
        const baseUrl = window.location.origin;
        fetch(`${baseUrl}/admin/delete/device/${deviceId}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.href = '/'
             });
    })




})