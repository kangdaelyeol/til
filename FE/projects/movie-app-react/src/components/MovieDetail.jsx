import React from 'react'
import classNames from 'classnames'
import useMovieDetail from '../hooks/useMovieDetail'
 
export default function MovieDetail() {
    const { data, loading } = useMovieDetail()

    return loading ? (
        <div className={movieClassName}>
            <div className={classNames(posterClassName, 'skeleton')}></div>
            <div className="grow">
                <div
                    className={classNames(titleClassName, 'h-[70px] skeleton')}
                ></div>
                <div
                    className={classNames(labelsClassName, 'h-[30px] skeleton')}
                ></div>
                <div className="w-[80%] h-[400px] skeleton"></div>
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

const movieClassName = 'text-color-white-50 flex gap-[70px]'

const labelsClassName = 'text-color-primary mb-[20px]'

const titleClassName =
    'text-[70px] font-Oswald leading-1 text-color-white mb-[30px]'

const posterClassName =
    'shrink-0 w-[500px] h-[750px] rounded-[10px] bg-cover bg-color-area'

const h3ClassName =
    'text-[20px] font-Oswald text-color-white mx-0 mt-[24px] mb-[6px]'
