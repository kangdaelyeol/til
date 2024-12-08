import axios from 'axios'

export const callMovieInfo = async ({ keyword, page, id }) => {
    const apiKey = import.meta.env.VITE_API_KEY
    const url = id
        ? `https://omdbapi.com?apikey=${apiKey}&i=${id}&plot=full`
        : `https://omdbapi.com?apikey=${apiKey}&s=${keyword}&page=${page}`

    const res = await axios.get(url)

    return res
}
