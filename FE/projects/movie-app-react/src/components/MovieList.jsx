import React from 'react'
import MovieItem from './MovieItem'
import { useSelector } from 'react-redux'

export default function MovieList() {
    const state = useSelector((state) => state.movies)

    console.log(state.movieList)
    return (
        <div className="p-[20px] rounded-[4px] bg-color-area">
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

            <div
                className={[
                    'w-[30px] h-[30px] my-[30px] mx-auto border-[4px] border-solid border-color-primary border-t-transparent rounded-[50%] animate-spin',
                    !state.loading && 'hidden',
                ].join(' ')}
            ></div>
        </div>
    )
}
