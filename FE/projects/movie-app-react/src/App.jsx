import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Home from './components/Home'
import About from './components/About'

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
        ],
    },
]
const router = createBrowserRouter(routerConfig)

function App() {
    return <RouterProvider router={router} />
}

export default App
