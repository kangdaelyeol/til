import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'

export default function Headline() {
    const { theme } = useContext(ThemeContext)
    return (
        <div className="mb-[40px]">
            <h1 className="font-Oswald text-[80px] leading-[1] mb-[40px]">
                <span className="text-color-primary">OMDb API</span>
                <br />
                THE OPEN
                <br />
                MOVIE DATABASE
            </h1>
            <p
                className={classNames({
                    'text-color-white-30': theme === 'dark',
                    'text-gray-700': theme === 'light',
                })}
            >
                The OMDb API is a RESTful web service to obtain movie
                information, all content and images on the site are contributed
                and maintained by our users.
                <br />
                If you find this service useful, please consider making a
                one-time donation or become a patron.
            </p>
        </div>
    )
}
