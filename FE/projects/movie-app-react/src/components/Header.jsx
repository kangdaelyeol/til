import React from 'react'
import { NavLink } from 'react-router-dom'

const menuList = [
    {
        name: 'Search',
        href: '/',
    },
    {
        name: 'Movie',
        href: '/movie?id=tt4520988',
    },
    {
        name: 'About',
        href: '/about',
    },
]

export default function Header() {
    return (
        <div className="py-[20px] px-[40px] bg-[rgba(14, 17, 27, 0.9)] sticky top-0 z-9 flex items-end gap-[40px]">
            <NavLink
                to="/"
                className="text-[20px] font-Oswald text-color-white-50 decoration-none"
            >
                <span className="text-color-primary">OMDbAPI</span>.COM
            </NavLink>
            <nav>
                <ul className="flex gap-[14px]">
                    {menuList.map((menu) => {
                        const hash = location.hash.split('?')[0]
                        const href = menu.href.split('?')[0]
                        const isActive = hash === href
                        return (
                            <li>
                                <NavLink
                                    className={[
                                        'text-[14px] font-bold decoration-none',
                                        isActive
                                            ? 'text-color-primary'
                                            : 'text-color-white-50',
                                    ].join(' ')}
                                    to={menu.href}
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <NavLink
                to="/"
                className="w-[40px] h-[40px] rounded-[50%] bg-color-area cursor-pointer absolute top-0 bottom-0 right-[40px] m-auto transition-[0.3s] hover:scale-[1.2]"
            >
                <img
                    className="w-full"
                    src="https://avatars.githubusercontent.com/u/27201345?v=4"
                    alt="User"
                />
            </NavLink>
        </div>
    )
}
