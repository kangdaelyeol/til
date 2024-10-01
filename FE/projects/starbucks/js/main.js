const badgeBoxEl = document.querySelector('.badge_box')

const activeBadgeBox = () => {
    if (scrollY > 200) badgeBoxEl.classList.add('hidden')
    else badgeBoxEl.classList.remove('hidden')
}

const onWindowScroll = (e) => {
    activeBadgeBox()
}

const onWindowLoad = () => {
    window.addEventListener('scroll', onWindowScroll)
}

window.addEventListener('load', onWindowLoad)
