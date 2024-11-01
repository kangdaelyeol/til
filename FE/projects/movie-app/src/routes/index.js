import { createRouter } from '../core/core'
import Home from './home'
import Movie from './movie'
import About from './about'
import NotFound from './notFound'

export default createRouter([
    {
        path: '#/',
        component: Home,
    },
    {
        path: '#/movie',
        component: Movie,
    },
    {
        path: '#/about',
        component: About,
    },
    {
        path: '.{0}',
        component: NotFound,
    },
])
