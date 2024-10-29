export class Component {
    constructor(payload = {}) {
        const { tagName = 'div', state = {}, props = {} } = payload
        this.el = document.createElement(tagName)
        this.state = state
        this.props = props
        this.render()
    }
    render() {
        console.log('component Render')
    }
}

function routeRender(routes) {
    if (!location.hash) {
        /* 
         Hash url은 location객체에서 받아온다.
         만약 hash url 정보가 없다면 history.replaceState를 통해 url부분을 페이지 구조상 root인 url로 변경
         history.replaceState로 변경된 url로 인해 페이지가 이동되지는 않음.
        */

        // history.replaceState(state, title(unused), url)
        // state -> history.state
        // url(hash) -> location.hash
        history.replaceState(null, '', '/#/')
    }

    const routerView = document.querySelector('router-view')

    // location.hash는 url부분에 hash(#)부터 이후 url을 모두 담기 때문에 split()을 통해 url부분, querystring부분을 나누어 구분한다.
    const [hash, queryString = ''] = location.hash.split('?')

    // queryString 부분은 Array.prototype.reduce 메서드로 따로 객체로 변환해 history.replaceState()메서드로 state프로퍼티에 설정
    const query = queryString.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
    }, {})

    console.log(query)

    history.replaceState(query, '')

    // Array.prototype.find() 메서드로 주어진 route 정보의 path와 hash와 일치하는지 RegExp.test를 통해 검사
    // escape sequence(\)와 slash(/)로 slash가 특별한 의미가 아닌 문자로 취급
    // ?(question mark)로 이전에 입력된 slash(/)가 존재 유무에 관계 없게됨.
    // $(dollar sign)으로 정규 표현식의 끝을 명시
    const currentRoute = routes.find((route) =>
        new RegExp(`${route.path}\/?$`).test(hash),
    )

    //routerView Element 요소에 append메서드로 route(page)를 입력할 것이기 떄문에 innerHTML 초기화가 필요함.
    routerView.innerHTML = ''
    routerView.append(new currentRoute.component().el)

    // route(page) 페이지가 변경되면 페이지 변경 관점의 일관성을 위해 스크롤 초기화
    scrollTo(0, 0)
}

export function createRouter(routes) {
    return function () {
        // anchor tag - href로 인한 url변경은 popstate 이벤트를 발생시킴.
        window.addEventListener('popstate', () => {
            routeRender(routes)
        })
        routeRender(routes)
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
                    this.observers[key].forEach((observer) => observer(val))
                },
            })
        }
    }

    subscribe(key, cb) {
        Array.isArray(this.observers[key])
            ? this.observers[key].push(cb)
            : (this.observers[key] = [cb])
    }
}
