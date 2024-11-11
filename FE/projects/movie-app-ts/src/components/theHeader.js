import { Component } from '../core/core'
import aboutStore from '../store/about'

export default class TheHeader extends Component {
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
