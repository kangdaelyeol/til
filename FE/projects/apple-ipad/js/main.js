import ipadDataList from '../data/ipads.js'
import footerNavDataList from '../data/navigations.js'

const headerEl = document.querySelector('header')

const headerMenuIconElList = [...headerEl.querySelectorAll('.menu li')]

const headerMenuStarterEl = document.querySelector('header .menu-starter')

const headerMenuTextfieldCancelerBtnEl = document.querySelector(
    'header .search-canceler'
)

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

const cameraVideoEl = document.querySelector('.camera video')
const cameraVideoPauseBtnEl = document.querySelector('.controller--pause')
const cameraVideoPlayBtnEl = document.querySelector('.controller--play')

const compareItemGroupEl = document.querySelector('.compare .item-group')

const footerNavEl = document.querySelector('footer .navigations')
const footerThisYearEl = document.querySelector('footer .this-year')

const navEl = document.querySelector('nav')
const navMenuTogglerEl = navEl.querySelector('.menu-toggler')

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

// Header - Search Section Event Listener

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', (e) => {
    hideSearch()
    e.stopPropagation()
})
searchWrapEl.addEventListener('click', (e) => {
    e.stopPropagation()
})

// Header - Memu action

headerMenuStarterEl.addEventListener('click', (e) => {
    if (!headerEl.classList.contains('menuing')) {
        headerEl.classList.add('menuing')
        document.documentElement.classList.add('fixed')
        setTimeout(() => {
            searchInputEl.focus()
        }, 200)
    } else {
        headerEl.classList.remove('menuing')
        document.documentElement.classList.remove('fixed')
        searchInputEl.value = ''
    }
    e.stopPropagation()
})

headerMenuTextfieldCancelerBtnEl.addEventListener('click', () => {
    headerEl.classList.remove('searching--mobile')
})

searchInputEl.addEventListener('click', () => {
    headerEl.classList.add('searching--mobile')
})

// Nav - mobile action

navMenuTogglerEl.addEventListener('click', () => {
    if (navEl.classList.contains('menuing')) {
        navEl.classList.remove('menuing')
    } else {
        navEl.classList.add('menuing')
    }
})

// Camera Section Event Listener

cameraVideoPauseBtnEl.addEventListener('click', () => {
    cameraVideoEl.pause()
    cameraVideoPauseBtnEl.classList.add('hide')
    cameraVideoPlayBtnEl.classList.remove('hide')
})

cameraVideoPlayBtnEl.addEventListener('click', () => {
    cameraVideoEl.play()
    cameraVideoPlayBtnEl.classList.add('hide')
    cameraVideoPauseBtnEl.classList.remove('hide')
})

// Window Event Listener

window.addEventListener('resize', () => {
    if (window.innerWidth > 740) {
        headerEl.classList.remove('searching--mobile')
        searchInputEl.value = ''
    } else {
        headerEl.classList.remove('searching')
    }
})

// InterSectionObserver

const ioCallBack = (entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('show')
    })
}

const io = new IntersectionObserver(ioCallBack, {
    threshold: 0.6,
})

document.querySelectorAll('.info').forEach((el) => {
    io.observe(el)
})

// Compare Item Group - ipad item render

ipadDataList.forEach((data) => {
    const compareIpadItemEl = document.createElement('div')
    compareIpadItemEl.classList.add('item')
    let compareColorElHTML = ''

    data.colors.forEach((color) => {
        compareColorElHTML += /* html */ `
            <li style="background-color: ${color}"></li>
        `
    })

    compareIpadItemEl.innerHTML = /* html */ `
            <div class="thumbnail">
                <img src="${data.thumbnail}" alt="${data.name}" />
            </div>
            <ul class="color-group">
                ${compareColorElHTML}
            </ul>
            <h3 class="name">${data.name}</h3>
            <p class="tagline">${data.tagline}</p>
            <p class="price">₩${data.price.toLocaleString('en-US')}부터</p>
            <button class="btn">구입하기</button>
            <a href="${data.url}" class="link">더 알아보기</a>
    `

    compareItemGroupEl.append(compareIpadItemEl)
})

// footer navigation render

footerNavDataList.forEach((data) => {
    const footerNavMapEl = document.createElement('div')
    footerNavMapEl.classList.add('map')

    let navItemList = ''

    data.maps.forEach((item) => {
        navItemList += /* html */ `
            <li><a href="${item.url}">${item.name}</a></li>
        `
    })

    footerNavMapEl.innerHTML = /* html */ `
        <h3>${data.title}</h3>
        <ul>
            ${navItemList}
        </ul>
    `
    footerNavEl.append(footerNavMapEl)
})

footerThisYearEl.innerHTML = new Date().getFullYear()
