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

// Store class 상태 저장 클래스
export class Store {
    // 초기 상태 값을 저장하는 state, 상태값 변경을 관찰하는 observer로 데이터 관리를 위한 클래스로써 정의 -> modularization
    constructor(state) {
        this.state = {}
        this.observers = {}
        for (const key in state) {
            Object.defineProperty(this.state, key, {
                // 각 state의 프로퍼티인 getter, setter 설정
                // getter에 접근(state value)시 해당 key(property)의 값 반환
                get: () => state[key],
                // setter 접근시 프로퍼티 값을 새로 설정하면서, 해당 key값에 저장된 observer 콜백에 새로 할당된 값을 argument로 넘김.
                set: (val) => {
                    state[key] = val
                    this.observers[key].forEach((observer) => observer(val))
                },
            })
        }
    }

    // store class method로써 subscribe 정의
    // key값과, cb 메서드를 넘김으로써 cb 메서드를 해당 state key값에 대한 observers객체에 넘기고, key값에 대한 state 값이 바뀔 때 (setter 접근시) setter 부분에서 등록된 cb가 호출될 수 있게 함.
    subscribe(key, cb) {
        Array.isArray(this.observers[key])
            ? this.observers[key].push(cb)
            : (this.observers[key] = [cb])
    }
}
