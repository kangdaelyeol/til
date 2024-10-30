export class Component {
    constructor(payload = {}) {
        const { tagName = 'div' } = payload
        this.el = document.createElement(tagName)
        this.render()
    }

    render() {}
}

function renderRouter(routes) {
    if (!location.hash) {
        history.replaceState(null, '', '/#/')
    }

    const routerView = document.querySelector('router-view')

    const [hash, queryString = ''] = location.hash.split('?')

    const query = queryString.split('&').reduce((acc, cur) => {
        const [key, val] = cur.split('=')
        acc[key] = val
        return acc
    }, {})

    history.replaceState(query, '')

    const currentRoute = routes.find((route) =>
        new RegExp(`${route.path}\/?$`).test(hash),
    )

    routerView.innerHTML = ''
    routerView.append(new currentRoute.component().el)

    window.scrollTo(0, 0)
}

export function createRouter(routes) {
    return function () {
        window.addEventListener('popstate', () => {
            renderRouter(routes)
        })

        renderRouter(routes)
    }
}

export class Store {
    constructor(state) {
        this.state = {}
        this.observers = {}

        for (const key in state) {
            Object.defineProperty(this.state, key, {
                get: () => state[key],
                set: (val) => {
                    state[key] = val
                    if (Array.isArray(this.observers[key])) {
                        this.observers[key].forEach((observer) => observer(val))
                    }
                },
            })
        }
    }

    subscribe(val, cb) {
        Array.isArray(this.observers[val])
            ? this.observers[val].push(cb)
            : (this.observers[val] = [cb])
    }
}
