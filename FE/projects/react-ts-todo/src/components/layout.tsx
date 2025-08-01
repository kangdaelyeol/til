import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
	const [direction, setDirection] = useState<'column' | 'row'>('column');

	console.log('layout rendered');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: direction,
			}}
		>
			<h1>Todo app</h1>
			<Link to='/'>home</Link>
			<Link to='/about'>about</Link>
			<button
				onClick={() =>
					setDirection((prev) => (prev === 'column' ? 'row' : 'column'))
				}
			>
				Change Layout
			</button>
			<Outlet />
		</div>
	);
}
