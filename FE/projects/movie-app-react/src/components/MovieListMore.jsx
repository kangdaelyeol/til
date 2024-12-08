import React from 'react'
import useMovirListMore from '../hooks/useMovieListMore'

export default function MovieListMore() {
    const { searchMovieMore } = useMovirListMore()
    return (
        <button
            onClick={searchMovieMore}
            className="btn w-full max-w-[300px] my-[20px] mx-auto block"
        >
            View more...
        </button>
    )
}
