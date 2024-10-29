import { Component } from '../core/core'

export default class About extends Component {
    render() {
        const { a } = history.state

        return (this.el.innerHTML = /* html */ `
        <h1>About page</h1>
        <h2>${a}</h2>
       `)
    }
}
