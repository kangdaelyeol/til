import { Component } from '../core/core'
import aboutStore from '../store/about'
interface State {
    [key: string]: unknown
    menuList: {
        name: string
        href: string
    }[]
}
export default class TheHeader extends Component {
    // 명확한 할당 단언 (!) - 초기화가 확실한 경우 allocation assertion을 사용할 수 있음 이는 ts에 값이 할당되어 있음을 알린다.
    // 부모 클래스의 프로퍼티로써 값을 사용해야 하는 경우 파생 클래스의 프로퍼티를 초기화 하면 부모 클래스의 프로퍼티가 재정의(override) 되어 사용할 수 없다.
    public state!: State
    constructor() {
        super({
            tagName: 'header',
            state: {
                menuList: [
                    {
                        name: 'Search',
                        href: '#/',
                    },
                    {
                        name: 'Movie',
                        href: '#/movie?id=tt4520988',
                    },
                    {
                        name: 'About',
                        href: '#/about',
                    },
                ],
            },
        })

        window.addEventListener('popstate', () => {
            this.render()
        })
    }

    render() {
        const { photo } = aboutStore.state
        this.el.innerHTML = /* html */ `
        <a href="#/" class="logo">
          <span>OMDbAPI</span>.COM
        </a>
        <nav>
          <ul>
            ${this.state.menuList
                .map((menu) => {
                    const hash = location.hash.split('?')[0]
                    const href = menu.href.split('?')[0]
                    const isActive = hash === href
                    return /* html */ `
                <li>
                  <a class="${isActive ? 'active' : ''}" href="${menu.href}">${
                        menu.name
                    }</a>
                </li>
              `
                })
                .join('')}
          </ul>
        </nav>
        <a href="#/" class="user">
          <img src="${photo}" alt="User" />
        </a>
      `
    }
}
