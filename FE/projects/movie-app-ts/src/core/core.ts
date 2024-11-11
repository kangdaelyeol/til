interface ComponentPayload {
    tagName?: string
    props?: {
        [key: string]: unknown
    }
    state?: {
        [key: string]: unknown
    }
}

export class Component {
    public el
    public props
    public state
    constructor(payload: ComponentPayload = {}) {
        const { tagName = 'div', props = {}, state = {} } = payload
        this.el = document.createElement(tagName)
        this.props = props
        this.state = state
        this.render()
    }

    render() {}
}

interface Route {
    path: string
    component: typeof Component // Component 클래스 인스턴스 타입을 지정
}

type Routes = Route[]

function renderRouter(routes: Routes) {
    if (!location.hash) {
        history.replaceState(null, '', '/#/')
    }

    const routerView = document.querySelector('router-view')

    const [hash, queryString = ''] = location.hash.split('?')

    interface Query {
        [key: string]: string
    }

    const query = queryString.split('&').reduce((acc, cur) => {
        const [key, val] = cur.split('=')
        acc[key] = val
        return acc
        // 필요에 따라 type assertion 적용이 필요하다
    }, {} as Query)

    history.replaceState(query, '')

    const currentRoute = routes.find((route) =>
        new RegExp(`${route.path}\/?$`).test(hash),
    )

    // type guard - 두 요소(routerView, currentRoute)를 한 번에 type guard를 만드는 것은 주의가 필요하다.
    if (routerView) {
        routerView.innerHTML = ''
        currentRoute && routerView.append(new currentRoute.component().el)
    }

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
