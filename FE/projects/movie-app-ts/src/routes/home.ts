import { Component } from '../core/core'
import Headline from '../components/headline'
import Search from '../components/search'
import MovieList from '../components/movieList'
import MovieListMore from '../components/movieListMore'
import Chatbot from 'src/components/Chatbot'

export default class Home extends Component {
    render() {
        const headline = new Headline().el
        const search = new Search().el
        const movieList = new MovieList().el
        const movieListMore = new MovieListMore().el
        const chatbot = new Chatbot().el

        this.el.classList.add('container')
        this.el.append(headline, search, movieList, movieListMore, chatbot)
    }
}
