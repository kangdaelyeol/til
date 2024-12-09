import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import * as profile from '../constants'
import { ThemeContext } from '../context/ThemeContext'

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
    const { theme, changeTheme } = useContext(ThemeContext)
    return (
        <div className="py-[20px] px-[40px] bg-header sticky top-[0] z-10 flex items-end gap-[40px]">
            <NavLink
                to="/"
                className="text-[20px] font-Oswald text-color-white-50 decoration-none"
            >
                <span className="text-color-primary">OMDbAPI</span>.COM
            </NavLink>
            <nav>
                <ul className="flex gap-[14px]">
                    {menuList.map((menu) => {
                        return (
                            <li key={menu.name}>
                                <NavLink
                                    className={({ isActive }) =>
                                        classNames(
                                            {
                                                'text-color-primary': isActive,
                                            },
                                            'text-[14px] font-bold decoration-none',
                                        )
                                    }
                                    to={menu.href}
                                    end
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div
                onClick={() => changeTheme()}
                className="absolute flex justify-center items-center cursor-pointer top-0 bottom-0 right-[100px] m-auto"
            >
                <span className="material-symbols-outlined">
                    {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
            </div>
            <NavLink
                to="/"
                className="w-[40px] h-[40px] rounded-[50%] bg-color-area cursor-pointer absolute top-0 bottom-0 right-[40px] m-auto transition-[0.3s] hover:scale-[1.2]"
            >
                <img className="w-full" src={profile.PHOTO} alt="User" />
            </NavLink>
        </div>
    )
}
