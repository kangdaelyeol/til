import React from 'react'

export default function Search() {
    return (
        <div className='flex gap-[10px] mb-[30px]'>
            <input className='grow-[1] h-[50px] px-[20px] rounded-[4px] border-none outline-none text-[14px] text-color-white bg-color-area placeholder::text-color-white-30' placeholder="Enter the movie title to search!" />
            <button className="btn btn-primary">Search!</button>
        </div>
    )
}
