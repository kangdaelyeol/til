import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        const id = 1
        navigate(`/notes/${id}`)
    }
    return (
        <div className="w-[230px] p-4">
            <h1 className="text-2xl font-bold mb-4">FastCampus Note</h1>
            <button
                onClick={handleClick}
                className="bg-gray-400 hover:bg-gray-500 w-full py-2 px-4 rounded"
            >
                노트 추가
            </button>
            <div className="mt-4">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-blue-500 text-semibold'
                            : 'text-gray-300 text-semibold hover:text-white'
                    }
                    to={'/'}
                >
                    홈
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar
