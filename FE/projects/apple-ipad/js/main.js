const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = document.querySelector('header .basket')

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
