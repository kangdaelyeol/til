// BadgeBox State
let badgeRequestFrameId = null
let isBadgeHidden = false
let badgeOpacity = 1
const REDUCING_OPACITY_RATIO = 0.85
const INCREASING_OPACITY_RATIO = 1.15

const badgeBoxEl = document.querySelector('.badge_box')
const toTopButtonEl = document.querySelector('.to_top')

const hiddenBadge = () => {
    badgeOpacity *= REDUCING_OPACITY_RATIO
    console.log(badgeOpacity)
    if (badgeOpacity < 0.00000001) {
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

const onWindowScroll = (e) => {
    activeBadgeBox()
    activeToTopButton()
}

const onWindowLoad = () => {
    window.addEventListener('scroll', onWindowScroll)
    toTopButtonEl.addEventListener('click', scrollToZero)
}

window.addEventListener('load', onWindowLoad)
