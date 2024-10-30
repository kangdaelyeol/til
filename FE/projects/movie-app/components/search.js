import { Component } from '../src/core/core'

export default class Search extends Component {
    render() {
        this.el.classList.add('search')
        this.el.innerHTML = /* html */ `
      <input placeholder="Enter the movie title to search!" />
      <button class="btn btn-primary">
        Search!
      </button>
    `
    }
}
