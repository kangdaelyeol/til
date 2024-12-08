import React from 'react'
import MovieItem from './MovieItem'

const tempMovieList = [
    {
        imdbID: 'testid',
        Poster: 'testPoster',
        Year: 2024,
        Title: 'testTitle',
    },
]

const errorMessage = ''

const isHide = true

export default function MovieList() {
    return (
        <div className="p-[20px] rounded-[4px] bg-color-area">
            {errorMessage ? (
                <div className="text-color-primary text-[20px] text-center">
                    ${errorMessage}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-[20px]">
                    {tempMovieList.map((movie) => (
                        <MovieItem key={movie.Title} movie={movie} />
                    ))}
                </div>
            )}

            <div
                className={[
                    'w-[30px] h-[30px] my-[30px] mx-auto border-[4px] border-solid border-color-primary border-t-transparent rounded-[50%] animate-spin',
                    isHide && 'none',
                ].join(' ')}
            ></div>
        </div>
    )
}
