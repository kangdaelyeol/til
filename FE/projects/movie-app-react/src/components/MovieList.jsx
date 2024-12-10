import React, { useContext } from 'react'
import MovieItem from './MovieItem'
import { useSelector } from 'react-redux'
import MovieListMore from './MovieListMore'
import classNames from 'classnames'
import { ThemeContext } from '../context/ThemeContext'

export default function MovieList() {
    const state = useSelector((state) => state.movies)
    const { theme } = useContext(ThemeContext)
    return (
        <div
            className={classNames('p-[20px] rounded-[4px]', {
                'bg-color-area': theme === 'dark',
            })}
        >
            {state.message ? (
                <div className="text-color-primary text-[20px] text-center">
                    {state.message}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-[20px]">
                    {state.movieList.map((movie) => (
                        <MovieItem key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
            {state.page < state.maxPage && !state.loading && <MovieListMore />}

            <div
                className={classNames(
                    'w-[30px] h-[30px] my-[30px] mx-auto border-[4px] border-solid border-color-primary border-t-transparent rounded-[50%] animate-spin',
                    {
                        hidden: !state.loading,
                    },
                )}
            ></div>
        </div>
    )
}
