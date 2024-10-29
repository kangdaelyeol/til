import { Component } from '../core/core'

export default class FruitItem extends Component {
    constructor(payload) {
        super({
            tagName: 'li',
            state: payload.state,
            props: payload.props,
        })
    }

    // this - dynamic binding
    render() {
        // Destructing assignment - 구조 분해 할당
        const { name, price } = this.props
        this.el.textContent = `name: ${name} price: ${price}`

        this.el.addEventListener('click', () => {
            console.log(`${name} is ${price}`)
        })
    }
}
