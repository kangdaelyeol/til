import './App.css';
import { useState } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);

	const countState = () => {
		setCount(count + 1);
		setCount(count + 1);
		setCount(count + 1);
	};

	return (
		<div className=''>
			<span>{count}</span>
			<button onClick={countState}>count!</button>
		</div>
	);
};

function App() {
	// useState - update function / snapshot
	return (
		<div>
			<Counter />
		</div>
	);
}

export default App;
