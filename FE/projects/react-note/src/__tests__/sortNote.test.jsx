import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect } from 'vitest'
import store from '../store'
import { routerConfig } from '../App'
import { addNote } from '../store/notesSlice'
import userEvent from '@testing-library/user-event'
describe('노트 정렬 기능', () => {
    it('버튼 클릭시 정렬', async () => {
        const router = createMemoryRouter(routerConfig)
        const { getByText, getAllByTestId } = render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        const notes = [
            {
                id: 1,
                title: '2 title',
                content: 'content 2',
                time: new Date(2024, 8, 26),
            },
            {
                id: 2,
                title: '1 title',
                content: 'content 1',
                time: new Date(2024, 8, 24),
            },
            {
                id: 3,
                title: '3 title',
                content: 'content 3',
                time: new Date(2024, 8, 22),
            },
        ]

        notes.forEach((n) => store.dispatch(addNote(n)))

        await userEvent.click(getByText('이름 순'))

        await waitFor(() => {
            const sortedNotes = getAllByTestId('note-title')
            expect(sortedNotes[0].textContent).toBe('1 title')
            expect(sortedNotes[1].textContent).toBe('2 title')
            expect(sortedNotes[2].textContent).toBe('3 title')
        })

        await userEvent.click(getByText('최근'))

        await waitFor(() => {
            const sortedNotes = getAllByTestId('note-title')
            expect(sortedNotes[0].textContent).toBe('2 title')
            expect(sortedNotes[1].textContent).toBe('1 title')
            expect(sortedNotes[2].textContent).toBe('3 title')
        })
    })
})
