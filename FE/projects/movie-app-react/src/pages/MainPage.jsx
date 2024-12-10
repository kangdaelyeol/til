import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Chatbot from '../components/Chatbot'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
export default function MainPage() {
    const { theme } = useContext(ThemeContext)
    console.log(theme)
    return (
        <div
            className={classNames({
                'text-color-white bg-color-black': theme === 'dark',
                'bg-color-white text-color-black': theme === 'light',
            })}
        >
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <Chatbot />
            <Footer />
        </div>
    )
}
