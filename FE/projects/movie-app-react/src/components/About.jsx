import React from 'react'
import * as profile from '../constants'

export default function About() {
    const { NAME, EMAIL, GITHUB, BLOG, PHOTO } = profile

    return (
        <div>
            <div
                className="w-[230px] h-[230px] mx-auto mt-0 mb-[20px] rounded-[10px] bg-cover bg-[image:var(--bg)]"
                style={{
                    '--bg': `url(${PHOTO})`,
                }}
            ></div>
            <p className="text-[40px] font-Oswald leading-[1.5] text-center mb-[4px]">
                {NAME}
            </p>
            <p className={pClassName}>
                <a
                    className={linkClassName}
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
                    target="_blank"
                >
                    {EMAIL}
                </a>
            </p>
            <p className={pClassName}>
                <a className={linkClassName} href={GITHUB} target="_blank">
                    GitHub
                </a>
            </p>
            <p className={pClassName}>
                <a className={linkClassName} href={BLOG} target="_blank">
                    Blog
                </a>
            </p>
        </div>
    )
}

const linkClassName = 'text-color-primary hover:underline'
const pClassName = 'leading-[1.5] text-center mb-[4px]'
