import { Component } from '../core/core'
import aboutStore from '../store/about'

export default class TheFooter extends Component {
    constructor() {
        super({
            tagName: 'footer',
        })
    }

    render() {
        const { repository, github } = aboutStore.state
        this.el.innerHTML = /* html */ `
        <div>
          <a href="${repository}">
            GitHub Repository
          </a>
        </div>
        <div>
          <a href="${github}">${new Date().getFullYear()} KangDaeLyeol</a>
        </div>
      `
    }
}
