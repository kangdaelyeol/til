import React, { useContext } from 'react'
import * as profile from '../constants'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'

export default function Footer() {
    const { REPOSITORY, GITHUB } = profile
    const { theme } = useContext(ThemeContext)
    return (
        <div className="pt-[40px] px-[40px] pb-[60px] text-center">
            <div>
                <a
                    className={classNames('hover:underline', {
                        'text-color-white-20': theme === 'dark',
                        'text-gray-500': theme === 'light',
                    })}
                    target="_blank"
                    href={REPOSITORY}
                >
                    GitHub Repository
                </a>
            </div>
            <div>
                <a
                    className={classNames('hover:underline', {
                        'text-color-white-20': theme === 'dark',
                        'text-gray-500': theme === 'light',
                    })}
                    target="_blank"
                    href={GITHUB}
                >
                    {new Date().getFullYear()} KangDaeLyeol
                </a>
            </div>
        </div>
    )
}
