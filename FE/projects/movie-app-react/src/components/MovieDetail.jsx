import React, { useContext } from 'react'
import classNames from 'classnames'
import useMovieDetail from '../hooks/useMovieDetail'
import { ThemeContext } from '../context/ThemeContext'

export default function MovieDetail() {
    const { data, loading } = useMovieDetail()
    const { theme } = useContext(ThemeContext)

    const movieClassName = classNames(
        'flex gap-[70px] max-tablet:gap-[30px] max-mob-lg:block',
        {
            'text-color-white-50': theme === 'dark',
            'text-gray-600': theme === 'light',
        },
    )

    const labelsClassName = 'text-color-primary mb-[20px]'

    const titleClassName = classNames(
        'text-[70px] font-Oswald leading-1 mb-[30px] max-mob-lg:text-[50px] max-mob-lg:mt-[50px]',
        {
            'text-color-white': theme === 'dark',
            'text-gray-900': theme === 'light',
        },
    )

    const posterClassName = classNames(
        'shrink-0 w-[500px] h-[750px] rounded-[10px] bg-cover',
        {
            'bg-color-area': theme === 'dark',
        },
    )

    const h3ClassName = classNames(
        'text-[20px] font-Oswald mx-0 mt-[24px] mb-[6px]',
        {
            'text-color-white': theme === 'dark',
            'text-gray-900': theme === 'light',
        },
    )

    return loading ? (
        <div className={movieClassName}>
            <div
                className={classNames(posterClassName, 'skeleton', {
                    'skeleton-dark': theme === 'dark',
                    'skeleton-light': theme === 'light',
                })}
            ></div>
            <div className="grow">
                <div
                    className={classNames(titleClassName, 'h-[70px] skeleton', {
                        'skeleton-dark': theme === 'dark',
                        'skeleton-light': theme === 'light',
                    })}
                ></div>
                <div
                    className={classNames(
                        labelsClassName,
                        'h-[30px] skeleton',
                        {
                            'skeleton-dark': theme === 'dark',
                            'skeleton-light': theme === 'light',
                        },
                    )}
                ></div>
                <div
                    className={classNames('w-[80%] h-[400px] skeleton', {
                        'skeleton-dark': theme === 'dark',
                        'skeleton-light': theme === 'light',
                    })}
                ></div>
            </div>
        </div>
    ) : (
        <div className={movieClassName}>
            <div
                style={{
                    '--bg': `url(${data.Poster.replace('SX300', 'SX700')})`,
                }}
                className={classNames(posterClassName, 'bg-[image:var(--bg)]')}
            ></div>
            <div className="grow">
                <div className={titleClassName}>{data.Title}</div>
                <div className={labelsClassName}>
                    <span>{data.Released}</span>
                    &nbsp;/&nbsp;
                    <span>{data.Runtime}</span>
                    &nbsp;/&nbsp;
                    <span>{data.Country}</span>
                </div>
                <div className="plot">{data.Plot}</div>
                <div>
                    <h3 className={h3ClassName}>Ratings</h3>
                    {data.Ratings.map(({ Source, Value }) => (
                        <p key={Source}>
                            {Source} - {Value}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className={h3ClassName}>Actors</h3>
                    <p>{data.Actors}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Director</h3>
                    <p>{data.Director}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Production</h3>
                    <p>{data.Production}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Genre</h3>
                    <p>{data.Genre}</p>
                </div>
            </div>
        </div>
    )
}
