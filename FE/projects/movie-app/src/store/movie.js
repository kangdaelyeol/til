import { Store } from '../core/core'

const store = new Store({
    searchText: '',
    page: 1,
    movies: [],
    pageMax: 1,
})

export default store

export const searchMovies = async (page) => {
    if (page === 1) {
        store.state.movies = []
    }

    const { Search, totalResults } = await (
        await fetch(
            `https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`,
        )
    ).json()

    store.state.pageMax = Math.ceil(Number(totalResults) / 10)

    store.state.page = page

    store.state.movies = [...store.state.movies, ...Search]
}
