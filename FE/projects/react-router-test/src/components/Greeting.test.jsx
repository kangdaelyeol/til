import { render } from '@testing-library/react'
import Greeting from './Greeting'
import { expect } from 'vitest'

describe('Greeting Component test', () => {
    test('givenNameAsAliceWhenRendersComponentThenWorksWell', () => {
        const { getByText } = render(<Greeting name={'Alice'} />)
        expect(getByText('Hello, Alice')).toBeInTheDocument()
    })

    it('should render', () => {
        const { asFragment } = render(<Greeting name={'Alice'} />)

        expect(asFragment()).toMatchSnapshot()
    })
})
