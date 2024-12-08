import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { callMovieInfo } from '../api'

export default function useMovieDetail() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const [param] = useSearchParams()

    useEffect(() => {
        if (!param) return
        ;(async function () {
            const res = await callMovieInfo({ id: param.get('id') })
            setData({ ...res.data })
            setLoading(false)
        })()
    }, [param])

    return { data, loading }
}
