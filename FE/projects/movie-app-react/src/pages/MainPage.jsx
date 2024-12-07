import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Headline from '../components/Headline'
import Search from '../components/Search'
import { Outlet } from 'react-router-dom'
export default function MainPage() {
    return (
        <>
            <Header />
            <div className="container">
                <Headline />
                <Search />
            </div>
            <Footer />
        </>
    )
}
