export default async function handler(req, res) {
    const { title, page, id } = JSON.parse(req.body)
    const url = id
        ? `https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`
        : `https://omdbapi.com?apikey=7035c60c&s=${title}&page=${page}`

    res.status(200).json(await (await fetch(url)).json())
}
