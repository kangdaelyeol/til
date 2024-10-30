import { Component } from '../core/core'
import Headline from '../../components/headline'
import Search from '../../components/search'
export default class Home extends Component {
    render() {
        const headline = new Headline().el
        const search = new Search().el

        this.el.classList.add('container')
        this.el.append(headline, search)
    }
}
