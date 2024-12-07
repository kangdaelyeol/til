import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage'

const routerConfig = [
    {
        path: '/',
        element: <MainPage />,
    },
]
const router = createBrowserRouter(routerConfig)

function App() {
    return <RouterProvider router={router} />
}

export default App
