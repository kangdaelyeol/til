import { Outlet } from 'react-router-dom'
const Main = () => {
    return (
        <div className="grow bg-gray-800 py-[70px]">
            <Outlet />
        </div>
    )
}

export default Main
