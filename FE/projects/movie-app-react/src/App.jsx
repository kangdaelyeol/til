import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Home from './components/Home'
import About from './components/About'
import MovieDetail from './components/MovieDetail'

const routerConfig = [
    {
        path: '/',
        element: <MainPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/movie',
                element: <MovieDetail />,
            },
        ],
    },
]
const router = createBrowserRouter(routerConfig)

function App() {
    return <RouterProvider router={router} />
}

export default App
