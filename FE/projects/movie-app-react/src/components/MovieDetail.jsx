import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { callMovieInfo } from '../api'

export default function MovieDetail() {
    const [data, setData] = useState({})
    const {
        Title,
        Released,
        Runtime,
        Country,
        Actors,
        Director,
        Production,
        Genre,
        Ratings,
        Plot,
        Poster,
    } = data
    const [loading, setLoading] = useState(true)

    const [param, setParam] = useSearchParams()
    console.log(param.get('id'))

    useEffect(() => {
        if (!param) return
        ;(async function () {
            const res = await callMovieInfo({ id: param.get('id') })
            setData({ ...res.data })
            setLoading(false)
        })()
    }, [param, loading])

    return loading ? (
        <div className={[movieClassName].join(' ')}>
            <div className={[posterClassName, 'skeleton'].join(' ')}></div>
            <div className="grow">
                <div
                    className={[titleClassName, 'h-[70px] skeleton'].join(' ')}
                ></div>
                <div
                    className={[labelsClassName, 'h-[30px] skeleton'].join(' ')}
                ></div>
                <div className="w-[80%] h-[400px] skeleton"></div>
            </div>
        </div>
    ) : (
        <div className={movieClassName}>
            <div
                style={{
                    '--bg': `url(${Poster.replace('SX300', 'SX700')})`,
                }}
                className={[posterClassName, 'bg-[image:var(--bg)]'].join(' ')}
            ></div>
            <div className="grow">
                <div className={titleClassName}>{Title}</div>
                <div className={labelsClassName}>
                    <span>{Released}</span>
                    &nbsp;/&nbsp;
                    <span>{Runtime}</span>
                    &nbsp;/&nbsp;
                    <span>{Country}</span>
                </div>
                <div className="plot">{Plot}</div>
                <div>
                    <h3 className={h3ClassName}>Ratings</h3>
                    {Ratings.map(({ Source, Value }) => (
                        <p key={Source}>
                            {Source} - {Value}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className={h3ClassName}>Actors</h3>
                    <p>{Actors}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Director</h3>
                    <p>{Director}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Production</h3>
                    <p>{Production}</p>
                </div>
                <div>
                    <h3 className={h3ClassName}>Genre</h3>
                    <p>{Genre}</p>
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
