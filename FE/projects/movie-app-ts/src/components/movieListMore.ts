import { Component } from '../core/core'

import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
    constructor() {
        super({
            tagName: 'button',
        })

        movieStore.subscribe('page', () => {
            // render 부분에 추가된 eventListener에 대한 clear function 부분이 없기 때문에
            // this.render() 후 render 부분에 hide 클래스를 컨트롤 하는 기능을 부여하면 subscribe의 render호출로 인한 중복 eventListener 등록이 되어버림.
            const { pageMax, page } = movieStore.state
            pageMax <= page
                ? this.el.classList.add('hide')
                : this.el.classList.remove('hide')
        })

        movieStore.subscribe('pageMax', () => {
            const { pageMax, page } = movieStore.state
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
