import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MovieItem({ movie }) {
    return (
        <NavLink
            className={`relative w-[200px] h-[300px]
               rounded-[4px] bg-color-black bg-cover overflow-hidden 
               bg-[url('${movie.Poster}')] 
               hover:after:content-[""] hover:after:absolute hover:after:inset-0 
               hover:after:border-[6px] hover:after:border-solid hover:after:border-color-primary}`}
            to={`/movie?id=${movie.imdbID}`}
        >
            <div className="w-full p-[14px] box-border text-[14px] text-center absolute left-0 bottom-0 bg-movie-info backdrop-blur-[10px]">
                <div className="text-color-primary">{movie.Year}</div>
                <div className="text-color-white">{movie.Title}</div>
            </div>
        </NavLink>
    )
}
