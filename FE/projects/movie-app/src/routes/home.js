import { Component } from '../core/core'
import Headline from '../../components/headline'

export default class Home extends Component {
    render() {
        const headline = new Headline().el
        headline.classList.add('container')
        this.el.append(headline)
    }
}
