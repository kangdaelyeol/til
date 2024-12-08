import React from 'react'
import { Link } from 'react-router-dom'
const about = {
    photo: 'https://avatars.githubusercontent.com/u/27201345?v=4',
    name: 'DANIEL / KangDaeLyeol',
    email: 'kdy0510123@gmail.com',
    blog: 'https://heropy.blog',
    github: 'https://github.com/kangdaelyeol',
    repository: 'https://github.com/kangdaelyeol/kangdaelyeol.github.io',
}

export default function About() {
    const { name, email, github, blog, photo } = about
    return (
        <div>
            <div
                className={`w-[230px] h-[230px] mx-auto mt-0 mb-[20px] rounded-[10px] bg-cover bg-[image:var(--bg)]`}
                style={{
                    '--bg': `url(${photo})`,
                }}
            ></div>
            <p className="text-[40px] font-Oswald leading-[1.5] text-center mb-[4px]">
                {name}
            </p>
            <p className={pClassName}>
                <Link
                    className={linkClassName}
                    to={`https://mail.google.com/main/?view=cm&fs=1&to=${email}`}
                    target="_blank"
                >
                    {email}
                </Link>
            </p>
            <p className={pClassName}>
                <Link className={linkClassName} to={github} target="_blank">
                    GitHub
                </Link>
            </p>
            <p className={pClassName}>
                <Link className={linkClassName} to={blog} target="_blank">
                    Blog
                </Link>
            </p>
        </div>
    )
}

const linkClassName = 'text-color-primary hover:underline'
const pClassName = 'leading-[1.5] text-center mb-[4px]'
