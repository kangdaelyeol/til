import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Me from './routes/Me.jsx'
import NotFound from './routes/NotFound.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Bug from './routes/Bug.jsx'
import User from './routes/User.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
        loader: async () => {
            return {
                data: new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('resolved!')
                    }, 3000)
                }),
            }
        },
    },
    {
        // 하위 경로의 errorElement가 없을 때, 상위 경로의 errorElement를 탐색한다.
        path: '/about',
        element: <About />,
        children: [
            {
                index: true,
                element: <h2>default</h2>,
            },
            {
                path: 'me',
                element: <Me />,
            },
        ],
    },
    {
        path: 'bug',
        element: <Bug />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'user/:id',
        element: <User />,
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
