import { Component } from '../core/core'

import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
    constructor() {
        super({
            tagName: 'button',
        })

        movieStore.subscribe('page', () => {
            const { pageMax, page } = movieStore.state
            console.log(pageMax, page)
            pageMax <= page
                ? this.el.classList.add('hide')
                : this.el.classList.remove('hide')
        })
    }

    render() {
        this.el.classList.add('btn', 'view-more', 'hide')
        this.el.textContent = 'View more...'

        this.el.addEventListener('click', async () => {
            await searchMovies(movieStore.state.page + 1)
        })
    }
}
