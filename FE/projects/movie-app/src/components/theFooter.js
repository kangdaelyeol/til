import { Component } from '../core/core'

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: 'footer',
        })
    }

    render() {
        this.el.innerHTML = /* html */ `
        <div>
          <a href="https://github.com/kangdaelyeol/kangdaelyeol.github.io">
            GitHub Repository
          </a>
        </div>
        <div>
          <a href="https://github.com/kangdaelyeol">${new Date().getFullYear()} KangDaeLyeol</a>
        </div>
      `
    }
}
