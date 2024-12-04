import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NoteList = () => {
    const notes = useSelector((state) => state.notes)
    return (
        <div className="max-w-[1030px] m-auto rounded-lg bg-gray-900 p-4">
            <div className="flex justify-end space-x-4 mb-4">
                <button className="bg-gray-800 py-2 px-4 rounded-full">
                    최근
                </button>
                <button className="bg-gray-800 py-2 px-4 rounded-full">
                    이름 순
                </button>
            </div>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <Link
                            to={`/notes/${note.id}`}
                            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2 hover:bg-gray-700"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {note.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {note.content.slice(0, 100)}
                                </p>
                            </div>
                            <div>
                                <time className="text-sm text-gray-400">
                                    {note.time}
                                </time>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NoteList
