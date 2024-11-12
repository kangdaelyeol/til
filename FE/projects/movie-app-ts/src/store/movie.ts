import { Store } from '../core/core'

interface SimpleMovie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

interface DetailedMovie {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    // 타입 구조가 간단한 경우 interface로 따로 빼두어 정의하지 않고 바로 선언을 해주는 방법도 가독성, 직관성 측면에서 더 좋을 수 있다.
    Ratings: {
        Source: string
        Value: string
    }[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

interface State {
    searchText: string
    page: number
    movies: SimpleMovie[]
    movieDetail: DetailedMovie
    pageMax: number
    loading: boolean
    message: string
}

const store = new Store<State>({
    searchText: '',
    page: 1,
    movies: [],
    movieDetail: {} as DetailedMovie,
    pageMax: 1,
    loading: false,
    message: '',
})

export default store

export const searchMovies = async (page: number) => {
    store.state.loading = true
    store.state.message = ''
    if (page === 1) {
        store.state.movies = []
    }

    try {
        const { Search, totalResults, Error, Response } = await (
            await fetch('/api/movie', {
                method: 'POST',
                body: JSON.stringify({
                    title: store.state.searchText,
                    page: page,
                }),
            })
        ).json()

        if (Response === 'True') {
            // 기존 state 값에 같은 값을 할당라도, state property에 접근할 시 Observer의 setter를 호출한다.
            // pageMax값에 대한 page 값을 비교 하려면 pageMax에 대한 값이 먼저 갱신되어야 한다.
            // 해당 store의 state접근에 따른 setter call은 state 값에 접근하는 순서에 따라 순차적으로 호출되기 때문이다.
            // 페이징 기능에 대해서 논리적으로 생각하면 api call에 따라 pageMax 또는 page 값이 실시간으로 변경될 가능성이 있기 때문에 page와 pageMax state value에 대해 subscribe를 하는 것이 옳다.
            // 해당 기능에 대해선 추상적 기능을 제공받는 Component측에서 두 state 값에 대한 subscribe를 정의하는 것이 맞다.
            store.state.pageMax = Math.ceil(Number(totalResults) / 10)
            store.state.page = page

            store.state.movies = [...store.state.movies, ...Search]
        } else {
            store.state.message = Error
            store.state.pageMax = 1
        }
    } catch (error) {
        console.log(error)
    } finally {
        store.state.loading = false
    }
}

export const getMovieDetails = async (id: string) => {
    try {
        const json = await (
            await fetch('/api/movie', {
                method: 'POST',
                body: JSON.stringify({
                    id,
                }),
            })
        ).json()
        store.state.movieDetail = json
    } catch (error) {
        console.log(error)
    }
}
