import Main from './components/Main'
import SideBar from './components/Sidebar'

function App() {
    return (
        <div className="flex h-screen text-white bg-gray-800">
            <SideBar />
            <Main />
        </div>
    )
}

export default App
