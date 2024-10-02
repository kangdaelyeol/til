// DOM Element
const badgeBoxEl = document.querySelector('.badge_box')
const toTopButtonEl = document.querySelector('.to_top')
const promotionLeftBtnEl = document.querySelector('.promotion .btn_box .left')
const promotionRightBtnEl = document.querySelector('.promotion .btn_box .right')
const promotionSwiperEl = document.querySelector(
    '.promotion .swiper_wrapper .swiper'
)
const promotionSwiperItemElList = promotionSwiperEl.querySelectorAll('.item')
const promotionRadioBoxEl = document.querySelector('.promotion .radio_box')
const promotionRadioBtnElList = promotionRadioBoxEl.querySelectorAll('.radio')

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

const awardSliderEl = document.querySelector(
    '.awards .content .slider_wrapper .slider'
)
const awardSliderItemElList = awardSliderEl.querySelectorAll('.item')

// BadgeBox State
let badgeRequestFrameId = null
let isBadgeHidden = false
let badgeOpacity = 1
const REDUCING_OPACITY_RATIO = 0.7
const INCREASING_OPACITY_RATIO = 1.15

// Promotion Swiper state & action
const SWIPER_ITEM_INTERVAL = 829
let promotionSwiperTranslateX = SWIPER_ITEM_INTERVAL / 2
let currentPromotionSwiperItemFocusIndex = 0

const hiddenBadge = () => {
    badgeOpacity *= REDUCING_OPACITY_RATIO
    if (badgeOpacity < 0.0000001) {
        badgeOpacity = 0
        badgeBoxEl.style.opacity = badgeOpacity
        badgeBoxEl.style.display = 'none'
        cancelAnimationFrame(badgeRequestFrameId)
        badgeRequestFrameId = null
        return
    }
    badgeBoxEl.style.opacity = badgeOpacity
    badgeRequestFrameId = requestAnimationFrame(hiddenBadge)
    return
}

const showBadge = () => {
    badgeBoxEl.style.display = 'block'
    if (badgeOpacity < 0.05) badgeOpacity = 0.05
    badgeOpacity *= INCREASING_OPACITY_RATIO
    if (badgeOpacity > 1) {
        badgeOpacity = 1
        badgeBoxEl.style.opacity = badgeOpacity
        cancelAnimationFrame(badgeRequestFrameId)
        badgeRequestFrameId = null
        return
    }
    badgeBoxEl.style.opacity = badgeOpacity

    badgeRequestFrameId = requestAnimationFrame(showBadge)

    return
}

const activeBadgeBox = () => {
    if (scrollY > 200 && isBadgeHidden === false) {
        isBadgeHidden = true
        if (badgeRequestFrameId !== null) {
            cancelAnimationFrame(badgeRequestFrameId)
            badgeRequestFrameId = null
        }
        badgeRequestFrameId = requestAnimationFrame(hiddenBadge)
    } else if (scrollY < 200 && isBadgeHidden === true) {
        isBadgeHidden = false
        if (badgeRequestFrameId !== null) {
            cancelAnimationFrame(badgeRequestFrameId)
            badgeRequestFrameId = null
        }
        badgeRequestFrameId = requestAnimationFrame(showBadge)
    }
}

// Award Swiper state & action

const AWARD_ITEM_WIDTH = 220
let currentAwardSwiperTranslateX = 0

setInterval(() => {
    currentAwardSwiperTranslateX += AWARD_ITEM_WIDTH
    if (
        currentAwardSwiperTranslateX >
        (awardSliderItemElList.length - 5) * AWARD_ITEM_WIDTH
    )
        currentAwardSwiperTranslateX = 0
    awardSliderEl.style.transform = `translateX(-${currentAwardSwiperTranslateX}px)`
}, 2000)

/* 
    Intersection Observer
     - Season Product Section
     - Reserve Coffee Section
     - Pick Your Favorite Section
     - Find Store Section
*/

const intersectionObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].intersectionRatio >= 0.2) {
            entries[0].target.classList.add('active')
        } else {
            entries[0].target.classList.remove('active')
        }
    },
    {
        threshold: 0.2,
    }
)

const elList = [
    seasonProductContentEl,
    reserveCoffeeContentEl,
    pickYourFavoriteContentEl,
    findStoreContentEl,
]

elList.forEach((el) => {
    intersectionObserver.observe(el)
})

// To Top Btn Action

const activeToTopButton = () => {
    if (scrollY > 200) toTopButtonEl.classList.add('active')
    else toTopButtonEl.classList.remove('active')
}

const scrollToZero = () => {
    scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

// Promotion Swiper Action

const movePromotionSwiperToNext = () => {
    console.log(promotionRadioBtnElList.length)
    if (
        currentPromotionSwiperItemFocusIndex >=
        promotionRadioBtnElList.length - 1
    )
        return

    promotionSwiperItemElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.remove('active')
    promotionRadioBtnElList[
        currentPromotionSwiperItemFocusIndex++
    ].classList.remove('active')

    promotionSwiperItemElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.add('active')
    promotionRadioBtnElList[currentPromotionSwiperItemFocusIndex].classList.add(
        'active'
    )

    promotionSwiperTranslateX -= SWIPER_ITEM_INTERVAL

    promotionSwiperEl.style.transform = `translateX(${promotionSwiperTranslateX}px)`
}

const movePromotionSwiperToPrev = () => {
    if (currentPromotionSwiperItemFocusIndex <= 0) return
    promotionRadioBtnElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.remove('active')
    promotionSwiperItemElList[
        currentPromotionSwiperItemFocusIndex--
    ].classList.remove('active')

    promotionRadioBtnElList[currentPromotionSwiperItemFocusIndex].classList.add(
        'active'
    )
    promotionSwiperItemElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.add('active')

    promotionSwiperTranslateX += SWIPER_ITEM_INTERVAL

    promotionSwiperEl.style.transform = `translateX(${promotionSwiperTranslateX}px)`
}

// Event Handler

const onWindowScroll = () => {
    activeBadgeBox()
    activeToTopButton()
}

const resizingElements = () => {
    promotionSwiperTranslateX =
        -currentPromotionSwiperItemFocusIndex * SWIPER_ITEM_INTERVAL +
        (innerWidth - SWIPER_ITEM_INTERVAL) / 2
    promotionSwiperEl.style.transform = `translateX(${promotionSwiperTranslateX}px)`
}

const onRadioBoxClick = (e) => {
    if (!e.target.dataset.itemIndex) return
    const nextIndex = Number(e.target.dataset.itemIndex)

    if (currentPromotionSwiperItemFocusIndex === nextIndex) return

    const indexDiff = nextIndex - currentPromotionSwiperItemFocusIndex

    promotionSwiperItemElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.remove('active')
    promotionRadioBtnElList[
        currentPromotionSwiperItemFocusIndex
    ].classList.remove('active')

    promotionSwiperItemElList[nextIndex].classList.add('active')
    promotionRadioBtnElList[nextIndex].classList.add('active')

    currentPromotionSwiperItemFocusIndex = nextIndex

    promotionSwiperTranslateX -= SWIPER_ITEM_INTERVAL * indexDiff

    promotionSwiperEl.style.transform = `translateX(${promotionSwiperTranslateX}px)`
}

const onWindowLoad = () => {
    resizingElements()
    window.addEventListener('scroll', onWindowScroll)
    toTopButtonEl.addEventListener('click', scrollToZero)
    promotionLeftBtnEl.addEventListener('click', movePromotionSwiperToPrev)
    promotionRightBtnEl.addEventListener('click', movePromotionSwiperToNext)
    promotionRadioBoxEl.addEventListener('click', onRadioBoxClick)
}

window.addEventListener('load', onWindowLoad)
window.addEventListener('resize', () => {
    resizingElements()
})
