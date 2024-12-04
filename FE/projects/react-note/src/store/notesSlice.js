import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload)
        },
        deleteNote: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        updateNote: (state, action) => {
            const { id, title, content, summary } = action.payload
            const note = state.find((note) => note.id === id)
            if (note) {
                note.title = title
                note.content = content
                note.summary = summary
            }
        },
    },
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions
export default notesSlice.reducer
