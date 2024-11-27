import './App.css';
import { useReducer, useState } from 'react';
import { MyComponent, MyProvider } from './MyComponent';
import { ThemeComponent, ThemeProvider } from './Theme';

const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREASE':
			return { count: state.count + 1 };
		case 'DECREASE':
			return { count: state.count - 1 };
		case 'DOUBLE':
			return { count: state.count * 2 };
		case 'SQRT':
			return { count: Number(Math.sqrt(state.count).toFixed(0)) };

		default:
			throw new Error('invalid type: ' + action.type);
	}
};

const Counter = () => {
	const [{ count }, dispatch] = useReducer(reducer, { count: 0 });

	return (
		<div className=''>
			<span>{count}</span>
			<button onClick={() => dispatch({ type: 'INCREASE' })}>inc</button>
			<button onClick={() => dispatch({ type: 'DECREASE' })}>dec</button>
			<button onClick={() => dispatch({ type: 'DOUBLE' })}>double</button>
			<button onClick={() => dispatch({ type: 'SQRT' })}>SQRT</button>
		</div>
	);
};

function App() {
	// useState - update function / snapshot
	return (
		<div>
			<MyProvider>
				<MyComponent />
			</MyProvider>
			<ThemeProvider>
				<ThemeComponent />
			</ThemeProvider>
		</div>
	);
}

export default App;
