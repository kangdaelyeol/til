import React from 'react'
import * as profile from '../constants'

export default function Footer() {
    const { REPOSITORY, GITHUB } = profile
    return (
        <div className="pt-[40px] px-[40px] pb-[60px] text-center">
            <div>
                <a
                    className="text-color-white-20 decoration-color-white-20 hover:underline"
                    target="_blank"
                    href={REPOSITORY}
                >
                    GitHub Repository
                </a>
            </div>
            <div>
                <a
                    className="text-color-white-20 hover:underline"
                    target="_blank"
                    href={GITHUB}
                >
                    {new Date().getFullYear()} KangDaeLyeol
                </a>
            </div>
        </div>
    )
}
