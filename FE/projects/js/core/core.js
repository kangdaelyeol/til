export class Component {
    constructor(payload = {}) {
        const { tagName } = payload
        this.el = document.createElement(tagName)
        this.render()
    }
    render() {
        console.log('component Render')
    }
}
