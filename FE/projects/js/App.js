import { Component } from './core/core'

// declarative rendering: UI Rendering -> UI DOM structure(view)(How to show), DOM Element value(state)(What to show) 두 개념으로 분리

export default class App extends Component {
    // 어떤 값(상태)를 보여줘야 되는지에 따른 상태 분리
    constructor() {
        super({
            state: {
                inputText: '',
            },
        })
    }

    // UI상에 어떻게 표현(render)되어야 하는지 분리
    render() {
        this.el.innerHTML = /* html */ `
        <input />
        <button>Click!</button>
        `

        const inputEl = this.el.querySelector('input')
        inputEl.addEventListener('input', () => {
            this.state.inputText = inputEl.value
        })

        const buttonEl = this.el.querySelector('button')
        buttonEl.addEventListener('click', () => {
            console.log(this.state.inputText)
        })
    }
}
