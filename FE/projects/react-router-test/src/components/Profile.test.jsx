import { render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect } from 'vitest'
import Profile from './Profile'

describe('Profile Component', () => {
    const mockUser = {
        name: 'Alice',
        email: 'alice@google.com',
    }
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUser),
            }),
        )
    })

    afterEach(() => {
        vi.clearAllMocks()
    })
    it('should render correctly', async () => {
        const { getByText, queryByText } = render(<Profile userId={1} />)
        // getByText - 텍스트를 포함하는 DOM을 찾지 못하는 경우 에러를 던짐 - 반드시 DOM을 찾아야 하는 경우 사용
        expect(getByText('Loading...')).toBeInTheDocument()

        await waitFor(
            () => {
                expect(getByText('Alice')).toBeInTheDocument()
            },
            // 콜백 조건이 성공할 때 까지 반복해서 호출 - 타임아웃 시간과 호출 간격을 결정할 수 있음.
            { timeout: 1000, interval: 200 },
        )
        // queryByText - 요소가 존재하지 않으면 null 반환 - 일반적으로 DOM이 사라졌는지 확인하기 위해 사용
        expect(queryByText('Loading...')).not.toBeInTheDocument()
    })
})
