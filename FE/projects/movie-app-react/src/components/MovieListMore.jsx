import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovieThunk } from '../store/moviesSlice'

export default function MovieListMore() {
    const dispatch = useDispatch()
    const { keyword, page } = useSelector((state) => state.movies)

    const searchMovieMore = () => {
        dispatch(searchMovieThunk({ keyword, page: page + 1 }))
    }

    return (
        <button
            onClick={searchMovieMore}
            className="btn w-full max-w-[300px] my-[20px] mx-auto block"
        >
            View more...
        </button>
    )
}
