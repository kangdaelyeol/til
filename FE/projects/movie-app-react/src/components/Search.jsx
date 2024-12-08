import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovieThunk, updateKeyword } from '../store/moviesSlice'

export default function Search() {
    const state = useSelector((state) => state.movies)
    const dispatch = useDispatch()
    const searchMovie = () => {
        dispatch(searchMovieThunk({ keyword: state.keyword, page: 1 }))
    }

    const changeKeyword = (e) => {
        dispatch(updateKeyword({ keyword: e.target.value }))
    }
    return (
        <div className="flex gap-[10px] mb-[30px]">
            <input
                onChange={changeKeyword}
                value={state.keyword}
                className="grow-[1] h-[50px] px-[20px] rounded-[4px] border-none outline-none text-[14px] text-color-white bg-color-area placeholder::text-color-white-30"
                placeholder="Enter the movie title to search!"
            />
            <button onClick={searchMovie} className="btn btn-primary">
                Search!
            </button>
        </div>
    )
}
