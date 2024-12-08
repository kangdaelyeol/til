import React from 'react'
import useSearch from '../hooks/useSearch'

export default function Search() {
    const { changeKeyword, searchMovie, value } = useSearch()
    return (
        <div className="flex gap-[10px] mb-[30px]">
            <input
                onChange={changeKeyword}
                value={value}
                className="grow-[1] h-[50px] px-[20px] rounded-[4px] border-none outline-none text-[14px] text-color-white bg-color-area placeholder::text-color-white-30"
                placeholder="Enter the movie title to search!"
            />
            <button onClick={searchMovie} className="btn btn-primary">
                Search!
            </button>
        </div>
    )
}
