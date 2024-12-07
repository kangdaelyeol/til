import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Empty from './Empty'
import { useState } from 'react'

const NoteList = () => {
    const notes = useSelector((state) => state.notes)
    const [sortOption, setSortOption] = useState('latest')

    const sortedNoteList = [...notes].sort((a, b) => {
        if (sortOption === 'latest') {
            return new Date(a) - new Date(b)
        } else {
            return a.title.localeCompare(b.title)
        }
    })

    return (
        <div className="max-w-[1030px] m-auto rounded-lg bg-gray-900 p-4">
            <div className="flex justify-end space-x-4 mb-4">
                <button
                    onClick={() => setSortOption('latest')}
                    className={`bg-gray-800 py-2 px-4 rounded-full ${
                        sortOption === 'latest' ? 'text-white' : 'text-gray-500'
                    }`}
                >
                    최근
                </button>
                <button
                    onClick={() => setSortOption('name')}
                    className={`bg-gray-800 py-2 px-4 rounded-full ${
                        sortOption === 'name' ? 'text-white' : 'text-gray-500'
                    }`}
                >
                    이름 순
                </button>
            </div>
            <ul>
                {sortedNoteList.length > 0 ? (
                    sortedNoteList.map((note) => (
                        <li key={note.id}>
                            <Link
                                to={`/notes/${note.id}`}
                                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2 hover:bg-gray-700"
                            >
                                <div>
                                    <h3
                                        data-testid="note-title"
                                        className="text-lg font-semibold"
                                    >
                                        {note.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {note.content.slice(0, 100)}
                                    </p>
                                </div>
                                <div>
                                    <time className="text-sm text-gray-400">
                                        {format(note.time, 'yyyy-MM-dd HH:mm')}
                                    </time>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <Empty />
                )}
            </ul>
        </div>
    )
}

export default NoteList
