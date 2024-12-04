import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { addNote } from '../store/notesSlice.js'
const SideBar = () => {
    const navigate = useNavigate()

    const notes = useSelector((state) => state.notes)
    const dispatch = useDispatch()

    const handleClick = () => {
        const id = uuidv4()
        const newNote = {
            id,
            title: '새로운 노트',
            content: '',
            time: Date.now(),
            summary: '',
        }
        dispatch(addNote(newNote))
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
            <div className="mt-4">
                {notes.map((note) => (
                    <li key={note.id}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-500 text-semibold'
                                    : 'text-gray-300 text-semibold hover:text-white'
                            }
                            to={`/notes/${note.id}`}
                        >
                            {note.title}
                        </NavLink>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default SideBar
