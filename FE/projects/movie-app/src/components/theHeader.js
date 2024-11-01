import { Component } from '../core/core'

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
    }

    render() {
        this.el.innerHTML = /* html */ `
        <a href="#/" class="logo">
          <span>OMDbAPI</span>.COM
        </a>
        <nav>
          <ul>
            ${this.state.menuList
                .map((menu) => {
                    return /* html */ `
                <li>
                  <a href="${menu.href}">${menu.name}</a>
                </li>
              `
                })
                .join('')}
          </ul>
        </nav>
        <a href="#/" class="user">
          <img src="https://heropy.blog/css/image/logo.png" alt="User" />
        </a>
      `
    }
}
