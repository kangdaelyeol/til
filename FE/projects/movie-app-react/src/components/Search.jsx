import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchMovieThunk } from '../store/moviesSlice'

export default function Search() {
    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()
    const searchMovie = () => {
        dispatch(searchMovieThunk({ keyword, page: 1 }))
    }

    const changeKeyword = (e) => {
        setKeyword(e.target.value)
    }
    return (
        <div className="flex gap-[10px] mb-[30px]">
            <input
                onChange={changeKeyword}
                value={keyword}
                className="grow-[1] h-[50px] px-[20px] rounded-[4px] border-none outline-none text-[14px] text-color-white bg-color-area placeholder::text-color-white-30"
                placeholder="Enter the movie title to search!"
            />
            <button onClick={searchMovie} className="btn btn-primary">
                Search!
            </button>
        </div>
    )
}
