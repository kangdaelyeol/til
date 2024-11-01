import { Component } from './core/core'
import TheHeader from './components/theHeader'

export default class App extends Component {
    render() {
        const theHeader = new TheHeader().el
        const routerView = document.createElement('router-view')
        this.el.append(theHeader, routerView)
    }
}
