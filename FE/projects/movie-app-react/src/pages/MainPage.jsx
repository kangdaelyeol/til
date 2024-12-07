import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Headline from '../components/Headline'
import Search from '../components/Search'
import MovieList from '../components/MovieList'
export default function MainPage() {
    return (
        <>
            <Header />
            <div className="container">
                <Headline />
                <Search />
                <MovieList />
            </div>
            <Footer />
        </>
    )
}
