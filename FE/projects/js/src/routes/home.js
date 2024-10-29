import { Component } from '../core/core'

export default class Home extends Component {
    render() {
        return (this.el.innerHTML = /* html */ `
        <h1>home page</h1>
       `)
    }
}
