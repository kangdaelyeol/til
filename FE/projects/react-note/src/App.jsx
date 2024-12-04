import Main from './components/Main'
import NoteList from './components/NoteList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import NoteDetail from './components/NoteDetail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <NoteList />,
            },
            {
                path: '/notes/:id',
                element: <NoteDetail />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App
