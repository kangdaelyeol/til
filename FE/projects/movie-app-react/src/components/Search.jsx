import React, { useContext } from 'react'
import useSearch from '../hooks/useSearch'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'

export default function Search() {
    const { changeKeyword, searchMovie, value } = useSearch()
    const { theme } = useContext(ThemeContext)
    return (
        <div className="flex gap-[10px] mb-[30px]">
            <input
                onChange={changeKeyword}
                value={value}
                className={classNames(
                    'grow-[1] h-[50px] px-[20px] rounded-[4px]  text-[14px]',
                    {
                        'text-color-white bg-color-area border-none outline-none placeholder::text-color-white-30':
                            theme === 'dark',
                        'border-[2px] border-color-black': theme === 'light',
                    },
                )}
                placeholder="Enter the movie title to search!"
            />
            <button onClick={searchMovie} className="btn btn-primary">
                Search!
            </button>
        </div>
    )
}
