import { Component } from '../core/core'

export default class NotFound extends Component {
    render() {
        this.el.classList.add('not-found', 'container')
        this.el.innerHTML = /* html */ `
      <h1>
        Sorry... <br />
        NotFound!
      </h1>
    `
    }
}
