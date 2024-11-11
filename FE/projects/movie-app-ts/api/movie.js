export default async function handler(req, res) {
    const { title, page, id } = JSON.parse(req.body)
    const { API_KEY } = process.env
    const url = id
        ? `https://omdbapi.com?apikey=${API_KEY}&i=${id}&plot=full`
        : `https://omdbapi.com?apikey=${API_KEY}&s=${title}&page=${page}`

    res.status(200).json(await (await fetch(url)).json())
}
