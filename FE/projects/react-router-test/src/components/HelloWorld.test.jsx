import { render } from '@testing-library/react'
import HelloWorld from './HelloWorld'

// describe -> it(test) -> expect-getbytext.toBeInTheDocument()

describe('hello world component', () => {
    test('render', () => {
        const { getByText } = render(<HelloWorld />)
        expect(getByText('Hello World!')).toBeInTheDocument()
    })
})
