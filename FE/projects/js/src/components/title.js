import { Component } from '../core/core'
import messageStore from '../store/message'

export default class Title extends Component {
    constructor() {
        super({
            tagName: 'h1',
        })
        messageStore.subscribe('message', (newVal) => {
            this.render()
        })
    }

    render() {
        this.el.textContent = `title: ${messageStore.state.message}`
    }
}
