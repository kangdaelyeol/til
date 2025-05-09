import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, vi } from 'vitest'
import { routerConfig } from '../App'
import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../store'
import userEvent from '@testing-library/user-event'
import { fetchOpenAI } from '../api'

vi.mock('../api', () => ({
    fetchOpenAI: vi.fn(),
}))

// vi.mock('openai', () => ({
//     default: class {
//         chat = {
//             completions: {
//                 create: vi.fn(),
//             },
//         }
//     },
// }))

describe('노트 추가 및 편집 기능', () => {
    it('새로운 노트 추가, notes 라우팅, 사이드바에 링크 추가', async () => {
        // browserRouter - historyAPI 사용 - 브라우저 url 매치를 위한 메커니즘 추가
        // memoryRouter - 내부 메모리상으로 간편하게 url routing 구현
        const router = createMemoryRouter(routerConfig)

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await userEvent.click(getByText('노트 추가'))

        const id = store.getState().notes[0].id

        await waitFor(() => {
            expect(router.state.location.pathname).toBe(`/notes/${id}`)
        })

        expect(getByText('새로운 노트')).toHaveAttribute('href', `/notes/${id}`)

        const titleEl = getByTestId('title')
        const contentEl = getByTestId('content')

        await userEvent.clear(titleEl)
        await userEvent.clear(contentEl)
        await userEvent.type(titleEl, 'new title')
        await userEvent.type(contentEl, 'new content')

        const updatedNote = store.getState().notes.find((n) => n.id === id)
        expect(updatedNote.title).toBe('new title')
        expect(updatedNote.content).toBe('new content')

        fetchOpenAI.mockResolvedValueOnce('요약된 내용')

        await userEvent.click(getByText('요약'))
        const updatedNote1 = store.getState().notes.find((n) => n.id === id)
        expect(updatedNote1.summary).toBe('요약된 내용')
    })
})
