import { Component } from '../core/core'
import TextField from '../components/textField'
import Message from '../components/message'
import Title from '../components/title'

export default class Home extends Component {
    render() {
        this.el.innerHTML = /* html */ `
        <h1>home page</h1>
       `
        this.el.append(new TextField().el, new Message().el, new Title().el)
    }
}
