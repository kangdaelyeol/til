const headerEl = document.querySelector('header')

const headerMenuIconElList = [...headerEl.querySelectorAll('.menu li')]

const basketStarterEl = headerEl.querySelector('.basket-starter')
const basketEl = headerEl.querySelector('.basket')

const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')

const searchInputEl = searchWrapEl.querySelector('input')
const searchAutocompletesTitleEl = searchWrapEl.querySelector('h3')
const searchAutocompletesItemElList = searchWrapEl.querySelectorAll(
    '.autocompletes ul li'
)

const searchItemList = [
    searchInputEl,
    searchAutocompletesTitleEl,
    ...searchAutocompletesItemElList,
]

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
    headerMenuIconElList.reverse().forEach((el, index) => {
        el.style.transitionDelay =
            (0.4 * index) / headerMenuIconElList.length + 's'
    })
    searchItemList.forEach((el, index) => {
        el.style.transitionDelay = (0.4 * index) / searchItemList.length + 's'
    })

    setTimeout(() => {
        searchInputEl.focus()
    }, 200)

    searchItemList.reverse()
    e.stopPropagation()
}

const hideSearch = () => {
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
    headerMenuIconElList.reverse().forEach((el, index) => {
        el.style.transitionDelay =
            (0.4 * index) / headerMenuIconElList.length + 's'
    })
    searchItemList.forEach((el, index) => {
        el.style.transitionDelay = (0.4 * index) / searchItemList.length + 's'
    })

    searchItemList.reverse()
    setTimeout(() => {
        searchInputEl.value = ''
    }, 400)
}

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchWrapEl.addEventListener('click', (e) => {
    e.stopPropagation()
})
window.addEventListener('click', hideSearch)

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideSearch()
})
