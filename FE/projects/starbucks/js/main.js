const badgeBoxEl = document.querySelector('.badge_box')
const toTopButtonEl = document.querySelector('.to_top')

const activeBadgeBox = () => {
    if (scrollY > 200) badgeBoxEl.classList.add('hidden')
    else badgeBoxEl.classList.remove('hidden')
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
