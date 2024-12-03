import { useReducer } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'increase':
            return state + 1
        case 'decrease':
            return state - 1
    }
}

const initialState = 0

const Count = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <h1>count: {state}</h1>
            <button onClick={() => dispatch({ type: 'increase' })}>
                increase
            </button>
            <button onClick={() => dispatch({ type: 'decrease' })}>
                decrease
            </button>
        </div>
    )
}

export default Count
