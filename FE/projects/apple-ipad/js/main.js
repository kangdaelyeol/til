const headerEl = document.querySelector('header')

const basketStarterEl = headerEl.querySelector('.basket-starter')
const basketEl = headerEl.querySelector('.basket')

const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')

// Header - basket action

const showBasket = () => {
    basketEl.classList.add('show')
}

const hideBasket = () => {
    basketEl.classList.remove('show')
}

basketStarterEl.addEventListener('click', (e) => {
    e.stopPropagation()
    if (basketEl.classList.contains('show')) {
        hideBasket()
    } else {
        showBasket()
    }
})

basketEl.addEventListener('click', (e) => {
    e.stopPropagation()
})

window.addEventListener('click', () => {
    hideBasket()
})

// Header - search bar action

const showSearch = (e) => {
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')
    e.stopPropagation()
}

const hideSearch = () => {
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
}

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchWrapEl.addEventListener('click', (e) => {
    e.stopPropagation()
})
window.addEventListener('click', hideSearch)
