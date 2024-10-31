import { createRouter } from '../core/core'
import Home from './home'
import Movie from './movie'
export default createRouter([
    {
        path: '#',
        component: Home,
    },
    {
        path: '#/movie',
        component: Movie,
    },
])
