import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Count from './Count'
import userEvent from '@testing-library/user-event'

describe('Count Component', () => {
    test('should render correctly', () => {
        const { getByText } = render(<Count />)
        expect(getByText('increase')).toBeInTheDocument()
        expect(getByText('decrease')).toBeInTheDocument()
        expect(getByText('count: 0')).toBeInTheDocument()
    })
    it('should increase when button click', async () => {
        const { getByText } = render(<Count />)
        expect(getByText('count: 0')).toBeInTheDocument()
        await userEvent.click(getByText('increase'))

        expect(getByText('count: 1')).toBeInTheDocument()
    })
    it('should decrease when click button', async () => {
        const { getByText } = render(<Count />)
        expect(getByText('count: 0')).toBeInTheDocument()
        await userEvent.click(getByText('decrease'))
        expect(getByText('count: -1')).toBeInTheDocument()
    })
})
