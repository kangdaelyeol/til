// DOM Element
const badgeBoxEl = document.querySelector('.badge')
const toTopButtonEl = document.querySelector('.to_top')
const promotionContainerEl = document.querySelector('.notice .promotion')
const promotionShowBtnEl = document.querySelector('.notice .right .icon')

const visualFadeInImgList = document.querySelectorAll('.visual .fade-in')
const youtubeFloatingImgList = document.querySelectorAll(
    '.youtube .inner .floating'
)

const seasonProductContentEl = document.querySelector(
    '.season-product .content'
)

const reserveCoffeeContentEl = document.querySelector(
    '.reserve-coffee .content'
)

const pickYourFavoriteContentEl = document.querySelector(
    '.pick-your-favorite .content'
)

const findStoreContentEl = document.querySelector('.find-store .content')

// To Top Btn Action

const scrollToZero = () => {
    gsap.to(window, 0.5, {
        scrollTo: 0,
    })
}
// Event Handler

const onWindowScroll = () => {
    if (scrollY > 200) {
        gsap.to(badgeBoxEl, 0.6, {
            opacity: 0,
            display: 'none',
        })
        gsap.to(toTopButtonEl, 0.4, {
            x: 0,
        })
    } else {
        gsap.to(badgeBoxEl, 0.6, {
            opacity: 1,
            display: 'block',
        })
        gsap.to(toTopButtonEl, 0.4, {
            x: 100,
        })
    }
}

const onWindowLoad = () => {
    window.addEventListener('scroll', _.throttle(onWindowScroll, 300))
    toTopButtonEl.addEventListener('click', scrollToZero)
    promotionShowBtnEl.addEventListener('click', () => {
        promotionContainerEl.classList.toggle('hide')
    })

    visualFadeInImgList.forEach((el, ind) => {
        gsap.to(el, 1, {
            opacity: 1,
            delay: ind * 0.6,
        })
    })
    new Swiper('.notice .left .swiper', {
        direction: 'vertical',
        loop: true,
    })

    new Swiper('.promotion .swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        pagination: {
            el: '.promotion .swiper-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.promotion .swiper-button-prev',
            nextEl: '.promotion .swiper-button-next',
        },
    })

    new Swiper('.awards .swiper', {
        autoplay: {
            delay: 3000,
        },
        slidesPerView: 5,
        loop: true,
        spaceBetween: 10,
        navigation: {
            prevEl: '.awards .swiper-button-prev',
            nextEl: '.awards .swiper-button-next',
        },
    })

    youtubeFloatingImgList.forEach((el, index) => {
        gsap.to(el, {
            y: 30 + index * 10,
            duration: 1.5 + index * 1,
            repeat: -1,
            yoyo: true,
            ease: 'bounce.inOut',
        })
    })
}

window.addEventListener('load', onWindowLoad)
